// Mock data for the Akan Kasa ne Amammere website

export const alphabetData = [
  { letter: 'A', pronunciation: '/a/', example: 'Akwaaba - Welcome', audio: 'audio/a.mp3' },
  { letter: 'B', pronunciation: '/b/', example: 'Boa - Help', audio: 'audio/b.mp3' },
  { letter: 'D', pronunciation: '/d/', example: 'Da - Day', audio: 'audio/d.mp3' },
  { letter: 'E', pronunciation: '/e/', example: 'Eda - Bed', audio: 'audio/e.mp3' },
  { letter: 'Ɛ', pronunciation: '/ɛ/', example: 'Ɛbɛ - It will come', audio: 'audio/e_open.mp3' },
  { letter: 'F', pronunciation: '/f/', example: 'Firi - From', audio: 'audio/f.mp3' },
  { letter: 'G', pronunciation: '/g/', example: 'Gya - Fire', audio: 'audio/g.mp3' },
  { letter: 'H', pronunciation: '/h/', example: 'Hɔ - There', audio: 'audio/h.mp3' },
  { letter: 'I', pronunciation: '/i/', example: 'Ino - This', audio: 'audio/i.mp3' },
  { letter: 'K', pronunciation: '/k/', example: 'Kɔ - Go', audio: 'audio/k.mp3' },
  { letter: 'L', pronunciation: '/l/', example: 'Liu - Fast', audio: 'audio/l.mp3' },
  { letter: 'M', pronunciation: '/m/', example: 'Me - I/Me', audio: 'audio/m.mp3' },
  { letter: 'N', pronunciation: '/n/', example: 'Na - And', audio: 'audio/n.mp3' },
  { letter: 'O', pronunciation: '/o/', example: 'Ɔno - He/She', audio: 'audio/o.mp3' },
  { letter: 'Ɔ', pronunciation: '/ɔ/', example: 'Ɔbaa - Woman', audio: 'audio/o_open.mp3' },
  { letter: 'P', pronunciation: '/p/', example: 'Papa - Good', audio: 'audio/p.mp3' },
  { letter: 'R', pronunciation: '/r/', example: 'Ra - Come', audio: 'audio/r.mp3' },
  { letter: 'S', pronunciation: '/s/', example: 'Sɛ - If/Say', audio: 'audio/s.mp3' },
  { letter: 'T', pronunciation: '/t/', example: 'Tɔ - Buy', audio: 'audio/t.mp3' },
  { letter: 'U', pronunciation: '/u/', example: 'Uso - Behind', audio: 'audio/u.mp3' },
  { letter: 'W', pronunciation: '/w/', example: 'Wo - You', audio: 'audio/w.mp3' },
  { letter: 'Y', pronunciation: '/j/', example: 'Yɛ - We/Do', audio: 'audio/y.mp3' }
];

export const greetingsData = [
  {
    id: 1,
    akan: 'Akwaaba',
    english: 'Welcome',
    pronunciation: 'ak-WAH-bah',
    audio: 'audio/akwaaba.mp3',
    context: 'Used to welcome someone'
  },
  {
    id: 2,
    akan: 'Maakye',
    english: 'Good morning',
    pronunciation: 'MAH-cheh',
    audio: 'audio/maakye.mp3',
    context: 'Morning greeting'
  },
  {
    id: 3,
    akan: 'Maaha',
    english: 'Good afternoon',
    pronunciation: 'MAH-hah',
    audio: 'audio/maaha.mp3',
    context: 'Afternoon greeting'
  },
  {
    id: 4,
    akan: 'Maadwo',
    english: 'Good evening',
    pronunciation: 'MAH-dwo',
    audio: 'audio/maadwo.mp3',
    context: 'Evening greeting'
  },
  {
    id: 5,
    akan: 'Ɛte sɛn?',
    english: 'How are you?',
    pronunciation: 'eh-teh-sehn',
    audio: 'audio/ete_sen.mp3',
    context: 'Asking how someone is doing'
  },
  {
    id: 6,
    akan: 'Me ho yɛ',
    english: 'I am fine',
    pronunciation: 'meh-ho-yeh',
    audio: 'audio/me_ho_ye.mp3',
    context: 'Response to how are you'
  },
  {
    id: 7,
    akan: 'Meda wo ase',
    english: 'Thank you',
    pronunciation: 'meh-dah-wo-ah-seh',
    audio: 'audio/meda_wo_ase.mp3',
    context: 'Expressing gratitude'
  },
  {
    id: 8,
    akan: 'Nante yie',
    english: 'Goodbye (to someone leaving)',
    pronunciation: 'nahn-teh-yee-eh',
    audio: 'audio/nante_yie.mp3',
    context: 'Farewell to someone departing'
  }
];

