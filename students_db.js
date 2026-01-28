/**
 * TENDERCARE SCHOOL - STUDENT DATABASE
 * Complete student roster for 2024/2025 academic year
 * Total: 225 students across 7 classes
 * 
 * UPDATED: January 28, 2026
 * Added: SS1 Science, SS2 Science, SS2 Actuarial
 */

const STUDENTS_DB = {
  'SS3 Science': [
    { id: 'TCH001', name: 'Temi' },
    { id: 'TCH002', name: 'Bright' },
    { id: 'TCH003', name: 'Prosper' },
    { id: 'TCH004', name: 'Famous' },
    { id: 'TCH005', name: 'Samuel' },
    { id: 'TCH006', name: 'Michael' },
    { id: 'TCH007', name: 'Fauziyyah' },
    { id: 'TCH008', name: 'Mercy' },
    { id: 'TCH009', name: 'Zainab' },
    { id: 'TCH010', name: 'Kaosara' },
    { id: 'TCH011', name: 'Fiyin' },
    { id: 'TCH012', name: 'Enoch' },
    { id: 'TCH013', name: 'Taiwo' },
    { id: 'TCH014', name: 'Bamise' },
    { id: 'TCH015', name: 'Khadija' },
    { id: 'TCH016', name: 'Dorcas' },
    { id: 'TCH017', name: 'Moyin' },
    { id: 'TCH018', name: 'Rokibat' },
    { id: 'TCH019', name: 'Rita' },
    { id: 'TCH020', name: 'Angel' },
    { id: 'TCH021', name: 'Fawaz' },
    { id: 'TCH022', name: 'Habitat' }
  ],
  
  'SS3 Actuarial': [
    { id: 'TCH-H001', name: 'Abuh God\'s power' },
    { id: 'TCH-H002', name: 'Abdul Razak kehinde' },
    { id: 'TCH-H003', name: 'Abdul Majeed Quadri' },
    { id: 'TCH-H004', name: 'Adebayo David' },
    { id: 'TCH-H005', name: 'Adesanya Emmanuel' },
    { id: 'TCH-H006', name: 'Adeniran Moses' },
    { id: 'TCH-H007', name: 'Adisa Fathia' },
    { id: 'TCH-H008', name: 'Ajibola Roheemot' },
    { id: 'TCH-H009', name: 'Amos wisdom' },
    { id: 'TCH-H010', name: 'Enemali ojotoeba' },
    { id: 'TCH-H011', name: 'Folorunsho Petra' },
    { id: 'TCH-H012', name: 'Falope darasimi' },
    { id: 'TCH-H013', name: 'Famakinwa akorede' },
    { id: 'TCH-H014', name: 'Muritala rashidat' },
    { id: 'TCH-H015', name: 'Olalere aishat' },
    { id: 'TCH-H016', name: 'Oyakan Emmanuel' },
    { id: 'TCH-H017', name: 'Sowole Azeem' },
    { id: 'TCH-H018', name: 'Tujiki David' },
    { id: 'TCH-H019', name: 'Yakubu happiness' },
    { id: 'TCH-H020', name: 'Asiemor Divine' }
  ],
  
  'SS2 Science': [
    { id: 'SS2S001', name: 'Adeoye rokeeb' },
    { id: 'SS2S002', name: 'Adeyemi Emmanuel' },
    { id: 'SS2S003', name: 'Alejo Samuel' },
    { id: 'SS2S004', name: 'Abdullahi malik' },
    { id: 'SS2S005', name: 'Friday Godspower' },
    { id: 'SS2S006', name: 'Igbenedion Folabomi' },
    { id: 'SS2S007', name: 'Mudashiru usman' },
    { id: 'SS2S008', name: 'Mohammed awwal' },
    { id: 'SS2S009', name: 'Olaniyi david' },
    { id: 'SS2S010', name: 'Olushesi basit' },
    { id: 'SS2S011', name: 'Nelson Victor' },
    { id: 'SS2S012', name: 'Itama Daniel' },
    { id: 'SS2S013', name: 'Sanyaolu Kehinde' },
    { id: 'SS2S014', name: 'Adeyemi adesewa' },
    { id: 'SS2S015', name: 'Agbo queen' },
    { id: 'SS2S016', name: 'Akindutire iretiola' },
    { id: 'SS2S017', name: 'Babalola rodiat' },
    { id: 'SS2S018', name: 'Bakare aliyat' },
    { id: 'SS2S019', name: 'Jimoh ganiyat' },
    { id: 'SS2S020', name: 'Oduola olamide' },
    { id: 'SS2S021', name: 'Omotosho faith' },
    { id: 'SS2S022', name: 'Oyebanji victoria' },
    { id: 'SS2S023', name: 'Oyedeji emmanuella' },
    { id: 'SS2S024', name: 'Sulaimon alimoh' },
    { id: 'SS2S025', name: 'Eke Erica' },
    { id: 'SS2S026', name: 'Emmanuel Annabel' },
    { id: 'SS2S027', name: 'Enabulele itohan' },
    { id: 'SS2S028', name: 'Okwabudike mercy' },
    { id: 'SS2S029', name: 'Olagbo susan' },
    { id: 'SS2S030', name: 'Quadri Oluwadarasimi' },
    { id: 'SS2S031', name: 'Sandy karenapuch' },
    { id: 'SS2S032', name: 'Sanyaolu taiwo' },
    { id: 'SS2S033', name: 'Sunday mary' }
  ],
  
  'SS2 Actuarial': [
    { id: 'SS2A001', name: 'Abdusalam timileyin' },
    { id: 'SS2A002', name: 'Abdulrazak Abdulrahman' },
    { id: 'SS2A003', name: 'Abisoye Gold' },
    { id: 'SS2A004', name: 'Adebayo Isaiah' },
    { id: 'SS2A005', name: 'Adeniyi Gbolahan' },
    { id: 'SS2A006', name: 'Adeola darasimi' },
    { id: 'SS2A007', name: 'Agboola daniel' },
    { id: 'SS2A008', name: 'Azeez wazilat' },
    { id: 'SS2A009', name: 'Bakare bolaji' },
    { id: 'SS2A010', name: 'Chukwu Samuel' },
    { id: 'SS2A011', name: 'Ebere larry' },
    { id: 'SS2A012', name: 'Eduniyi gideon' },
    { id: 'SS2A013', name: 'Ewenra Noah' },
    { id: 'SS2A014', name: 'Ibadore Miracle' },
    { id: 'SS2A015', name: 'Ipadeola idris' },
    { id: 'SS2A016', name: 'Ipadeola quadri' },
    { id: 'SS2A017', name: 'Jewoola boluwatife' },
    { id: 'SS2A018', name: 'Lawal gabriel' },
    { id: 'SS2A019', name: 'Mathew glory' },
    { id: 'SS2A020', name: 'Njoh ifeoma' },
    { id: 'SS2A021', name: 'Nwacke maryann' },
    { id: 'SS2A022', name: 'Ochege Sunday' },
    { id: 'SS2A023', name: 'Okarfor ifeoma' },
    { id: 'SS2A024', name: 'Oladeji Ala-meen' },
    { id: 'SS2A025', name: 'Osiba Temiloluwa' },
    { id: 'SS2A026', name: 'Osunibi gbolahan' },
    { id: 'SS2A027', name: 'Oyebode precious' },
    { id: 'SS2A028', name: 'Peter godwin' },
    { id: 'SS2A029', name: 'Shobowale isaac' },
    { id: 'SS2A030', name: 'Shokoya samuel' },
    { id: 'SS2A031', name: 'Sulaimon aishat' },
    { id: 'SS2A032', name: 'Zulukadeen rokeeb' }
  ],
  
  'SS1 Science': [
    { id: 'SS1S001', name: 'Abdullateef abdulsalam' },
    { id: 'SS1S002', name: 'Abimbola israel' },
    { id: 'SS1S003', name: 'Adesalu kamal' },
    { id: 'SS1S004', name: 'Adeshina fawaz' },
    { id: 'SS1S005', name: 'Adebayo ayomide' },
    { id: 'SS1S006', name: 'Ajayi Aminat' },
    { id: 'SS1S007', name: 'Ajewole darasimi' },
    { id: 'SS1S008', name: 'Ajibola rodiat' },
    { id: 'SS1S009', name: 'Akinyogha taiwo' },
    { id: 'SS1S010', name: 'Akoshile hameedah' },
    { id: 'SS1S011', name: 'Akpoveta Daniel' },
    { id: 'SS1S012', name: 'Alexander chukwu' },
    { id: 'SS1S013', name: 'Ashaye damola' },
    { id: 'SS1S014', name: 'Amos Savior' },
    { id: 'SS1S015', name: 'Ayangbola damola' },
    { id: 'SS1S016', name: 'Bakare amirat' },
    { id: 'SS1S017', name: 'Bakare nifemi' },
    { id: 'SS1S018', name: 'Balogun momeen' },
    { id: 'SS1S019', name: 'Bamidele goodluck' },
    { id: 'SS1S020', name: 'Chukwuemeka favour' },
    { id: 'SS1S021', name: 'Durosimi abdullateef' },
    { id: 'SS1S022', name: 'Emmanuel godiva' },
    { id: 'SS1S023', name: 'Fatai muinat' },
    { id: 'SS1S024', name: 'Folorunsho elijah' },
    { id: 'SS1S025', name: 'Hilary favour' },
    { id: 'SS1S026', name: 'Jimoh yewande' },
    { id: 'SS1S027', name: 'Julius-Caleb Okenwan' },
    { id: 'SS1S028', name: 'Lawal promise' },
    { id: 'SS1S029', name: 'Nannette' },
    { id: 'SS1S030', name: 'Momoh divine' },
    { id: 'SS1S031', name: 'Musa nimotallahi' },
    { id: 'SS1S032', name: 'Ojo precious' },
    { id: 'SS1S033', name: 'Okebugwu michael' },
    { id: 'SS1S034', name: 'Okebiyi blessing' },
    { id: 'SS1S035', name: 'Oladipo oluwabukola' },
    { id: 'SS1S036', name: 'Olalere halim' },
    { id: 'SS1S037', name: 'Olaniyan Emmanuel' },
    { id: 'SS1S038', name: 'Olubiyi olamide' },
    { id: 'SS1S039', name: 'Ogbonna joshua' },
    { id: 'SS1S040', name: 'Oluwatoyin eniola' },
    { id: 'SS1S041', name: 'Oni ezekiel' },
    { id: 'SS1S042', name: 'Onwuegbule wisdom' },
    { id: 'SS1S043', name: 'Opeyemi michael' },
    { id: 'SS1S044', name: 'Opeyemi sultan' },
    { id: 'SS1S045', name: 'Opaje teniola' },
    { id: 'SS1S046', name: 'Oyesanya israel' },
    { id: 'SS1S047', name: 'Hassanat' },
    { id: 'SS1S048', name: 'Samuel Benjamin' },
    { id: 'SS1S049', name: 'Sanusi Farahat' },
    { id: 'SS1S050', name: 'Sunday isaac' }
  ],
  
  'JSS3A': [
    { id: 'J3A001', name: 'Adebayo Dorcas' },
    { id: 'J3A002', name: 'Adebayo favour' },
    { id: 'J3A003', name: 'Garba albarka' },
    { id: 'J3A004', name: 'Abdul Rasheed rodiat' },
    { id: 'J3A005', name: 'Akinbiyi Glory' },
    { id: 'J3A006', name: 'Folorunsho precious' },
    { id: 'J3A007', name: 'Ogunlana Abdullahi' },
    { id: 'J3A008', name: 'Adeniyi darasimi' },
    { id: 'J3A009', name: 'Emmanuel ayowole' },
    { id: 'J3A010', name: 'Ibhadore Godswill' },
    { id: 'J3A011', name: 'Aransiola' },
    { id: 'J3A012', name: 'Yusuff Abdul Sattar' },
    { id: 'J3A013', name: 'Owoyele Ramadan' },
    { id: 'J3A014', name: 'Akanji favour' },
    { id: 'J3A015', name: 'Wisdom Donald' },
    { id: 'J3A016', name: 'Salawudeen fawas' },
    { id: 'J3A017', name: 'Afolayan Joshua' },
    { id: 'J3A018', name: 'Balogun jomiloju' },
    { id: 'J3A019', name: 'Okwuabudike Victoria' },
    { id: 'J3A020', name: 'Oluborode true Vine' },
    { id: 'J3A021', name: 'Emmanuel Maxwell' },
    { id: 'J3A022', name: 'Nathaniel David' },
    { id: 'J3A023', name: 'Yusuf Taiwo' },
    { id: 'J3A024', name: 'Irinyemi jomiloju praise' },
    { id: 'J3A025', name: 'Emmanuel Priscilla' },
    { id: 'J3A026', name: 'Sunny blessing' },
    { id: 'J3A027', name: 'Fatuki oluwanifemi' },
    { id: 'J3A028', name: 'Oyewole Israel' },
    { id: 'J3A029', name: 'Kolade idera' },
    { id: 'J3A030', name: 'Oseni abdulsamod' },
    { id: 'J3A031', name: 'Nelson Sonia C.C' },
    { id: 'J3A032', name: 'Nyakos nurudeen' },
    { id: 'J3A033', name: 'Olatunji al-meen' },
    { id: 'J3A034', name: 'Olowu fausiyat' },
    { id: 'J3A035', name: 'Amusat khalilulahi. O' },
    { id: 'J3A036', name: 'Nanmwa victor' },
    { id: 'J3A037', name: 'Waheed Aduragbemi' }
  ],
  
  'JSS3B': [
    { id: 'J3B001', name: 'Adebisi Yusuf' },
    { id: 'J3B002', name: 'Soyode emmanuella' },
    { id: 'J3B003', name: 'Faluyi Israel' },
    { id: 'J3B004', name: 'Uduakhomo peace' },
    { id: 'J3B005', name: 'Balogun tobiloba' },
    { id: 'J3B006', name: 'Enabulele Israel' },
    { id: 'J3B007', name: 'Opatimeyin David' },
    { id: 'J3B008', name: 'Medua Angel' },
    { id: 'J3B009', name: 'Gabriel peace' },
    { id: 'J3B010', name: 'Agbo favour' },
    { id: 'J3B011', name: 'Lawal Esther' },
    { id: 'J3B012', name: 'Akinfe christianah' },
    { id: 'J3B013', name: 'Ayoade Doris' },
    { id: 'J3B014', name: 'Ambrose emmanuella' },
    { id: 'J3B015', name: 'Adewunmi oluwademilade' },
    { id: 'J3B016', name: 'Olasunkanmi ayobami' },
    { id: 'J3B017', name: 'Samson loveth' },
    { id: 'J3B018', name: 'Oyeniyi David' },
    { id: 'J3B019', name: 'Folorunsho Alexander' },
    { id: 'J3B020', name: 'Olukotun feranmi' },
    { id: 'J3B021', name: 'Adebisi aishat' },
    { id: 'J3B022', name: 'Samuel Zainab' },
    { id: 'J3B023', name: 'Nyakos naimat' },
    { id: 'J3B024', name: 'Olajesu Kayode' },
    { id: 'J3B025', name: 'Rotimi Eniola' },
    { id: 'J3B026', name: 'Onafowokan ridwan' },
    { id: 'J3B027', name: 'Adeniyi korede' },
    { id: 'J3B028', name: 'Abdul Razak somod' },
    { id: 'J3B029', name: 'Adebisi ayomide' },
    { id: 'J3B030', name: 'Ariyo moses' },
    { id: 'J3B031', name: 'Popoola Aduragbemi' }
  ]
};

