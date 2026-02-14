/**
 * TENDERCARE SCHOOL — STUDENT DATABASE
 * Academic Year 2025/2026
 * Total enrolled: 340 students across 12 classes
 * ID format: TCH-YYYY-NNN  (year = system launch year, sequential school-wide)
 * Status values: 'active' | 'graduated' | 'transferred'
 * Departed students move to STUDENTS_ARCHIVE below.
 */

const STUDENTS_DB = {

  // ────────────────────────────────────────────────────
  'JSS1A': [
    { id: 'TCH-2025-001', name: 'Abraham Comfort Princess', status: 'active' },
    { id: 'TCH-2025-002', name: 'Abraham Nanmuwa', status: 'active' },
    { id: 'TCH-2025-003', name: 'Adebanjo Anjola', status: 'active' },
    { id: 'TCH-2025-004', name: 'Adegboye Adam', status: 'active' },
    { id: 'TCH-2025-005', name: 'Ademola Daniel', status: 'active' },
    { id: 'TCH-2025-006', name: 'Adeoye Ikimot', status: 'active' },
    { id: 'TCH-2025-007', name: 'Adeyemi Olamide', status: 'active' },
    { id: 'TCH-2025-008', name: 'Adiukwu Chimuaya', status: 'active' },
    { id: 'TCH-2025-009', name: 'Ayegba Anthony', status: 'active' },
    { id: 'TCH-2025-010', name: 'Chris Ukpah Rejoice', status: 'active' },
    { id: 'TCH-2025-011', name: 'Ehigie Jeffrey', status: 'active' },
    { id: 'TCH-2025-012', name: 'Enabulele Newton', status: 'active' },
    { id: 'TCH-2025-013', name: 'Hazmat Alaba', status: 'active' },
    { id: 'TCH-2025-014', name: 'Idowu Taiwo', status: 'active' },
    { id: 'TCH-2025-015', name: 'Jackson Grace', status: 'active' },
    { id: 'TCH-2025-016', name: 'Jimoh Sodiq', status: 'active' },
    { id: 'TCH-2025-017', name: 'Mohammed Abdul-salam', status: 'active' },
    { id: 'TCH-2025-018', name: 'Muritala Farhan', status: 'active' },
    { id: 'TCH-2025-019', name: 'Obaoye Adeola Ruth', status: 'active' },
    { id: 'TCH-2025-020', name: 'Oduwaye Abdul-salam', status: 'active' },
    { id: 'TCH-2025-021', name: 'Ogunlana Aishat', status: 'active' },
    { id: 'TCH-2025-022', name: 'Okwuabudike Michael', status: 'active' },
    { id: 'TCH-2025-023', name: 'Olukoga Akorede', status: 'active' },
    { id: 'TCH-2025-024', name: 'Oni Grace Oluwadarasimi', status: 'active' },
    { id: 'TCH-2025-025', name: 'Otuole Innocent', status: 'active' },
    { id: 'TCH-2025-026', name: 'Peter John', status: 'active' },
    { id: 'TCH-2025-027', name: 'Rafiu Aishat', status: 'active' },
    { id: 'TCH-2025-028', name: 'Soyode Emmanuel', status: 'active' },
    { id: 'TCH-2025-029', name: 'Yusuf Al-meen', status: 'active' }
  ],

  // ────────────────────────────────────────────────────
  'JSS1B': [
    { id: 'TCH-2025-030', name: 'Adeniyi Nifemi', status: 'active' },
    { id: 'TCH-2025-031', name: 'Adenoyi Basir', status: 'active' },
    { id: 'TCH-2025-032', name: 'Adeyemi Modesire', status: 'active' },
    { id: 'TCH-2025-033', name: 'Agbo Wonderful', status: 'active' },
    { id: 'TCH-2025-034', name: 'Akeju Emmanuel', status: 'active' },
    { id: 'TCH-2025-035', name: 'Akindutire Michael', status: 'active' },
    { id: 'TCH-2025-036', name: 'Asuluka Obioma', status: 'active' },
    { id: 'TCH-2025-037', name: 'Babarinde Testimony', status: 'active' },
    { id: 'TCH-2025-038', name: 'Dada Ayodeji', status: 'active' },
    { id: 'TCH-2025-039', name: 'Duckson Samson', status: 'active' },
    { id: 'TCH-2025-040', name: 'Idowu Kehinde', status: 'active' },
    { id: 'TCH-2025-041', name: 'Ikujuni Samuel', status: 'active' },
    { id: 'TCH-2025-042', name: 'Irinyemi Halleluyah', status: 'active' },
    { id: 'TCH-2025-043', name: 'Ishola Suliat', status: 'active' },
    { id: 'TCH-2025-044', name: 'Jewoola Olamide', status: 'active' },
    { id: 'TCH-2025-045', name: 'Jonathan Frednard', status: 'active' },
    { id: 'TCH-2025-046', name: 'Makinde Tofunmi', status: 'active' },
    { id: 'TCH-2025-047', name: 'Ofulate Boluwatife', status: 'active' },
    { id: 'TCH-2025-048', name: 'Okezueze Ifechukwu', status: 'active' },
    { id: 'TCH-2025-049', name: 'Oni Fikayo', status: 'active' },
    { id: 'TCH-2025-050', name: 'Onibodo Quadri', status: 'active' },
    { id: 'TCH-2025-051', name: 'Owoade Praise', status: 'active' },
    { id: 'TCH-2025-052', name: 'Oyeniran Michelle', status: 'active' },
    { id: 'TCH-2025-053', name: 'Safiriyu Simisola', status: 'active' },
    { id: 'TCH-2025-054', name: 'Sandy Enoch', status: 'active' },
    { id: 'TCH-2025-055', name: 'Shokoya Imole', status: 'active' },
    { id: 'TCH-2025-056', name: 'Tijani Anjolaoluwa', status: 'active' },
    { id: 'TCH-2025-057', name: 'Ubi Richard Victoria', status: 'active' },
    { id: 'TCH-2025-058', name: 'Yusuff Salamat Semilore', status: 'active' }
  ],

  // ────────────────────────────────────────────────────
  'JSS2A': [
    { id: 'TCH-2025-059', name: 'Abey Phoebe', status: 'active' },
    { id: 'TCH-2025-060', name: 'Adeniyi Mubarak', status: 'active' },
    { id: 'TCH-2025-061', name: 'Agbabiaka Ella', status: 'active' },
    { id: 'TCH-2025-062', name: 'Alala Faridat', status: 'active' },
    { id: 'TCH-2025-063', name: 'Aramide Ikimot', status: 'active' },
    { id: 'TCH-2025-064', name: 'Aremu Praise', status: 'active' },
    { id: 'TCH-2025-065', name: 'Ayoade Flourish', status: 'active' },
    { id: 'TCH-2025-066', name: 'Bakare Gabriel', status: 'active' },
    { id: 'TCH-2025-067', name: 'Bamiro David', status: 'active' },
    { id: 'TCH-2025-068', name: 'Biobaku Azraa', status: 'active' },
    { id: 'TCH-2025-069', name: 'Boladale Esther', status: 'active' },
    { id: 'TCH-2025-070', name: 'Edeniyi Ukharia', status: 'active' },
    { id: 'TCH-2025-071', name: 'Falope Kikiope', status: 'active' },
    { id: 'TCH-2025-072', name: 'Ida Wisdom', status: 'active' },
    { id: 'TCH-2025-073', name: 'Mudashiru Abidat', status: 'active' },
    { id: 'TCH-2025-074', name: 'Muh\'awwal Alitorf', status: 'active' },
    { id: 'TCH-2025-075', name: 'Musa Isaac', status: 'active' },
    { id: 'TCH-2025-076', name: 'Neri Testimony', status: 'active' },
    { id: 'TCH-2025-077', name: 'Obaoye Dorcas', status: 'active' },
    { id: 'TCH-2025-078', name: 'Ogoyemi Josephine', status: 'active' },
    { id: 'TCH-2025-079', name: 'Olowu Jamal', status: 'active' },
    { id: 'TCH-2025-080', name: 'Olubiyi Godwin', status: 'active' },
    { id: 'TCH-2025-081', name: 'Opeyemi Rosheedat', status: 'active' },
    { id: 'TCH-2025-082', name: 'Oriabor Joy', status: 'active' },
    { id: 'TCH-2025-083', name: 'Orukpe Daniel', status: 'active' },
    { id: 'TCH-2025-084', name: 'Oyeboade Erioluwa', status: 'active' },
    { id: 'TCH-2025-085', name: 'Oyediji Israel', status: 'active' },
    { id: 'TCH-2025-086', name: 'Oyetunji Adejoke', status: 'active' },
    { id: 'TCH-2025-087', name: 'Oyewole Daniel', status: 'active' },
    { id: 'TCH-2025-088', name: 'Rafiu Rofiat', status: 'active' },
    { id: 'TCH-2025-089', name: 'Raji Joshua', status: 'active' },
    { id: 'TCH-2025-090', name: 'Tijani Olamiposi', status: 'active' }
  ],

  // ────────────────────────────────────────────────────
  'JSS2B': [
    { id: 'TCH-2025-091', name: 'Abolanle Nancy', status: 'active' },
    { id: 'TCH-2025-092', name: 'Adeboyo Taiwo', status: 'active' },
    { id: 'TCH-2025-093', name: 'Adeniran Isaac', status: 'active' },
    { id: 'TCH-2025-094', name: 'Adesuyi Ademola', status: 'active' },
    { id: 'TCH-2025-095', name: 'Akinade Darasimi', status: 'active' },
    { id: 'TCH-2025-096', name: 'Akinola Abdulhamid', status: 'active' },
    { id: 'TCH-2025-097', name: 'Alexander Chinaza', status: 'active' },
    { id: 'TCH-2025-098', name: 'Balogun Muminat', status: 'active' },
    { id: 'TCH-2025-099', name: 'Fagbola Oladerin Emmanualla', status: 'active' },
    { id: 'TCH-2025-100', name: 'Ganiu Aliyat', status: 'active' },
    { id: 'TCH-2025-101', name: 'Idris Faridat', status: 'active' },
    { id: 'TCH-2025-102', name: 'Ikechukwu Miracle', status: 'active' },
    { id: 'TCH-2025-103', name: 'Kamilu Saheed', status: 'active' },
    { id: 'TCH-2025-104', name: 'Muritala Rokibat', status: 'active' },
    { id: 'TCH-2025-105', name: 'Ochege Rhoda', status: 'active' },
    { id: 'TCH-2025-106', name: 'Ojochegbe Linda', status: 'active' },
    { id: 'TCH-2025-107', name: 'Olaniyi Mary', status: 'active' },
    { id: 'TCH-2025-108', name: 'Olatunbosun Daniel', status: 'active' },
    { id: 'TCH-2025-109', name: 'Ologunre Marvellous', status: 'active' },
    { id: 'TCH-2025-110', name: 'Onifade Ayomide', status: 'active' },
    { id: 'TCH-2025-111', name: 'Oseni Idayat', status: 'active' },
    { id: 'TCH-2025-112', name: 'Sakiru John', status: 'active' },
    { id: 'TCH-2025-113', name: 'Shofowora Nifemi', status: 'active' },
    { id: 'TCH-2025-114', name: 'Suli Fridaus', status: 'active' },
    { id: 'TCH-2025-115', name: 'Yakubu Moses', status: 'active' }
  ],

  // ────────────────────────────────────────────────────
  'JSS3A': [
    { id: 'TCH-2025-116', name: 'Abdul Rasheed Rodiat', status: 'active' },
    { id: 'TCH-2025-117', name: 'Adebayo Dorcas', status: 'active' },
    { id: 'TCH-2025-118', name: 'Adebayo Favour', status: 'active' },
    { id: 'TCH-2025-119', name: 'Adeniyi Darasimi', status: 'active' },
    { id: 'TCH-2025-120', name: 'Afolayan Joshua', status: 'active' },
    { id: 'TCH-2025-121', name: 'Akanji Favour', status: 'active' },
    { id: 'TCH-2025-122', name: 'Akinbiyi Glory', status: 'active' },
    { id: 'TCH-2025-123', name: 'Amusat Khalilulahi O', status: 'active' },
    { id: 'TCH-2025-124', name: 'Aransiola', status: 'active' },
    { id: 'TCH-2025-125', name: 'Balogun Jomiloju', status: 'active' },
    { id: 'TCH-2025-126', name: 'Emmanuel Ayowole', status: 'active' },
    { id: 'TCH-2025-127', name: 'Emmanuel Maxwell', status: 'active' },
    { id: 'TCH-2025-128', name: 'Emmanuel Priscilla', status: 'active' },
    { id: 'TCH-2025-129', name: 'Fatuki Oluwanifemi', status: 'active' },
    { id: 'TCH-2025-130', name: 'Folorunsho Precious', status: 'active' },
    { id: 'TCH-2025-131', name: 'Garba Albarka', status: 'active' },
    { id: 'TCH-2025-132', name: 'Ibhadore Godswill', status: 'active' },
    { id: 'TCH-2025-133', name: 'Irinyemi Jomiloju Praise', status: 'active' },
    { id: 'TCH-2025-134', name: 'Kolade Idera', status: 'active' },
    { id: 'TCH-2025-135', name: 'Nanmwa Victor', status: 'active' },
    { id: 'TCH-2025-136', name: 'Nathaniel David', status: 'active' },
    { id: 'TCH-2025-137', name: 'Nelson Sonia C.C', status: 'active' },
    { id: 'TCH-2025-138', name: 'Nyakos Nurudeen', status: 'active' },
    { id: 'TCH-2025-139', name: 'Ogunlana Abdullahi', status: 'active' },
    { id: 'TCH-2025-140', name: 'Okwuabudike Victoria', status: 'active' },
    { id: 'TCH-2025-141', name: 'Olatunji Al-meen', status: 'active' },
    { id: 'TCH-2025-142', name: 'Olowu Fausiyat', status: 'active' },
    { id: 'TCH-2025-143', name: 'Oluborode True Vine', status: 'active' },
    { id: 'TCH-2025-144', name: 'Oseni Abdulsamod', status: 'active' },
    { id: 'TCH-2025-145', name: 'Owoyele Ramadan', status: 'active' },
    { id: 'TCH-2025-146', name: 'Oyewole Israel', status: 'active' },
    { id: 'TCH-2025-147', name: 'Salawudeen Fawas', status: 'active' },
    { id: 'TCH-2025-148', name: 'Sunny Blessing', status: 'active' },
    { id: 'TCH-2025-149', name: 'Waheed Aduragbemi', status: 'active' },
    { id: 'TCH-2025-150', name: 'Wisdom Donald', status: 'active' },
    { id: 'TCH-2025-151', name: 'Yusuf Taiwo', status: 'active' },
    { id: 'TCH-2025-152', name: 'Yusuff Abdul Sattar', status: 'active' }
  ],

  // ────────────────────────────────────────────────────
  'JSS3B': [
    { id: 'TCH-2025-153', name: 'Abdul Razak Somod', status: 'active' },
    { id: 'TCH-2025-154', name: 'Adebisi Aishat', status: 'active' },
    { id: 'TCH-2025-155', name: 'Adebisi Ayomide', status: 'active' },
    { id: 'TCH-2025-156', name: 'Adebisi Yusuf', status: 'active' },
    { id: 'TCH-2025-157', name: 'Adeniyi Korede', status: 'active' },
    { id: 'TCH-2025-158', name: 'Adewunmi Oluwademilade', status: 'active' },
    { id: 'TCH-2025-159', name: 'Agbo Favour', status: 'active' },
    { id: 'TCH-2025-160', name: 'Akinfe Christianah', status: 'active' },
    { id: 'TCH-2025-161', name: 'Ambrose Emmanuella', status: 'active' },
    { id: 'TCH-2025-162', name: 'Ariyo Moses', status: 'active' },
    { id: 'TCH-2025-163', name: 'Ayoade Doris', status: 'active' },
    { id: 'TCH-2025-164', name: 'Balogun Tobiloba', status: 'active' },
    { id: 'TCH-2025-165', name: 'Enabulele Israel', status: 'active' },
    { id: 'TCH-2025-166', name: 'Faluyi Israel', status: 'active' },
    { id: 'TCH-2025-167', name: 'Folorunsho Alexander', status: 'active' },
    { id: 'TCH-2025-168', name: 'Gabriel Peace', status: 'active' },
    { id: 'TCH-2025-169', name: 'Lawal Esther', status: 'active' },
    { id: 'TCH-2025-170', name: 'Medua Angel', status: 'active' },
    { id: 'TCH-2025-171', name: 'Nyakos Naimat', status: 'active' },
    { id: 'TCH-2025-172', name: 'Olajesu Kayode', status: 'active' },
    { id: 'TCH-2025-173', name: 'Olasunkanmi Ayobami', status: 'active' },
    { id: 'TCH-2025-174', name: 'Olukotun Feranmi', status: 'active' },
    { id: 'TCH-2025-175', name: 'Onafowokan Ridwan', status: 'active' },
    { id: 'TCH-2025-176', name: 'Opatimeyin David', status: 'active' },
    { id: 'TCH-2025-177', name: 'Oyeniyi David', status: 'active' },
    { id: 'TCH-2025-178', name: 'Popoola Aduragbemi', status: 'active' },
    { id: 'TCH-2025-179', name: 'Rotimi Eniola', status: 'active' },
    { id: 'TCH-2025-180', name: 'Samson Loveth', status: 'active' },
    { id: 'TCH-2025-181', name: 'Samuel Zainab', status: 'active' },
    { id: 'TCH-2025-182', name: 'Soyode Emmanuella', status: 'active' },
    { id: 'TCH-2025-183', name: 'Uduakhomo Peace', status: 'active' }
  ],

  // ────────────────────────────────────────────────────
  'SS1 Science': [
    { id: 'TCH-2025-184', name: 'Abdullateef Abdulsalam', status: 'active' },
    { id: 'TCH-2025-185', name: 'Abimbola Israel', status: 'active' },
    { id: 'TCH-2025-186', name: 'Adebayo Ayomide', status: 'active' },
    { id: 'TCH-2025-187', name: 'Adesalu Kamal', status: 'active' },
    { id: 'TCH-2025-188', name: 'Adeshina Fawaz', status: 'active' },
    { id: 'TCH-2025-189', name: 'Ajayi Aminat', status: 'active' },
    { id: 'TCH-2025-190', name: 'Ajewole Darasimi', status: 'active' },
    { id: 'TCH-2025-191', name: 'Ajibola Rodiat', status: 'active' },
    { id: 'TCH-2025-192', name: 'Akinyogha Taiwo', status: 'active' },
    { id: 'TCH-2025-193', name: 'Akoshile Hameedah', status: 'active' },
    { id: 'TCH-2025-194', name: 'Akpoveta Daniel', status: 'active' },
    { id: 'TCH-2025-195', name: 'Alexander Chukwu', status: 'active' },
    { id: 'TCH-2025-196', name: 'Amos Savior', status: 'active' },
    { id: 'TCH-2025-197', name: 'Ashaye Damola', status: 'active' },
    { id: 'TCH-2025-198', name: 'Ayangbola Damola', status: 'active' },
    { id: 'TCH-2025-199', name: 'Bakare Amirat', status: 'active' },
    { id: 'TCH-2025-200', name: 'Bakare Nifemi', status: 'active' },
    { id: 'TCH-2025-201', name: 'Balogun Momeen', status: 'active' },
    { id: 'TCH-2025-202', name: 'Bamidele Goodluck', status: 'active' },
    { id: 'TCH-2025-203', name: 'Chukwuemeka Favour', status: 'active' },
    { id: 'TCH-2025-204', name: 'Durosimi Abdullateef', status: 'active' },
    { id: 'TCH-2025-205', name: 'Emmanuel Godiva', status: 'active' },
    { id: 'TCH-2025-206', name: 'Fatai Muinat', status: 'active' },
    { id: 'TCH-2025-207', name: 'Folorunsho Elijah', status: 'active' },
    { id: 'TCH-2025-208', name: 'Hassanat', status: 'active' },
    { id: 'TCH-2025-209', name: 'Hilary Favour', status: 'active' },
    { id: 'TCH-2025-210', name: 'Jimoh Yewande', status: 'active' },
    { id: 'TCH-2025-211', name: 'Julius-Caleb Okenwan', status: 'active' },
    { id: 'TCH-2025-212', name: 'Lawal Promise', status: 'active' },
    { id: 'TCH-2025-213', name: 'Momoh Divine', status: 'active' },
    { id: 'TCH-2025-214', name: 'Musa Nimotallahi', status: 'active' },
    { id: 'TCH-2025-215', name: 'Nannette', status: 'active' },
    { id: 'TCH-2025-216', name: 'Ogbonna Joshua', status: 'active' },
    { id: 'TCH-2025-217', name: 'Ojo Precious', status: 'active' },
    { id: 'TCH-2025-218', name: 'Okebiyi Blessing', status: 'active' },
    { id: 'TCH-2025-219', name: 'Okebugwu Michael', status: 'active' },
    { id: 'TCH-2025-220', name: 'Oladipo Oluwabukola', status: 'active' },
    { id: 'TCH-2025-221', name: 'Olalere Halim', status: 'active' },
    { id: 'TCH-2025-222', name: 'Olaniyan Emmanuel', status: 'active' },
    { id: 'TCH-2025-223', name: 'Olubiyi Olamide', status: 'active' },
    { id: 'TCH-2025-224', name: 'Oluwatoyin Eniola', status: 'active' },
    { id: 'TCH-2025-225', name: 'Oni Ezekiel', status: 'active' },
    { id: 'TCH-2025-226', name: 'Onwuegbule Wisdom', status: 'active' },
    { id: 'TCH-2025-227', name: 'Opaje Teniola', status: 'active' },
    { id: 'TCH-2025-228', name: 'Opeyemi Michael', status: 'active' },
    { id: 'TCH-2025-229', name: 'Opeyemi Sultan', status: 'active' },
    { id: 'TCH-2025-230', name: 'Oyesanya Israel', status: 'active' },
    { id: 'TCH-2025-231', name: 'Samuel Benjamin', status: 'active' },
    { id: 'TCH-2025-232', name: 'Sanusi Farahat', status: 'active' },
    { id: 'TCH-2025-233', name: 'Sunday Isaac', status: 'active' }
  ],

  // ────────────────────────────────────────────────────
  'SS1 Actuarial': [
    // Pending — names to be added
  ],

  // ────────────────────────────────────────────────────
  'SS2 Science': [
    { id: 'TCH-2025-234', name: 'Abdullahi Malik', status: 'active' },
    { id: 'TCH-2025-235', name: 'Adeoye Rokeeb', status: 'active' },
    { id: 'TCH-2025-236', name: 'Adeyemi Adesewa', status: 'active' },
    { id: 'TCH-2025-237', name: 'Adeyemi Emmanuel', status: 'active' },
    { id: 'TCH-2025-238', name: 'Agbo Queen', status: 'active' },
    { id: 'TCH-2025-239', name: 'Akindutire Iretiola', status: 'active' },
    { id: 'TCH-2025-240', name: 'Alejo Samuel', status: 'active' },
    { id: 'TCH-2025-241', name: 'Babalola Rodiat', status: 'active' },
    { id: 'TCH-2025-242', name: 'Bakare Aliyat', status: 'active' },
    { id: 'TCH-2025-243', name: 'Eke Erica', status: 'active' },
    { id: 'TCH-2025-244', name: 'Emmanuel Annabel', status: 'active' },
    { id: 'TCH-2025-245', name: 'Enabulele Itohan', status: 'active' },
    { id: 'TCH-2025-246', name: 'Friday Godspower', status: 'active' },
    { id: 'TCH-2025-247', name: 'Igbenedion Folabomi', status: 'active' },
    { id: 'TCH-2025-248', name: 'Itama Daniel', status: 'active' },
    { id: 'TCH-2025-249', name: 'Jimoh Ganiyat', status: 'active' },
    { id: 'TCH-2025-250', name: 'Mohammed Awwal', status: 'active' },
    { id: 'TCH-2025-251', name: 'Mudashiru Usman', status: 'active' },
    { id: 'TCH-2025-252', name: 'Nelson Victor', status: 'active' },
    { id: 'TCH-2025-253', name: 'Oduola Olamide', status: 'active' },
    { id: 'TCH-2025-254', name: 'Okwabudike Mercy', status: 'active' },
    { id: 'TCH-2025-255', name: 'Olagbo Susan', status: 'active' },
    { id: 'TCH-2025-256', name: 'Olaniyi David', status: 'active' },
    { id: 'TCH-2025-257', name: 'Olushesi Basit', status: 'active' },
    { id: 'TCH-2025-258', name: 'Omotosho Faith', status: 'active' },
    { id: 'TCH-2025-259', name: 'Oyebanji Victoria', status: 'active' },
    { id: 'TCH-2025-260', name: 'Oyedeji Emmanuella', status: 'active' },
    { id: 'TCH-2025-261', name: 'Quadri Oluwadarasimi', status: 'active' },
    { id: 'TCH-2025-262', name: 'Sandy Karenapuch', status: 'active' },
    { id: 'TCH-2025-263', name: 'Sanyaolu Kehinde', status: 'active' },
    { id: 'TCH-2025-264', name: 'Sanyaolu Taiwo', status: 'active' },
    { id: 'TCH-2025-265', name: 'Sulaimon Alimoh', status: 'active' },
    { id: 'TCH-2025-266', name: 'Sunday Mary', status: 'active' }
  ],

  // ────────────────────────────────────────────────────
  'SS2 Actuarial': [
    { id: 'TCH-2025-267', name: 'Abdulrazak Abdulrahman', status: 'active' },
    { id: 'TCH-2025-268', name: 'Abdusalam Timileyin', status: 'active' },
    { id: 'TCH-2025-269', name: 'Abisoye Gold', status: 'active' },
    { id: 'TCH-2025-270', name: 'Adebayo Isaiah', status: 'active' },
    { id: 'TCH-2025-271', name: 'Adeniyi Gbolahan', status: 'active' },
    { id: 'TCH-2025-272', name: 'Adeola Darasimi', status: 'active' },
    { id: 'TCH-2025-273', name: 'Agboola Daniel', status: 'active' },
    { id: 'TCH-2025-274', name: 'Azeez Wazilat', status: 'active' },
    { id: 'TCH-2025-275', name: 'Bakare Bolaji', status: 'active' },
    { id: 'TCH-2025-276', name: 'Chukwu Samuel', status: 'active' },
    { id: 'TCH-2025-277', name: 'Ebere Larry', status: 'active' },
    { id: 'TCH-2025-278', name: 'Eduniyi Gideon', status: 'active' },
    { id: 'TCH-2025-279', name: 'Ewenra Noah', status: 'active' },
    { id: 'TCH-2025-280', name: 'Ibadore Miracle', status: 'active' },
    { id: 'TCH-2025-281', name: 'Ipadeola Idris', status: 'active' },
    { id: 'TCH-2025-282', name: 'Ipadeola Quadri', status: 'active' },
    { id: 'TCH-2025-283', name: 'Jewoola Boluwatife', status: 'active' },
    { id: 'TCH-2025-284', name: 'Lawal Gabriel', status: 'active' },
    { id: 'TCH-2025-285', name: 'Mathew Glory', status: 'active' },
    { id: 'TCH-2025-286', name: 'Njoh Ifeoma', status: 'active' },
    { id: 'TCH-2025-287', name: 'Nwacke Maryann', status: 'active' },
    { id: 'TCH-2025-288', name: 'Ochege Sunday', status: 'active' },
    { id: 'TCH-2025-289', name: 'Okarfor Ifeoma', status: 'active' },
    { id: 'TCH-2025-290', name: 'Oladeji Ala-meen', status: 'active' },
    { id: 'TCH-2025-291', name: 'Osiba Temiloluwa', status: 'active' },
    { id: 'TCH-2025-292', name: 'Osunibi Gbolahan', status: 'active' },
    { id: 'TCH-2025-293', name: 'Oyebode Precious', status: 'active' },
    { id: 'TCH-2025-294', name: 'Peter Godwin', status: 'active' },
    { id: 'TCH-2025-295', name: 'Shobowale Isaac', status: 'active' },
    { id: 'TCH-2025-296', name: 'Shokoya Samuel', status: 'active' },
    { id: 'TCH-2025-297', name: 'Sulaimon Aishat', status: 'active' },
    { id: 'TCH-2025-298', name: 'Zulukadeen Rokeeb', status: 'active' }
  ],

  // ────────────────────────────────────────────────────
  'SS3 Science': [
    { id: 'TCH-2025-299', name: 'Angel', status: 'active' },
    { id: 'TCH-2025-300', name: 'Bamise', status: 'active' },
    { id: 'TCH-2025-301', name: 'Bright', status: 'active' },
    { id: 'TCH-2025-302', name: 'Dorcas', status: 'active' },
    { id: 'TCH-2025-303', name: 'Enoch', status: 'active' },
    { id: 'TCH-2025-304', name: 'Famous', status: 'active' },
    { id: 'TCH-2025-305', name: 'Fauziyyah', status: 'active' },
    { id: 'TCH-2025-306', name: 'Fawaz', status: 'active' },
    { id: 'TCH-2025-307', name: 'Fiyin', status: 'active' },
    { id: 'TCH-2025-308', name: 'Habitat', status: 'active' },
    { id: 'TCH-2025-309', name: 'Kaosara', status: 'active' },
    { id: 'TCH-2025-310', name: 'Khadija', status: 'active' },
    { id: 'TCH-2025-311', name: 'Mercy', status: 'active' },
    { id: 'TCH-2025-312', name: 'Michael', status: 'active' },
    { id: 'TCH-2025-313', name: 'Moyin', status: 'active' },
    { id: 'TCH-2025-314', name: 'Prosper', status: 'active' },
    { id: 'TCH-2025-315', name: 'Rita', status: 'active' },
    { id: 'TCH-2025-316', name: 'Rokibat', status: 'active' },
    { id: 'TCH-2025-317', name: 'Samuel', status: 'active' },
    { id: 'TCH-2025-318', name: 'Taiwo', status: 'active' },
    { id: 'TCH-2025-319', name: 'Temi', status: 'active' },
    { id: 'TCH-2025-320', name: 'Zainab', status: 'active' }
  ],

  // ────────────────────────────────────────────────────
  'SS3 Actuarial': [
    { id: 'TCH-2025-321', name: 'Abdul Majeed Quadri', status: 'active' },
    { id: 'TCH-2025-322', name: 'Abdul Razak Kehinde', status: 'active' },
    { id: 'TCH-2025-323', name: 'Abuh God\'s Power', status: 'active' },
    { id: 'TCH-2025-324', name: 'Adebayo David', status: 'active' },
    { id: 'TCH-2025-325', name: 'Adeniran Moses', status: 'active' },
    { id: 'TCH-2025-326', name: 'Adesanya Emmanuel', status: 'active' },
    { id: 'TCH-2025-327', name: 'Adisa Fathia', status: 'active' },
    { id: 'TCH-2025-328', name: 'Ajibola Roheemot', status: 'active' },
    { id: 'TCH-2025-329', name: 'Amos Wisdom', status: 'active' },
    { id: 'TCH-2025-330', name: 'Asiemor Divine', status: 'active' },
    { id: 'TCH-2025-331', name: 'Enemali Ojotoeba', status: 'active' },
    { id: 'TCH-2025-332', name: 'Falope Darasimi', status: 'active' },
    { id: 'TCH-2025-333', name: 'Famakinwa Akorede', status: 'active' },
    { id: 'TCH-2025-334', name: 'Folorunsho Petra', status: 'active' },
    { id: 'TCH-2025-335', name: 'Muritala Rashidat', status: 'active' },
    { id: 'TCH-2025-336', name: 'Olalere Aishat', status: 'active' },
    { id: 'TCH-2025-337', name: 'Oyakan Emmanuel', status: 'active' },
    { id: 'TCH-2025-338', name: 'Sowole Azeem', status: 'active' },
    { id: 'TCH-2025-339', name: 'Tujiki David', status: 'active' },
    { id: 'TCH-2025-340', name: 'Yakubu Happiness', status: 'active' }
  ]
};