export const vocabularyModules = [
  {
    id: 'family',
    title: 'Family Members',
    description: 'Learn Akan words for family relationships',
    words: [
      { akan: 'Papa', english: 'Father', pronunciation: 'PAH-pah', audio: 'audio/papa.mp3' },
      { akan: 'Maame', english: 'Mother', pronunciation: 'MAH-meh', audio: 'audio/maame.mp3' },
      { akan: 'Onua', english: 'Sibling', pronunciation: 'oh-NOO-ah', audio: 'audio/onua.mp3' },
      { akan: 'Nana', english: 'Grandparent', pronunciation: 'NAH-nah', audio: 'audio/nana.mp3' },
      { akan: 'Ba', english: 'Child', pronunciation: 'bah', audio: 'audio/ba.mp3' },
      { akan: 'Ɔbarima', english: 'Man', pronunciation: 'oh-bah-ree-mah', audio: 'audio/obarima.mp3' },
      { akan: 'Ɔbaa', english: 'Woman', pronunciation: 'oh-bah', audio: 'audio/obaa.mp3' }
    ]
  },
  {
    id: 'numbers',
    title: 'Numbers',
    description: 'Count from 1 to 10 in Akan',
    words: [
      { akan: 'Baako', english: 'One', pronunciation: 'BAH-ko', audio: 'audio/baako.mp3' },
      { akan: 'Mmienu', english: 'Two', pronunciation: 'mm-YEH-nu', audio: 'audio/mmienu.mp3' },
      { akan: 'Mmiɛnsa', english: 'Three', pronunciation: 'mm-YEH-sah', audio: 'audio/mmensa.mp3' },
      { akan: 'Ɛnan', english: 'Four', pronunciation: 'eh-nahn', audio: 'audio/enan.mp3' },
      { akan: 'Enum', english: 'Five', pronunciation: 'eh-num', audio: 'audio/enum.mp3' },
      { akan: 'Nsia', english: 'Six', pronunciation: 'nn-see-ah', audio: 'audio/nsia.mp3' },
      { akan: 'Nson', english: 'Seven', pronunciation: 'nn-son', audio: 'audio/nson.mp3' },
      { akan: 'Nwɔtwe', english: 'Eight', pronunciation: 'nn-woh-twe', audio: 'audio/nwotwe.mp3' },
      { akan: 'Nkron', english: 'Nine', pronunciation: 'nn-kron', audio: 'audio/nkron.mp3' },
      { akan: 'Du', english: 'Ten', pronunciation: 'doo', audio: 'audio/du.mp3' }
    ]
  },
  {
    id: 'days',
    title: 'Days of the Week',
    description: 'Learn the Akan names for days of the week',
    words: [
      { akan: 'Dwoada', english: 'Monday', pronunciation: 'DWOH-ah-dah', audio: 'audio/dwoada.mp3' },
      { akan: 'Benada', english: 'Tuesday', pronunciation: 'beh-NAH-dah', audio: 'audio/benada.mp3' },
      { akan: 'Wukuada', english: 'Wednesday', pronunciation: 'woo-KOO-ah-dah', audio: 'audio/wukuada.mp3' },
      { akan: 'Yawda', english: 'Thursday', pronunciation: 'YAH-dah', audio: 'audio/yawda.mp3' },
      { akan: 'Fiada', english: 'Friday', pronunciation: 'fee-AH-dah', audio: 'audio/fiada.mp3' },
      { akan: 'Memeneda', english: 'Saturday', pronunciation: 'meh-meh-NEH-dah', audio: 'audio/memeneda.mp3' },
      { akan: 'Kwasida', english: 'Sunday', pronunciation: 'kwah-SEE-dah', audio: 'audio/kwasida.mp3' }
    ]
  }
];

