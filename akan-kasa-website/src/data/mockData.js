// Mock data for Akan language learning platform

export const alphabetData = [
  { letter: "A", pronunciation: "ah", example: "Aba (child)", audio: "/audio/a.mp3" },
  { letter: "B", pronunciation: "bay", example: "Boa (help)", audio: "/audio/b.mp3" },
  { letter: "D", pronunciation: "day", example: "Da (day)", audio: "/audio/d.mp3" },
  { letter: "E", pronunciation: "eh", example: "Efie (house)", audio: "/audio/e.mp3" },
  { letter: "Ɛ", pronunciation: "eh (open)", example: "Ɛpo (sea)", audio: "/audio/e_open.mp3" },
  { letter: "F", pronunciation: "fay", example: "Fie (home)", audio: "/audio/f.mp3" },
  { letter: "G", pronunciation: "gay", example: "Gua (dog)", audio: "/audio/g.mp3" },
  { letter: "H", pronunciation: "hay", example: "Hwe (look)", audio: "/audio/h.mp3" },
  { letter: "I", pronunciation: "ee", example: "Ino (there)", audio: "/audio/i.mp3" },
  { letter: "K", pronunciation: "kay", example: "Kasa (speak)", audio: "/audio/k.mp3" },
  { letter: "L", pronunciation: "lay", example: "Lɛ (eat)", audio: "/audio/l.mp3" },
  { letter: "M", pronunciation: "may", example: "Me (I/my)", audio: "/audio/m.mp3" },
  { letter: "N", pronunciation: "nay", example: "Na (and/then)", audio: "/audio/n.mp3" },
  { letter: "O", pronunciation: "oh", example: "Obi (someone)", audio: "/audio/o.mp3" },
  { letter: "Ɔ", pronunciation: "aw", example: "Ɔhene (king)", audio: "/audio/o_open.mp3" },
  { letter: "P", pronunciation: "pay", example: "Papa (father)", audio: "/audio/p.mp3" },
  { letter: "R", pronunciation: "ray", example: "Ra (sleep)", audio: "/audio/r.mp3" },
  { letter: "S", pronunciation: "say", example: "Sua (learn)", audio: "/audio/s.mp3" },
  { letter: "T", pronunciation: "tay", example: "To (buy)", audio: "/audio/t.mp3" },
  { letter: "U", pronunciation: "oo", example: "Uni (drink)", audio: "/audio/u.mp3" },
  { letter: "W", pronunciation: "way", example: "Wo (you)", audio: "/audio/w.mp3" },
  { letter: "Y", pronunciation: "yay", example: "Ye (do)", audio: "/audio/y.mp3" }
];

export const greetingsData = [
  {
    id: 1,
    akan: "Akwaaba",
    english: "Welcome",
    pronunciation: "ah-KWAH-bah",
    context: "Universal greeting of welcome, can be used any time",
    audio: "/audio/akwaaba.mp3"
  },
  {
    id: 2,
    akan: "Maakye",
    english: "Good morning",
    pronunciation: "MAH-chay",
    context: "Morning greeting used until about 11 AM",
    audio: "/audio/maakye.mp3"
  },
  {
    id: 3,
    akan: "Maaha",
    english: "Good afternoon",
    pronunciation: "MAH-hah",
    context: "Afternoon greeting used from 11 AM to 6 PM",
    audio: "/audio/maaha.mp3"
  },
  {
    id: 4,
    akan: "Maadwo",
    english: "Good evening",
    pronunciation: "MAH-dwo",
    context: "Evening greeting used after 6 PM",
    audio: "/audio/maadwo.mp3"
  },
  {
    id: 5,
    akan: "Ɛte sɛn?",
    english: "How are you?",
    pronunciation: "eh-tay-sen",
    context: "Common greeting to ask about someone's wellbeing",
    audio: "/audio/etesen.mp3"
  },
  {
    id: 6,
    akan: "Me ho yɛ",
    english: "I am fine",
    pronunciation: "may-ho-yay",
    context: "Standard response to 'How are you?'",
    audio: "/audio/mehoye.mp3"
  }
];

