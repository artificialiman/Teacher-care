# School Management System - Technical Context

## Project Invariants

### Stack
- **Pure vanilla**: HTML, CSS, JavaScript only
- **Flatfile deployment**: No folders, everything at root level
- **Manual GitHub upload**: No build process
- **URL-level separation**: Student portal and teacher portal on different origins

### Scale
- **2,000 total users** (students + teachers combined)
- **~30 teachers maximum**
- **100 students maximum per class arm**
- **30 subjects maximum**
- **10 minimum subjects per student**
- **18 terms of historical data per student**
- **30,000 students at scale** = different faculties/colleges, each with separate URLs and backends, unified only in hardcoded logging/database

### Student Classification
1. **New students**
2. **Promoted students** (normal progression + graduating within school)
3. **Alumni** (ex-students + graduands)

### Senior Department Structure
- Science
- Arts
- Commercial

### Teacher Roles (can overlap, class teacher has highest authority)
1. **Class teacher** (highest authority)
2. **Subject teacher**
3. **Part-time teacher**

### Teacher Scope Variants
- Whole section (Junior or Senior)
- Single class
- Entire school

---

## Two-Doctrine Architecture: Redundancy-Proof System

### **Doctrine 1: Antifailure Foundation (Class-Case)**
**Purpose:** Emergency fallback, always works, manual control

**Characteristics:**
- Vanilla flatfiles (HTML/CSS/JS)
- ~20-30 class JSON files (100 students each)
- 1 `result.html` template + client-side token filtering
- Hardcoded on GitHub Pages
- Manual merge from Google Drive
- **Never abandoned, always revertible**

**Operational States:**
- **Worst-case:** 2000 individual static HTML files (nuclear fallback)
- **Class-case (default):** Class-level JSONs with client-side filtering
- **Always accessible:** Works when all other systems fail

---

### **Doctrine 2: Shock-Proof Operational Layer**
**Purpose:** Live operations at scale, automated workflows, vacation mode

**Stack:**
- **Frontend:** Svelte + TypeScript
- **Hosting:** Cloudflare Pages
- **Backend:** Cloudflare Workers (serverless functions)
- **Storage (Live):** Supabase Postgres
- **Storage (Staging):** Google Drive
- **Storage (Published):** GitHub Pages
- **Cron/Agents:** Cloudflare Workers scheduled functions

**Key Principle:** Auto-compiles to Doctrine 1 format, outputs identical JSON schema

**Failure Mode:**
- Cloudflare/Supabase down → redirect to GitHub Pages (Doctrine 1 class-case)
- Students see last known good state
- Teachers lose write access temporarily

---

## Agentic Workflow Architecture

### **Human Role: Audit Only**
- Review compiled class-case files in Google Drive
- Approve/reject before publish date
- Monitor agent logs in admin dashboard
- Emergency override capability
- **Manual upload to GitHub** (Phase 1, until proven trustworthy)

---

### **Agent Responsibilities**

#### **1. Compile Agent (Primary)**
**Triggers:**
- Cloudflare Worker cron (interval: configurable)
- Manual admin trigger via dashboard button

**Process:**
1. Monitor Supabase for new teacher writes
2. Read all records per class/term
3. Generate class-case JSON files
4. Validate schema compliance
5. **Output to Google Drive staging folder**
6. Generate compilation logs

**Does NOT:**
- Auto-push to GitHub (human does this manually)
- Publish to students
- Mutate live student site

**Output Structure (Drive):**
```
/term-1-staging/
  ss1a-term1.json
  ss1b-term1.json
  jss1a-term1.json
  result.html (template, unchanged)
  /audit/
    compile-log-2026-01-25.txt
```

#### **2. Notification Agent (Optional)**
**Purpose:** Alert admin when new statics ready

**Actions:**
- Monitor Drive staging folder
- Dashboard notification when compile completes
- Animated emoji alerts in admin UI
- No emails, pure in-app notifications

#### **3. Mutation Auditor Agent**
**Monitors:**
- Every Supabase write
- Schema drift detection
- Invalid data entries
- Compilation errors
- Generates daily audit reports in admin dashboard

---

## Trust Escalation Phases

### **Phase 1: Manual Upload (Current)**
- Agents compile → Google Drive staging
- Human reviews Drive files
- Human downloads and uploads to GitHub manually
- Human verifies student site

### **Phase 2: Semi-Automated (Proven Trust)**
- Agents compile → Drive → auto-push to GitHub staging branch
- Human reviews staging branch
- Human merges to main
- GitHub Pages updates automatically

### **Phase 3: Fully Automated (Maximum Trust)**
- Agents compile → Drive → auto-push to GitHub main
- Publish date gate still enforced
- Human audits logs only
- Emergency override still available