export const lessonsData = [
  {
    id: 1,
    title: 'Introduction to Akan',
    level: 'beginner',
    duration: '15 min',
    description: 'Learn about the Akan language and its importance in Ghana',
    content: {
      overview: 'Akan is a Central Tano language and the principal native language of the Akan people of Ghana, spoken by over 9 million people.',
      objectives: [
        'Understand the history of Akan language',
        'Learn basic pronunciation rules',
        'Recognize common language patterns'
      ],
      sections: [
        {
          title: 'History and Origin',
          content: 'The Akan language belongs to the Niger-Congo language family and is spoken primarily in southern and central Ghana. It serves as a lingua franca for much of the country.'
        },
        {
          title: 'Dialects',
          content: 'Major dialects include Twi (Asante and Akuapem), Fante, and others. Each has unique characteristics but are mutually intelligible.'
        }
      ]
    },
    quiz: [
      {
        question: 'How many people speak Akan?',
        options: ['5 million', '7 million', '9 million', '12 million'],
        correct: 2
      }
    ]
  },
  {
    id: 2,
    title: 'Basic Greetings',
    level: 'beginner',
    duration: '20 min',
    description: 'Master essential Akan greetings for daily interactions',
    content: {
      overview: 'Greetings are extremely important in Akan culture and show respect and acknowledgment of others.',
      objectives: [
        'Learn morning, afternoon, and evening greetings',
        'Understand appropriate responses',
        'Practice pronunciation with audio'
      ],
      sections: [
        {
          title: 'Time-based Greetings',
          content: 'Different greetings are used depending on the time of day, showing cultural awareness and respect.'
        }
      ]
    },
    quiz: [
      {
        question: 'What is the Akan word for "Good morning"?',
        options: ['Maaha', 'Maakye', 'Maadwo', 'Akwaaba'],
        correct: 1
      }
    ]
  }
];

export const cultureData = {
  traditions: [
    {
      id: 1,
      title: 'Naming Ceremonies',
      description: 'Traditional Akan naming ceremonies celebrate the birth of a child and their place in the community.',
      image: '/images/naming-ceremony.jpg',
      content: 'In Akan culture, a child receives their name on the eighth day after birth. The ceremony involves the extended family and includes rituals that connect the child to their ancestors and community.',
      tags: ['ceremony', 'birth', 'community'],
      region: 'All Akan regions'
    },
    {
      id: 2,
      title: 'Adae Festival',
      description: 'A sacred festival honoring ancestors and seeking their blessings.',
      image: '/images/adae-festival.jpg',
      content: 'Adae is observed every 21 days in the traditional Akan calendar. It is a time for families to gather, offer food to ancestors, and seek guidance for important decisions.',
      tags: ['festival', 'ancestors', 'spiritual'],
      region: 'Ashanti Region'
    }
  ],
  history: [
    {
      id: 1,
      title: 'The Golden Stool',
      description: 'The sacred symbol of Ashanti unity and power.',
      image: '/images/golden-stool.jpg',
      content: 'Legend says the Golden Stool descended from heaven to rest on the lap of the first Ashanti king, Osei Tutu. It represents the soul of the Ashanti people.',
      timeline: '1695-1701',
      significance: 'Symbol of Ashanti unity and independence'
    }
  ],
  arts: [
    {
      id: 1,
      title: 'Adinkra Symbols',
      description: 'Visual symbols conveying traditional wisdom and philosophy.',
      image: '/images/adinkra.jpg',
      content: 'Adinkra symbols originated from the Gyaman people and were adopted by the Akan. Each symbol has deep meaning and is used in art, architecture, and textiles.',
      examples: [
        { symbol: 'Gye Nyame', meaning: 'Except for God', description: 'Supremacy of God' },
        { symbol: 'Sankofa', meaning: 'Return and get it', description: 'Learning from the past' }
      ]
    }
  ],
  music: [
    {
      id: 1,
      title: 'Talking Drums',
      description: 'Traditional drums that can "speak" by mimicking the tonal patterns of Akan language.',
      image: '/images/talking-drums.jpg',
      content: 'The atumpan drums can replicate the tone and rhythm of spoken Akan, allowing for long-distance communication.',
      instruments: ['Atumpan', 'Fontomfrom', 'Kagan']
    }
  ]
};