// Helper function to get all students
function getAllStudents() {
  return Object.values(STUDENTS_DB).flat();
}

// Helper function to get student count by class
function getClassCount(className) {
  return STUDENTS_DB[className] ? STUDENTS_DB[className].length : 0;
}

// Helper function to get total student count
function getTotalStudentCount() {
  return Object.values(STUDENTS_DB).reduce((sum, students) => sum + students.length, 0);
}

// Helper function to find student by ID
function findStudentById(studentId) {
  for (const className in STUDENTS_DB) {
    const student = STUDENTS_DB[className].find(s => s.id === studentId);
    if (student) {
      return { ...student, class: className };
    }
  }
  return null;
}

// Helper function to get classes by level
function getClassesByLevel(level) {
  const levelMap = {
    'SS3': ['SS3 Science', 'SS3 Actuarial'],
    'SS2': ['SS2 Science', 'SS2 Actuarial'],
    'SS1': ['SS1 Science'],
    'JSS3': ['JSS3A', 'JSS3B']
  };
  return levelMap[level] || [];
}

// Helper function to get class summary
function getClassSummary() {
  const summary = {};
  for (const className in STUDENTS_DB) {
    summary[className] = {
      count: STUDENTS_DB[className].length,
      students: STUDENTS_DB[className]
    };
  }
  return summary;
}