export const vocabularyModules = [
  {
    id: "family",
    title: "Family Members",
    description: "Learn words for family relationships",
    words: [
      { akan: "Papa", english: "Father", pronunciation: "PAH-pah", audio: "/audio/papa.mp3" },
      { akan: "Maame", english: "Mother", pronunciation: "MAH-may", audio: "/audio/maame.mp3" },
      { akan: "Ɔba", english: "Child", pronunciation: "AW-bah", audio: "/audio/oba.mp3" },
      { akan: "Nua", english: "Sibling", pronunciation: "NOO-ah", audio: "/audio/nua.mp3" },
      { akan: "Nana", english: "Grandparent", pronunciation: "NAH-nah", audio: "/audio/nana.mp3" },
      { akan: "Wɔfa", english: "Uncle", pronunciation: "WHAW-fah", audio: "/audio/wofa.mp3" },
      { akan: "Sewaa", english: "Aunt", pronunciation: "say-WAH", audio: "/audio/sewaa.mp3" },
      { akan: "Agya", english: "Father (formal)", pronunciation: "ah-CHAH", audio: "/audio/agya.mp3" }
    ]
  },
  {
    id: "numbers",
    title: "Numbers 1-20",
    description: "Count from one to twenty in Akan",
    words: [
      { akan: "Ɛnan", english: "One", pronunciation: "eh-NAHN", audio: "/audio/enan.mp3" },
      { akan: "Mmienu", english: "Two", pronunciation: "mm-YEH-noo", audio: "/audio/mmienu.mp3" },
      { akan: "Mmiɛnsa", english: "Three", pronunciation: "mm-YEHN-sah", audio: "/audio/mmiensa.mp3" },
      { akan: "Ɛnan", english: "Four", pronunciation: "eh-NAHN", audio: "/audio/enan.mp3" },
      { akan: "Enum", english: "Five", pronunciation: "eh-NOOM", audio: "/audio/enum.mp3" },
      { akan: "Ɛsia", english: "Six", pronunciation: "eh-SEE-ah", audio: "/audio/esia.mp3" },
      { akan: "Ɛson", english: "Seven", pronunciation: "eh-SAWN", audio: "/audio/eson.mp3" },
      { akan: "Ɛwɔtwe", english: "Eight", pronunciation: "eh-WHAW-tway", audio: "/audio/ewotwe.mp3" }
    ]
  },
  {
    id: "food",
    title: "Food & Drink",
    description: "Essential words for meals and dining",
    words: [
      { akan: "Aduane", english: "Food", pronunciation: "ah-DOO-ah-nay", audio: "/audio/aduane.mp3" },
      { akan: "Nsuo", english: "Water", pronunciation: "nn-SOO-oh", audio: "/audio/nsuo.mp3" },
      { akan: "Emo", english: "Rice", pronunciation: "eh-MOH", audio: "/audio/emo.mp3" },
      { akan: "Abɔlɔ", english: "Bread", pronunciation: "ah-BAW-law", audio: "/audio/abolo.mp3" },
      { akan: "Nkwan", english: "Soup", pronunciation: "nn-KWAHN", audio: "/audio/nkwan.mp3" },
      { akan: "Kɔkɔ", english: "Cocoa", pronunciation: "KAW-kaw", audio: "/audio/koko.mp3" }
    ]
  }
];