export const dictionaryData = [
  {
    id: 1,
    akan: 'Abrokyire',
    english: 'Foreign country/Abroad',
    pronunciation: 'ah-broh-CHEE-reh',
    audio: 'audio/abrokyire.mp3',
    partOfSpeech: 'noun',
    dialect: 'Twi',
    examples: [
      {
        akan: 'Ɔkɔɔ abrokyire',
        english: 'He/She went abroad',
        audio: 'audio/oko_abrokyire.mp3'
      }
    ],
    etymology: 'From "abro" (corn) + "kyire" (show/point out), literally meaning "place where corn is shown"',
    related: ['ɔhɔhoɔ (stranger)', 'amantam (nation)']
  },
  {
    id: 2,
    akan: 'Akwaaba',
    english: 'Welcome',
    pronunciation: 'ak-WAH-bah',
    audio: 'audio/akwaaba.mp3',
    partOfSpeech: 'interjection',
    dialect: 'Twi',
    examples: [
      {
        akan: 'Akwaaba fie',
        english: 'Welcome home',
        audio: 'audio/akwaaba_fie.mp3'
      }
    ],
    etymology: 'From "akwa" (to receive/take) + "aba" (to come)',
    related: ['ma wo akwaaba (I welcome you)']
  },
  {
    id: 3,
    akan: 'Nyame',
    english: 'God',
    pronunciation: 'nn-YAH-meh',
    audio: 'audio/nyame.mp3',
    partOfSpeech: 'noun',
    dialect: 'Twi',
    examples: [
      {
        akan: 'Nyame nhyira wo',
        english: 'God bless you',
        audio: 'audio/nyame_nhyira_wo.mp3'
      }
    ],
    etymology: 'Ancient Akan word for the Supreme Being',
    related: ['Onyame (God)', 'Onyankopon (Almighty God)']
  }
];

export const researchData = {
  beginner: [
    {
      id: 1,
      title: 'Introduction to Akan Culture',
      author: 'Dr. Kwame Asante',
      type: 'article',
      description: 'A comprehensive overview of Akan cultural practices and beliefs.',
      downloadUrl: '/docs/intro-akan-culture.pdf',
      tags: ['culture', 'introduction', 'overview']
    }
  ],
  intermediate: [
    {
      id: 1,
      title: 'Akan Phonology and Tone System',
      author: 'Prof. Ama Boateng',
      type: 'research paper',
      description: 'Detailed analysis of tonal patterns in Akan language varieties.',
      downloadUrl: '/docs/akan-phonology.pdf',
      tags: ['linguistics', 'phonology', 'tone']
    }
  ],
  advanced: [
    {
      id: 1,
      title: 'Comparative Study of Akan Dialects',
      author: 'Dr. Kofi Mensah',
      type: 'thesis',
      description: 'Comprehensive comparison of Twi, Fante, and other Akan varieties.',
      downloadUrl: '/docs/akan-dialects-comparison.pdf',
      tags: ['linguistics', 'dialects', 'comparative']
    }
  ]
};

export const forumData = [
  {
    id: 1,
    title: 'How to properly pronounce tones in Akan?',
    author: 'Sarah_K',
    category: 'Language Learning',
    replies: 12,
    lastActivity: '2 hours ago',
    content: 'I\'m struggling with the tonal aspects of Akan. Any tips for beginners?',
    tags: ['pronunciation', 'tones', 'beginner']
  },
  {
    id: 2,
    title: 'Upcoming Akan cultural festival in Accra',
    author: 'EventsGhana',
    category: 'Cultural Events',
    replies: 8,
    lastActivity: '1 day ago',
    content: 'Join us for the annual Akan heritage celebration featuring traditional music, dance, and food.',
    tags: ['festival', 'accra', 'culture']
  },
  {
    id: 3,
    title: 'Research collaboration: Akan proverbs study',
    author: 'Dr_Linguistics',
    category: 'Research',
    replies: 5,
    lastActivity: '3 days ago',
    content: 'Looking for collaborators for a comprehensive study of Akan proverbs and their meanings.',
    tags: ['research', 'proverbs', 'collaboration']
  }
];

export const eventsData = [
  {
    id: 1,
    title: 'Akan Language Workshop',
    date: '2024-02-15',
    time: '10:00 AM - 2:00 PM',
    location: 'Online',
    description: 'Interactive workshop for beginners learning Akan language basics.',
    type: 'workshop',
    registration: 'https://example.com/register'
  },
  {
    id: 2,
    title: 'Adinkra Symbols Art Exhibition',
    date: '2024-02-20',
    time: '6:00 PM - 9:00 PM',
    location: 'Ghana Cultural Center, New York',
    description: 'Exhibition showcasing traditional and contemporary Adinkra art.',
    type: 'exhibition',
    registration: 'https://example.com/exhibition'
  }
];

export const userProfiles = [
  {
    id: 1,
    name: 'Kwame Asante',
    avatar: '/images/avatar1.jpg',
    role: 'Cultural Researcher',
    location: 'Kumasi, Ghana',
    joined: '2023-01-15',
    contributions: 45,
    specialties: ['Akan History', 'Traditional Music']
  },
  {
    id: 2,
    name: 'Ama Boateng',
    avatar: '/images/avatar2.jpg',
    role: 'Language Instructor',
    location: 'Accra, Ghana',
    joined: '2023-03-20',
    contributions: 32,
    specialties: ['Twi Grammar', 'Pronunciation']
  }
];