// ════════════════════════════════════════════════════
// ARCHIVE — graduated / transferred students
// ════════════════════════════════════════════════════
const STUDENTS_ARCHIVE = {
  /*
   * Structure mirrors STUDENTS_DB.
   * Move a student here and update their status field.
   * Add exitYear and exitClass for audit trail.
   * Example:
   *   'SS3 Science': [
   *     { id: 'TCH-2025-001', name: 'Ademola Daniel',
   *        status: 'graduated', exitYear: 2028, exitClass: 'SS3 Science' }
   *   ]
   */
};


// ════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ════════════════════════════════════════════════════

/** All active students as a flat array */
function getAllStudents() {
  return Object.values(STUDENTS_DB).flat();
}

/** All archived students as a flat array */
function getAllArchived() {
  return Object.values(STUDENTS_ARCHIVE).flat();
}

/** Student count for a given class */
function getClassCount(className) {
  return STUDENTS_DB[className] ? STUDENTS_DB[className].length : 0;
}

/** Total active student count */
function getTotalStudentCount() {
  return Object.values(STUDENTS_DB).reduce((sum, s) => sum + s.length, 0);
}

/** Find a student by ID — searches active DB first, then archive */
function findStudentById(studentId) {
  for (const cls in STUDENTS_DB) {
    const s = STUDENTS_DB[cls].find(s => s.id === studentId);
    if (s) return { ...s, class: cls };
  }
  for (const cls in STUDENTS_ARCHIVE) {
    const s = STUDENTS_ARCHIVE[cls].find(s => s.id === studentId);
    if (s) return { ...s, class: cls };
  }
  return null;
}

/** All active class names */
function getClassNames() {
  return Object.keys(STUDENTS_DB);
}

/**
 * Move a student to the archive.
 * @param {string} studentId  — e.g. 'TCH-2025-001'
 * @param {'graduated'|'transferred'} status
 * @param {number} exitYear    — e.g. 2028
 */
function archiveStudent(studentId, status, exitYear) {
  for (const cls in STUDENTS_DB) {
    const idx = STUDENTS_DB[cls].findIndex(s => s.id === studentId);
    if (idx !== -1) {
      const [student] = STUDENTS_DB[cls].splice(idx, 1);
      if (!STUDENTS_ARCHIVE[cls]) STUDENTS_ARCHIVE[cls] = [];
      STUDENTS_ARCHIVE[cls].push({ ...student, status, exitYear });
      return true;
    }
  }
  return false;
}
