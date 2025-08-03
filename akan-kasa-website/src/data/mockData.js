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
      objectives: [
        "Master basic greetings for different times of day",
        "Understand appropriate contexts for each greeting",
        "Practice pronunciation with audio examples",
        "Learn cultural significance of greetings in Akan society"
      ]
    }
  },
  {
    id: 2,
    title: "Family Relationships",
    description: "Explore family terms and kinship structures in Akan culture",
    level: "Beginner",
    duration: "20 minutes",
    content: {
      objectives: [
        "Learn words for immediate family members",
        "Understand extended family terminology",
        "Explore matrilineal system in Akan culture",
        "Practice using family terms in sentences"
      ]
    }
  },
  {
    id: 3,
    title: "Numbers and Counting",
    description: "Master Akan numbers from 1-100 with practical applications",
    level: "Beginner",
    duration: "25 minutes",
    content: {
      objectives: [
        "Count from 1 to 20 fluently",
        "Learn number combinations for larger numbers",
        "Practice using numbers in everyday contexts",
        "Understand traditional Akan counting systems"
      ]
    }
  },
  {
    id: 4,
    title: "Present Tense Verbs",
    description: "Introduction to Akan verb conjugation in present tense",
    level: "Intermediate",
    duration: "30 minutes",
    content: {
      objectives: [
        "Understand basic verb structure",
        "Learn common everyday verbs",
        "Practice present tense conjugation",
        "Form simple sentences with verbs"
      ]
    }
  },
  {
    id: 5,
    title: "Cultural Proverbs",
    description: "Explore wisdom through traditional Akan proverbs",
    level: "Advanced",
    duration: "35 minutes",
    content: {
      objectives: [
        "Learn 10 common Akan proverbs",
        "Understand metaphorical meanings",
        "Explore cultural wisdom and values",
        "Practice using proverbs in context"
      ]
    }
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
      downloadUrl: "/papers/akan-phonology-2023.pdf"
    },
    {
      id: 2,
      title: "Introduction to Akan Grammar",
      author: "Prof. Akosua Anyidoho",
      year: 2022,
      level: "Beginner",
      abstract: "A beginner-friendly guide to understanding basic Akan grammatical structures.",
      downloadUrl: "/papers/akan-grammar-intro.pdf"
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