---

## Platform & Component Distribution

| Component | Platform | Tech | Purpose |
|-----------|----------|------|---------|
| Teacher Portal (D2) | Cloudflare Pages | Svelte (minimal UI) | Live writes to Supabase |
| Teacher Portal (D1) | GitHub Pages | Vanilla JS | Fallback static |
| Student Portal | GitHub Pages | Vanilla JS (class-case) | Static, publish-gated |
| Admin Panel | Cloudflare Pages | Svelte (heavy UI/state) | Agent triggers, logs, approvals |
| Compile Agent | Cloudflare Workers | TypeScript (cron) | Supabase → JSON → Drive |
| Notification Agent | Cloudflare Workers | TypeScript (cron) | Dashboard alerts |
| Audit Agent | Cloudflare Workers | TypeScript (cron) | Log analysis, validation |
| Storage (Live) | Supabase Postgres | - | Teacher writes during term |
| Storage (Staging) | Google Drive | - | Pre-publish JSONs for review |
| Storage (Published) | GitHub Pages | - | Student reads post-publish |
| Storage (Logging) | Hardcoded DB | - | Cross-faculty audit trail |

---

## Operational Timeline (Per Term)

### **Week 1-10: Active Term (Write Period)**
**Teacher Flow:**
- Write scores (online or offline via localStorage)
- Auto-sync when network stable
- Toast notifications: "✅ Saved (offline)" → "📡 Syncing..." → "✓ Submitted"
- No awareness of compile process

**Student Flow:**
- See **nothing** (GitHub Pages empty or shows last term)
- Blocked by publish date gate

**Agent Flow:**
- Compile agent runs on interval (hourly/daily/configurable)
- Outputs to Drive staging continuously
- Admin sees: "✨ 23 classes compiled → Drive"

---

### **Week 11-12: Final 2 Weeks (Read-Only Period)**
**Teacher Flow:**
- Write access **disabled in UI**
- View-only mode for verification

**Admin Flow:**
- Review staging files in Google Drive
- Check compilation logs for errors
- Approve final compilation via dashboard button

**Agent Flow:**
- Final reconciliation compile
- Comprehensive validation run
- Audit report generation

---

### **Publish Date (Admin-Set)**
**Mechanism:**
```javascript
// Hardcoded per term in student portal
const PUBLISH_DATE = "2026-03-15T00:00:00Z";
if (new Date() < new Date(PUBLISH_DATE)) {
  showMessage("Results not yet published. Check back on March 15.");
  // Block all data loading
}
```

**What Happens:**
- Admin has manually uploaded approved files to GitHub (Phase 1)
- Publish date passes
- Students can now access via tokens
- Students read from static GitHub Pages

---

### **Holidays (Zero-Compute Mode)**
- Everything static on GitHub Pages
- No Cloudflare Workers running
- No Supabase queries
- Supabase idle (cost = $0)
- Students access published results freely

---

## UI Weight & Interaction Design

### **Admin Panel (Heavy UI/State)**
- Rich Svelte dashboard with charts and logs
- Animated state transitions
- **Fun emoji notifications** (no emails):
  - Compile done: "✨ 23 classes compiled → Drive"
  - Teacher sync: "📚 5 new submissions from Mr. Ade"
  - Error: "⚠️ SS2B validation failed (3 records)"
  - Manual trigger: "🚀 Compiling... 47% complete"
- **Animated loading/uploading states**
- Interactive file previews
- Direct navigation to Google Drive folders
- Direct navigation to GitHub repo
- Log streaming with filters

**Admin Actions:**
- Set/update publish dates
- Trigger manual compile
- Download staging files
- View error details
- Approve compilation
- Emergency unpublish

---

### **Teacher Portal (Minimal UI, Maximum Persistence)**
- Simple forms (score entry fields)
- localStorage for offline persistence
- **Toast notifications only:**
  - "✅ Saved (offline)"
  - "📡 Syncing..."
  - "✓ Submitted to Drive"
  - "❌ Sync failed, retry?"
- Upload progress spinner
- No fancy animations
- **Offline-first architecture:**
  - localStorage queues writes
  - Service Worker monitors network status
  - Auto-sync when online
  - Batch POST to Cloudflare Worker → Supabase
  - Success/failure per write shown in toast

**Teacher Never Sees:**
- Compile process
- Drive staging
- Agent activity
- Admin controls

---

### **Student Portal (Static, Zero State)**
- Token gate (client-side validation)
- Fetch class JSON, filter to student's record
- Render result card
- Print button
- **Zero JavaScript state management**
- Pure read-only consumption

---

## Architecture Principles