export const lessonsData = [
  {
    id: 1,
    title: "Introduction to Akan Greetings",
    description: "Learn the fundamental greetings used in daily Akan conversations",
    level: "Beginner",
    duration: "15 minutes",
    content: {
      overview: "This lesson introduces you to the essential greetings used in Akan language and culture. You'll learn when and how to use different greetings throughout the day.",
      objectives: [
        "Master basic greetings for different times of day",
        "Understand appropriate contexts for each greeting",
        "Practice pronunciation with audio examples",
        "Learn cultural significance of greetings in Akan society"
      ],
      sections: [
        {
          title: "Morning Greetings",
          content: "In Akan culture, greetings are extremely important and show respect. The morning greeting 'Maakye' is used from sunrise until around 11 AM. It's important to greet elders first in any gathering."
        },
        {
          title: "Afternoon and Evening Greetings",
          content: "After 11 AM, you would use 'Maaha' for afternoon greetings. In the evening, after about 6 PM, you would use 'Maadwo'. These time-specific greetings show attention to the natural rhythms of the day."
        },
        {
          title: "Cultural Context",
          content: "Greetings in Akan culture are not just about saying hello. They acknowledge the well-being of the person and their family. When greeting someone, you might ask 'Ɛte sɛn?' (How are you?) and they would respond with 'Me ho yɛ' (I am fine)."
        }
      ]
    },
    quiz: [
      {
        question: "What greeting is used in the morning?",
        options: [
          "Maakye",
          "Maaha",
          "Maadwo",
          "Akwaaba"
        ],
        correct: 0
      },
      {
        question: "What does 'Ɛte sɛn?' mean?",
        options: [
          "Good morning",
          "How are you?",
          "I am fine",
          "Thank you"
        ],
        correct: 1
      },
      {
        question: "What is the appropriate response to 'Ɛte sɛn?'?",
        options: [
          "Maakye",
          "Me ho yɛ",
          "Akwaaba",
          "Medaase"
        ],
        correct: 1
      }
    ]
  },
  {
    id: 2,
    title: "Family Relationships",
    description: "Explore family terms and kinship structures in Akan culture",
    level: "Beginner",
    duration: "20 minutes",
    content: {
      overview: "This lesson covers essential family terms in Akan and introduces the unique matrilineal kinship system that is central to Akan culture.",
      objectives: [
        "Learn words for immediate family members",
        "Understand extended family terminology",
        "Explore matrilineal system in Akan culture",
        "Practice using family terms in sentences"
      ],
      sections: [
        {
          title: "Immediate Family Terms",
          content: "In Akan, family terms distinguish between maternal and paternal relatives. 'Papa' means father, while 'Maame' means mother. 'Ɔba' means child, and 'Nua' refers to siblings."
        },
        {
          title: "Extended Family and Kinship",
          content: "The Akan kinship system is complex and based on lineage. Terms like 'Wɔfa' (uncle) and 'Sewaa' (aunt) can refer to multiple relatives depending on whether they're from the mother's or father's side."
        },
        {
          title: "Matrilineal System",
          content: "In Akan culture, inheritance and family name traditionally pass through the mother's line. This means children belong to their mother's family clan, and their most important male role model is their maternal uncle rather than their father."
        }
      ]
    },
    quiz: [
      {
        question: "What does 'Maame' mean in Akan?",
        options: [
          "Father",
          "Mother",
          "Child",
          "Sibling"
        ],
        correct: 1
      },
      {
        question: "In traditional Akan culture, which line determines family inheritance?",
        options: [
          "Paternal (father's) line",
          "Maternal (mother's) line",
          "Either line",
          "Elder sibling's line"
        ],
        correct: 1
      },
      {
        question: "What is the term for sibling in Akan?",
        options: [
          "Nana",
          "Wɔfa",
          "Nua",
          "Agya"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 3,
    title: "Numbers and Counting",
    description: "Master Akan numbers from 1-100 with practical applications",
    level: "Beginner",
    duration: "25 minutes",
    content: {
      overview: "Learn to count in Akan from 1 to 100, understanding the unique counting system and practical applications in daily life.",
      objectives: [
        "Count from 1 to 20 fluently",
        "Learn number combinations for larger numbers",
        "Practice using numbers in everyday contexts",
        "Understand traditional Akan counting systems"
      ],
      sections: [
        {
          title: "Numbers 1-10",
          content: "Akan numbers 1-10 are foundational. 'Ɛnan' is one, 'Mmienu' is two, 'Mmiɛnsa' is three, 'Ɛnan' is four (again), 'Enum' is five, 'Ɛsia' is six, 'Ɛson' is seven, 'Ɛwɔtwe' is eight, 'Kwaku' is nine, and 'Ɛwo' is ten."
        },
        {
          title: "Numbers 11-20",
          content: "Numbers 11-19 are formed by adding to ten. For example, 11 is 'Ɛwo kɛnɛ Ɛnan' (ten and one). Twenty is 'Dua' which is an important base number in Akan counting."
        },
        {
          title: "Higher Numbers",
          content: "Numbers beyond 20 use multiples of 20. Forty is 'Dua nnɛ' (two twenties), sixty is 'Dua saba' (three twenties), and so on. This vigesimal (base-20) system reflects traditional Akan mathematics."
        }
      ]
    },
    quiz: [
      {
        question: "What is the Akan word for 'five'?",
        options: [
          "Ɛnan",
          "Mmienu",
          "Enum",
          "Ɛsia"
        ],
        correct: 2
      },
      {
        question: "What is the base number in the traditional Akan counting system?",
        options: [
          "10",
          "12",
          "20",
          "25"
        ],
        correct: 2
      },
      {
        question: "How would you say '11' in Akan?",
        options: [
          "Ɛwo kɛnɛ Ɛnan",
          "Dua kɛnɛ Ɛnan",
          "Enum kɛnɛ Ɛnan",
          "Ɛson kɛnɛ Ɛnan"
        ],
        correct: 0
      }
    ]
  },
  {
    id: 4,
    title: "Present Tense Verbs",
    description: "Introduction to Akan verb conjugation in present tense",
    level: "Intermediate",
    duration: "30 minutes",
    content: {
      overview: "Learn how to conjugate verbs in the present tense in Akan, understanding subject prefixes and their application in forming sentences.",
      objectives: [
        "Understand basic verb structure",
        "Learn common everyday verbs",
        "Practice present tense conjugation",
        "Form simple sentences with verbs"
      ],
      sections: [
        {
          title: "Verb Structure Basics",
          content: "Akan verbs don't change form based on tense but use subject prefixes to indicate who is performing the action. The basic structure is: Subject Prefix + Verb Root + (Object)."
        },
        {
          title: "Subject Prefixes",
          content: "Common subject prefixes include 'Me' (I), 'Wo' (You), 'Ɔ' (He/She), 'Yɛn' (We), 'Mon' (You all), and 'Wɔn' (They). For example, 'Me' + 'bue' (to buy) = 'Mebue' (I buy)."
        },
        {
          title: "Common Verbs and Usage",
          content: "Frequently used verbs include 'bue' (to buy), 'kɔ' (to go), 'ba' (to come), 'yɛ' (to do/make), and 'tumi' (can). These verbs are used in daily conversations and form the foundation for more complex sentences."
        }
      ]
    },
    quiz: [
      {
        question: "How would you say 'I buy' in Akan?",
        options: [
          "Wobue",
          "Mebue",
          "Ɔbue",
          "Yɛnbue"
        ],
        correct: 1
      },
      {
        question: "What does the subject prefix 'Wo' indicate?",
        options: [
          "I",
          "You (singular)",
          "He/She",
          "We"
        ],
        correct: 1
      },
      {
        question: "What is the meaning of the verb 'yɛ' in Akan?",
        options: [
          "To buy",
          "To go",
          "To do/make",
          "To come"
        ],
        correct: 2
      }
    ]
  },
  {
    id: 5,
    title: "Cultural Proverbs",
    description: "Explore wisdom through traditional Akan proverbs",
    level: "Advanced",
    duration: "35 minutes",
    content: {
      overview: "Discover the rich tradition of Akan proverbs (Akan: 'mmerɛnw') and their role in conveying cultural wisdom, values, and life lessons.",
      objectives: [
        "Learn 10 common Akan proverbs",
        "Understand metaphorical meanings",
        "Explore cultural wisdom and values",
        "Practice using proverbs in context"
      ],
      sections: [
        {
          title: "Introduction to Akan Proverbs",
          content: "Akan proverbs, known as 'mmerɛnw', are short, meaningful sayings that convey wisdom and cultural values. They are often used in conversation to make a point more effectively than direct speech."
        },
        {
          title: "Common Proverbs and Meanings",
          content: "Popular proverbs include 'Ɔkra kɛse ɛbɛn kɔɔrɔ' (A single stick does not make a fire), which emphasizes the importance of community. Another is 'Sɛ obiara ɔbɛn a, ɛnna ɔbɛn na ɔbɛn' (When a person is born, they don't come with a book of customs), meaning we learn culture through experience."
        },
        {
          title: "Using Proverbs in Context",
          content: "Proverbs are used in Akan culture to teach lessons, resolve conflicts, and express complex ideas. They are particularly important in traditional courts and family gatherings where elders use them to guide younger generations."
        }
      ]
    },
    quiz: [
      {
        question: "What are Akan proverbs called in the local language?",
        options: [
          "Adwin",
          "Mmerɛnw",
          "Nsa",
          "Akanfo"
        ],
        correct: 1
      },
      {
        question: "What is the meaning of 'Ɔkra kɛse ɛbɛn kɔɔrɔ'?",
        options: [
          "A single stick does not make a fire",
          "When you fall, you learn to stand",
          "Words are stronger than actions",
          "The early bird catches the worm"
        ],
        correct: 0
      },
      {
        question: "In what contexts are proverbs commonly used in Akan culture?",
        options: [
          "Only in schools",
          "Traditional courts and family gatherings",
          "Only in religious ceremonies",
          "Only in marketplaces"
        ],
        correct: 1
      }
    ]
  }
];

export const culturalData = {
  traditions: [
    {
      id: 1,
      title: "Naming Ceremonies",
      description: "Traditional Akan naming practices for newborns",
      content: "Children are named after the day of the week they were born, with different names for boys and girls.",
      importance: "High",
      region: "All Akan areas"
    },
    {
      id: 2,
      title: "Adae Festival",
      description: "Sacred day when ancestors are honored",
      content: "A traditional day of rest and spiritual reflection held every 21 days.",
      importance: "High",
      region: "Ashanti, Akuapem"
    }
  ],
  symbols: [
    {
      id: 1,
      name: "Sankofa",
      symbol: "𝓢",
      meaning: "Go back and get it - learning from the past",
      usage: "Education, wisdom, personal growth"
    },
    {
      id: 2,
      name: "Gye Nyame",
      symbol: "※",
      meaning: "Except for God - supremacy of God",
      usage: "Spiritual contexts, decoration"
    }
  ]
};

export const dictionaryData = [
  {
    id: 1,
    akan: "Adwo",
    english: "Peace",
    category: "Abstract Concepts",
    pronunciation: "ah-DWOH",
    etymology: "From ancient Akan root meaning 'calm'",
    examples: [
      { akan: "Yɛpɛ adwo", english: "We want peace" },
      { akan: "Adwo wɔ fie", english: "There is peace at home" }
    ],
    audio: "/audio/adwo.mp3"
  },
  {
    id: 2,
    akan: "Abrewa",
    english: "Old woman",
    category: "People",
    pronunciation: "ah-BRAY-wah",
    etymology: "Compound word: 'abere' (old) + 'baa' (woman)",
    examples: [
      { akan: "Abrewa no yɛ nyansafoɔ", english: "The old woman is wise" }
    ],
    audio: "/audio/abrewa.mp3"
  }
];

export const researchData = {
  papers: [
    {
      id: 1,
      title: "Phonological Variations in Akan Dialects",
      author: "Dr. Kofi Agyekum",
      year: 2023,
      level: "Advanced",
      abstract: "A comprehensive study of phonological differences across major Akan dialect groups.",
      downloadUrl: "/papers/akan-phonology-2023.pdf",
      tags: ["phonology", "dialects", "linguistics"]
    },
    {
      id: 2,
      title: "Introduction to Akan Grammar",
      author: "Prof. Akosua Anyidoho",
      year: 2022,
      level: "Beginner",
      abstract: "A beginner-friendly guide to understanding basic Akan grammatical structures.",
      downloadUrl: "/papers/akan-grammar-intro.pdf",
      tags: ["grammar", "syntax", "morphology"]
    }
  ],
  tools: [
    {
      id: 1,
      name: "Akan Tone Analyzer",
      description: "Upload audio files to analyze Akan tonal patterns",
      url: "/tools/tone-analyzer"
    },
    {
      id: 2,
      name: "Corpus Search",
      description: "Search through thousands of Akan texts and recordings",
      url: "/tools/corpus-search"
    }
  ]
};

export const forumData = [
  {
    id: 1,
    title: "Best practices for Akan language documentation",
    content: "I'm looking for recommendations on how to properly document Akan language features for academic research.",
    author: "Dr. Kofi Asante",
    lastActivity: "2 hours ago",
    replies: 12,
    category: "Research Methods",
    tags: ["documentation", "research", "methodology"]
  },
  {
    id: 2,
    title: "Resources for studying Akan proverbs",
    content: "Does anyone know of good collections of Akan proverbs with translations and cultural context?",
    author: "Akosua Mensah",
    lastActivity: "5 hours ago",
    replies: 8,
    category: "Learning Resources",
    tags: ["proverbs", "literature", "culture"]
  },
  {
    id: 3,
    title: "Collaboration on dialect comparison project",
    content: "Seeking collaborators for a project comparing Akuapem and Asante dialects. Experience with fieldwork preferred.",
    author: "Yaw Boateng",
    lastActivity: "1 day ago",
    replies: 15,
    category: "Collaboration",
    tags: ["dialects", "collaboration", "fieldwork"]
  }
];

export const communityData = {
  events: [
    {
      id: 1,
      title: "Virtual Akan Language Exchange",
      date: "2025-02-15",
      time: "19:00 GMT",
      description: "Practice your Akan with native speakers in a friendly online environment",
      type: "Online",
      participants: 45
    },
    {
      id: 2,
      title: "Adinkra Symbol Workshop",
      date: "2025-02-22",
      time: "14:00 GMT",
      description: "Learn about traditional Akan symbols and their meanings",
      type: "Online",
      participants: 32
    }
  ],
  forums: [
    {
      id: 1,
      title: "Beginner Questions",
      description: "Ask any questions about learning Akan",
      posts: 156,
      latestActivity: "2 hours ago"
    },
    {
      id: 2,
      title: "Cultural Discussions",
      description: "Explore Akan culture, traditions, and customs",
      posts: 89,
      latestActivity: "5 hours ago"
    }
  ]
};

export const userProfiles = [
  {
    id: 1,
    name: "Kwame Asante",
    role: "Language Instructor",
    location: "Accra, Ghana",
    contributions: 124,
    joined: "2023-01-15",
    specialties: ["Grammar", "Pronunciation", "Cultural Context"]
  },
  {
    id: 2,
    name: "Adwoa Boateng",
    role: "Research Scholar",
    location: "Kumasi, Ghana",
    contributions: 89,
    joined: "2023-03-22",
    specialties: ["Linguistics", "Historical Development", "Dialects"]
  },
  {
    id: 3,
    name: "Yaw Mensah",
    role: "Community Moderator",
    location: "London, UK",
    contributions: 156,
    joined: "2022-11-08",
    specialties: ["Learning Resources", "Community Building", "Technology"]
  },
  {
    id: 4,
    name: "Akosua Darko",
    role: "Cultural Ambassador",
    location: "Washington, USA",
    contributions: 97,
    joined: "2023-05-30",
    specialties: ["Traditions", "Festivals", "Cultural Exchange"]
  },
  {
    id: 5,
    name: "Kofi Appiah",
    role: "Content Creator",
    location: "Toronto, Canada",
    contributions: 203,
    joined: "2022-08-14",
    specialties: ["Educational Videos", "Interactive Lessons", "Storytelling"]
  },
  {
    id: 6,
    name: "Afua Nyantakyi",
    role: "Translation Specialist",
    location: "Leiden, Netherlands",
    contributions: 76,
    joined: "2023-07-19",
    specialties: ["Literature", "Academic Papers", "Technical Documents"]
  }
];
