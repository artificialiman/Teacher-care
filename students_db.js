/**
 * TENDERCARE SCHOOL - STUDENT DATABASE
 * Complete student roster for 2024/2025 academic year
 * Total: 109 students across 4 classes
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