### URL Separation (Hard Invariant)
**Student portal** and **teacher portal** exist on **different origins**.

- No shared routing
- No shared runtime
- No shared assumptions
- No bidirectional dependency

**Shared truth, separate surfaces:**
- Same underlying data model
- Different compiled views
- Admin is the only bridge

### Data Flow (Doctrine 2)
```
Teacher Input (offline/online) 
  → localStorage queue 
  → Cloudflare Worker 
  → Supabase Postgres 
  → Compile Agent (cron) 
  → Google Drive staging 
  → Human review 
  → Manual GitHub upload 
  → Student GitHub Pages view (post-publish date)
```

### Authentication Model
- **Token-based client-side filtering** (Doctrine 1)
- Each token maps to exactly one `student_id`
- Token validates on page load
- JS filters class JSON to show only matching student record
- Spoofing tolerated (doesn't break system integrity)
- Students cannot see classmates' data even though it exists in same JSON file

---

## Teacher Portal Specification (Doctrine 2)

### Purpose
Controlled write surface for capturing academic inputs with assisted computation.

### Core Responsibilities
1. **Result upload**: CA components + exam scores
2. **Automated calculation**: Totals, grades, GPA, class averages
3. **Attendance tracking**: Morning + afternoon totals
4. **Term exam question upload** (backup to Drive)
5. **Lesson notes download** (posted by admin)

### Teacher Flow (Canonical)
1. **Entry**: Authentication resolves `teacher_id`, active term, subject assignments
2. **Assignment resolution**: Term-scoped dashboard shows subjects/classes taught this term
3. **Subject workspace selection**: Choose subject + class + term
4. **Result upload workspace**:
   - Student list (resolved by class + term)
   - Editable score fields (CA components + exam)
   - Configurable max values
   - **localStorage auto-save every keystroke**
5. **Assisted computation** (non-optional):
   - Auto-calculate totals
   - Derive grades from defined scales
   - Compute per-student totals, class average, grade distribution
6. **Validation & submission**:
   - Preview totals and averages
   - Show warnings for errors (score exceeds max, missing component, incomplete)
   - Atomic submission to Supabase
7. **Change tracking**: All edits, resubmissions logged (teacher-visible, admin-visible)

### Offline-First Architecture
- **Service Worker** intercepts failed requests
- **localStorage** queues all writes with timestamps
- **Network monitor** detects connectivity
- **Auto-sync on reconnect:**
  - Batch queued writes
  - POST to Cloudflare Worker
  - Worker validates and writes to Supabase
  - Returns success/failure per record
- **Toast feedback:**
  - Shows sync progress
  - Lists failed records with retry option

### Teacher Invariants (Non-Negotiable)
- Teachers never publish directly to students
- Teachers never edit generated results
- Teachers never resolve disputes or overrides
- Computation is always system-assisted
- Removing a subject does not erase history
- Teachers never manage students, terms, or publication
- **Teachers never see compile/staging process**

---

## Student Portal Specification (Doctrine 1)

### Purpose
Read-only consumption of personal academic records.

### Properties
- Token or session gated
- No write endpoints
- No teacher logic shipped
- No assignment context
- **Publish date enforcement prevents early access**

### Data Structure
**Class-level pages with client-side filtering:**
- One JSON file per class per term: `students-term1-ss1a.json` (max 100 students)
- Student logs in → auth resolves `student_id` + `class` + `term`
- JS fetches relevant class JSON
- **Date check blocks loading if before publish date**
- JS filters to show **only** their record
- Print button renders **only** their card

### Failure Mode
- Deny access gracefully
- Never expose upstream state
- Missing file shows graceful error
- Wrong token = no JSON access
- Before publish date = friendly waiting message

### Print Layout
- Student portal owns **all** print/display formatting
- Teacher portal submits raw data only
- No CSS/template sync needed between portals

---

## Priority Classes

### Subject Selection Tracking
- **SS1 & SS2**: Track subjects offered per student

### Transcript/Testimonial Generation
- **Primary 5/6**
- **JSS3**
- **SS3**

### Schema Validation Testbed
- **JSS1**: First implementation for testing data structure

---

## Data Schema & Interoperability

### Teacher → Student Data Contract
Teacher side exports to **agreed schema** (JSON with fixed keys).
Student side imports from same schema.

**Teacher doesn't need to know student UI—just the data contract.**

### Schema Storage
- Schema documentation stored separately
- Both portals reference same contract
- Identical parsers hardcoded on each end
- **Agents validate against schema during compilation**

### Transfer Layers
- **Live:** Supabase (Doctrine 2 teacher writes)
- **Staging:** Google Drive (agent compilation output)
- **Published:** GitHub Pages (student reads)
- **Schema = the bridge between all three**

---

## Deployment Strategy

### Term 1 (Antifailure Scaffold - Doctrine 1)
- **Hardcoded static files**: HTML + JSON per class
- **No external dependencies**
- **Manual script execution per class** (acceptable)
- **Emergency revert capability**: Term 1 always accessible regardless of Doctrine 2 status

### Future Terms (Shock-Proof - Doctrine 2)
- Doctrine 2 receives teacher submissions → Supabase
- Compile agent generates JSONs → Google Drive staging
- **Manual merge process (Phase 1):**
  1. Review staging files in Drive
  2. Download approved files
  3. Upload to GitHub repo manually
  4. Verify publish date gate
- **Auto-merge (Phase 2/3):** After trust established

### Antifailure Architecture
- Hardcoded Doctrine 1 files = always work
- Cloudflare/Supabase failure doesn't affect GitHub Pages access
- localStorage preserves teacher progress during outages
- Revert to static scaffold possible at any point
- **30,000 students = separate faculty instances, each with own Doctrine 1 + 2**

---

## Technical Boundaries

### Teacher Page Does NOT
- Manage students
- Manage terms
- Publish to students
- Control payment/ads
- Edit generated results
- Resolve disputes
- **See agent/compile process**
- **Access Google Drive directly**

### Student Page Does NOT
- Call teacher site
- Assume teacher state
- Write data
- Show teacher logic
- **Load before publish date**

### Admin Bridge (Only Cross-Site Actor)
- Controls assignments
- Controls publication
- Controls promotion
- Triggers agents
- Reviews staging files
- **Manually uploads to GitHub (Phase 1)**
- Both sites read derived outputs from admin actions

### Agents Do NOT
- Auto-publish to students (Phase 1)
- Make decisions without logging
- Skip validation
- Mutate without audit trail

---

## Non-Negotiable Constraints

1. **No localStorage/sessionStorage for browser storage** in artifacts
2. **No framework dependencies** (Doctrine 1)
3. **No folder structures** in deployment
4. **URL separation is enforcement mechanism**, not implementation detail
5. **Manual scripts per class are acceptable** for Term 1
6. **Print formatting lives only on student side**
7. **Teacher computation is always system-assisted, never manual**
8. **Publish date gate cannot be bypassed**
9. **Agents output to Drive, human uploads to GitHub** (Phase 1)
10. **Doctrine 1 always remains as fallback, never deleted**

---

## Terminology Precision

### Avoid
- "Backend" (use: Cloudflare Workers, Supabase layer, agent runtime)
- "Database" (use: Supabase Postgres, JSON files, Drive storage)
- "API" (use: Cloudflare Worker endpoint)
- "Framework" for Doctrine 1 (forbidden)
- "Automatic publishing" in Phase 1 (use: agent-compiled, human-uploaded)

### Use
- Flatfile (Doctrine 1)
- Vanilla (Doctrine 1)
- Hardcoded (Doctrine 1)
- Client-side filtering
- Schema contract
- Static scaffold (Doctrine 1)
- Shock-proof (Doctrine 2)
- Antifailure (Doctrine 1)
- Agent-compiled
- Manual upload (Phase 1)
- Publish date gate
- Staging (Drive folder)
- Toast notification (teacher UI)
- Emoji alert (admin UI)

---

## Context Usage Instructions

**For code generation:**
1. Confirm doctrine (1 or 2) and URL destination (student/teacher/admin)
2. Verify data flow direction (read or write)
3. Check against invariants before proposing solutions
4. Default to localStorage for teacher progress (Doctrine 2)
5. Default to class-level JSON + client filtering for student data (Doctrine 1)
6. **Never auto-publish in Phase 1** (agents → Drive, human → GitHub)
7. **Admin UI gets rich animations/emojis, teacher UI stays minimal**

**For architecture questions:**
1. Reference the antifailure principle (Doctrine 1)
2. Reference shock-proof layer (Doctrine 2)
3. Prioritize manual control over automation for Phase 1
4. Agents are compile/staging tools, not publishers
5. Emergency revert = always possible via Doctrine 1
6. **30k students = faculty sharding, not monolithic scaling**

**For agent design:**
1. Output to Drive staging only
2. Comprehensive logging required
3. Schema validation on every compile
4. Never skip audit trail
5. Emoji notifications in admin dashboard
6. No emails, pure in-app alerts

**Forbidden assumptions:**
- Shared runtime between portals
- Automatic data mutations without logging
- Agents auto-publishing to GitHub (Phase 1)
- Teacher sees student UI
- Student writes data
- Frameworks in Doctrine 1
- Students access before publish date
- Admin doesn't review staging files