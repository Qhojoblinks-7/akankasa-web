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
      content: "Children are named after the day of the week they were born, with different names for boys and girls. The naming ceremony, called 'Abadinto,' is held on the eighth day after birth and involves the entire community.",
      importance: "High",
      region: "All Akan areas",
      tags: ["naming", "ceremony", "birth", "community", "spirituality"],
      fullScript: `Akan Naming Ceremonies: The Sacred Tradition of Abadinto

The Akan naming ceremony, known as "Abadinto," is one of the most important cultural practices in Akan society. This sacred ritual, which takes place on the eighth day after a child's birth, serves multiple purposes: it introduces the newborn to the community, establishes their identity within the family and society, and connects them to their ancestors and cultural heritage.

The Significance of the Eighth Day:
The choice of the eighth day for the naming ceremony is deeply symbolic in Akan culture. The number eight represents completeness and wholeness in many African traditions, and it is believed that by the eighth day, the child has fully transitioned from the spiritual world to the physical world. This timing also allows the mother to recover from childbirth and the family to prepare for the celebration.

The Day Names System:
The most distinctive feature of Akan naming is the day name system, where children are named according to the day of the week they were born. This system creates an immediate connection between the child and their birth day, and it is believed that the day of birth influences the child's personality and destiny.

For boys, the day names are:
- Monday: Kwadwo (peaceful, calm)
- Tuesday: Kwabena (born on Tuesday)
- Wednesday: Kwaku (born on Wednesday)
- Thursday: Yaw (born on Thursday)
- Friday: Kofi (born on Friday)
- Saturday: Kwame (born on Saturday)
- Sunday: Kwasi (born on Sunday)

For girls, the day names are:
- Monday: Adwoa (peaceful, calm)
- Tuesday: Abena (born on Tuesday)
- Wednesday: Akua (born on Wednesday)
- Thursday: Yaa (born on Thursday)
- Friday: Afua (born on Friday)
- Saturday: Ama (born on Saturday)
- Sunday: Akosua (born on Sunday)

The Ceremony Process:
The Abadinto ceremony begins early in the morning with the family preparing the ceremonial items. These include a calabash of water, a piece of white cloth, and traditional items like gold dust or cowrie shells. The ceremony is typically conducted by an elder or spiritual leader, often a family member with knowledge of the traditions.

The child is first given a ritual bath with water that has been blessed by the elders. This bath symbolizes purification and the washing away of any spiritual impurities from the birth process. After the bath, the child is wrapped in the white cloth, which represents purity and new beginnings.

The Naming Ritual:
The actual naming involves several steps. First, the child is given their day name, which establishes their basic identity. Then, the family may choose additional names that reflect their hopes for the child, honor important family members or ancestors, or commemorate significant events.

The elder conducting the ceremony will often speak to the child, explaining the meaning of their names and the responsibilities that come with them. This speech serves as both a blessing and a guide for the child's future development.

Community Involvement:
The Abadinto is not a private family affair but a community celebration. Neighbors, extended family members, and community leaders are invited to participate and offer their blessings. This community involvement reinforces the child's place within the larger social structure and ensures that the entire community takes responsibility for the child's upbringing.

The community's participation also serves as a form of social education, teaching children from an early age about the importance of community bonds and mutual support. It reinforces the Akan proverb that "it takes a village to raise a child."

Spiritual and Cultural Significance:
Beyond its social function, the naming ceremony has deep spiritual significance. It is believed that the names given to children carry spiritual power and can influence their destiny. The ceremony also serves as a way to honor and remember ancestors, as many children are named after deceased family members.

The spiritual aspect of the ceremony connects the child to the ancestral world and establishes their place in the spiritual hierarchy of the family. This connection is maintained throughout the child's life through various rituals and ceremonies.

Modern Adaptations:
While the core elements of the Abadinto ceremony remain the same, modern Akan families have adapted the tradition to fit contemporary lifestyles. Some families choose to combine traditional and modern naming practices, while others have simplified the ceremony to accommodate busy schedules.

However, the fundamental importance of the ceremony remains unchanged. Even in modern urban settings, Akan families continue to observe the naming tradition as a way of maintaining their cultural identity and passing on their heritage to future generations.

The Enduring Legacy:
The Akan naming ceremony continues to be a vital part of cultural identity and community cohesion. It serves as a reminder of the importance of tradition, community, and spiritual connection in human development. The ceremony teaches children from their earliest days about their place in the world and their responsibilities to their family and community.

As Akan culture continues to evolve and adapt to modern circumstances, the naming ceremony remains a constant reminder of the values and traditions that have sustained the Akan people for generations. It is a living tradition that continues to shape and define Akan identity in the contemporary world.`
    },
    {
      id: 2,
      title: "Adae Festival",
      description: "Sacred day when ancestors are honored",
      content: "A traditional day of rest and spiritual reflection held every 21 days. The Adae festival is a sacred celebration that honors the ancestors and renews the spiritual bonds of the community.",
      importance: "High",
      region: "Ashanti, Akuapem",
      tags: ["festival", "ancestors", "spirituality", "community", "calendar"],
      fullScript: `The Adae Festival: Honoring Ancestors and Renewing Community Bonds

The Adae festival is one of the most sacred and important celebrations in Akan culture, particularly among the Ashanti and Akuapem people. This traditional festival, which occurs every 21 days according to the Akan calendar, serves multiple purposes: it honors the ancestors, renews the spiritual bonds of the community, and reinforces the cultural values that have sustained Akan society for generations.

The Sacred Calendar:
The Akan calendar is based on a 42-day cycle, divided into two 21-day periods. The Adae festival occurs at the end of each 21-day period, making it a regular feature of Akan spiritual and social life. This regular observance ensures that the connection between the living and the dead is maintained and that the community regularly comes together to celebrate their shared heritage.

The timing of the festival is not arbitrary but is carefully calculated to align with the natural rhythms of the universe and the spiritual needs of the community. The 21-day cycle is believed to represent the time it takes for spiritual energy to complete a full cycle, making the Adae festival a time of spiritual renewal and regeneration.

The Meaning of Adae:
The word "Adae" literally means "resting place" or "bed," and the festival is so named because it is a time when the community rests from their normal activities to focus on spiritual matters and honor their ancestors. This rest is not merely physical but also mental and spiritual, allowing people to reflect on their lives and their relationship with the spiritual world.

The festival is also called "Akwasidae" when it falls on a Sunday, which is considered the most sacred day of the week in Akan tradition. On this day, the celebrations are particularly elaborate and involve the entire community in various rituals and ceremonies.

Honoring the Ancestors:
The primary purpose of the Adae festival is to honor and remember the ancestors who have passed on. The Akan people believe that the ancestors continue to play an active role in the lives of the living, offering guidance, protection, and blessings. The festival is a way of showing gratitude for these blessings and seeking continued favor.

During the festival, special offerings are made to the ancestors, including food, drink, and other items that they enjoyed in life. These offerings are placed on ancestral shrines or at sacred sites, and prayers are offered asking for the ancestors' continued protection and guidance.

The Role of the Golden Stool:
For the Ashanti people, the Adae festival has special significance because it involves the Golden Stool, the sacred symbol of Ashanti unity and power. During the festival, the Golden Stool is brought out of its special room and placed in a prominent location where it can receive the homage of the people.

The presence of the Golden Stool during the Adae festival serves as a reminder of the spiritual and political unity of the Ashanti people. It reinforces the connection between the living rulers and their ancestors, and it reminds the people of their shared heritage and common destiny.

Community Rituals and Celebrations:
The Adae festival involves various rituals and celebrations that bring the community together. These include communal prayers, traditional music and dance performances, and feasting. The festival is a time of joy and celebration, but it is also a time of solemn reflection and spiritual renewal.

One of the most important aspects of the festival is the communal meal, where people come together to share food and strengthen their bonds of friendship and kinship. This communal eating symbolizes the unity of the community and the shared responsibility for maintaining cultural traditions.

Traditional Music and Dance:
Music and dance play a crucial role in the Adae festival, serving as both entertainment and spiritual expression. Traditional drums, particularly the talking drums, are used to communicate with the ancestors and to tell the stories of the community's history and heritage.

The dances performed during the festival are not merely for entertainment but are sacred rituals that honor the ancestors and celebrate the community's cultural identity. These dances often tell stories of historical events or mythological figures, passing on cultural knowledge from one generation to the next.

Spiritual Renewal and Community Bonding:
The Adae festival serves as a time of spiritual renewal for both individuals and the community as a whole. It provides an opportunity for people to reflect on their lives, seek guidance from the ancestors, and renew their commitment to cultural values and community responsibilities.

The festival also strengthens the bonds between community members, as people come together to celebrate their shared heritage and support one another in their spiritual journey. This sense of community and shared purpose is essential for the survival and flourishing of Akan culture.

Modern Adaptations:
While the core elements of the Adae festival remain the same, modern Akan communities have adapted the celebration to fit contemporary lifestyles. Some communities have simplified certain rituals, while others have incorporated modern elements while maintaining the traditional spiritual focus.

However, the fundamental purpose and significance of the festival remain unchanged. Even in modern urban settings, Akan communities continue to observe the Adae festival as a way of maintaining their cultural identity and spiritual connection.

The Enduring Significance:
The Adae festival continues to be a vital part of Akan cultural and spiritual life. It serves as a reminder of the importance of tradition, community, and spiritual connection in human development. The festival teaches people about their place in the world and their responsibilities to their ancestors, their community, and future generations.

As Akan culture continues to evolve and adapt to modern circumstances, the Adae festival remains a constant reminder of the values and traditions that have sustained the Akan people for generations. It is a living tradition that continues to shape and define Akan identity in the contemporary world, ensuring that the connection between the living and the dead remains strong and that the cultural heritage of the Akan people continues to flourish.`
    },
    {
      id: 3,
      title: "Funeral Rites",
      description: "Traditional burial and mourning practices",
      content: "Akan funeral rites are elaborate ceremonies that honor the deceased and help the living cope with loss. These ceremonies can last for days or weeks and involve the entire community.",
      importance: "High",
      region: "All Akan areas",
      tags: ["funeral", "death", "mourning", "community", "spirituality"],
      fullScript: `Akan Funeral Rites: Honoring the Deceased and Supporting the Living

Akan funeral rites are among the most elaborate and significant cultural practices in Akan society. These ceremonies, which can last for days or even weeks, serve multiple purposes: they honor the deceased, help the living cope with loss, and reinforce the community bonds that are essential for social cohesion. The funeral rites are not merely about saying goodbye to the dead but about celebrating their life and ensuring their proper transition to the ancestral world.

The Philosophy of Death:
In Akan culture, death is not seen as an end but as a transition from the physical world to the spiritual world of the ancestors. The deceased are believed to continue to exist in a different form and to maintain an active relationship with the living. This belief shapes all aspects of the funeral rites, which are designed to ensure that the deceased makes a proper transition and that the living maintain a healthy relationship with the ancestral world.

The Akan people believe that the dead continue to influence the lives of the living, offering guidance, protection, and blessings. However, if the funeral rites are not properly performed, the deceased may become restless and cause problems for the living. This belief creates a strong incentive for the community to ensure that funeral rites are conducted with proper care and attention to detail.

The Announcement and Preparation:
The funeral process begins with the announcement of death to the community. This announcement is typically made by family members or community leaders, and it serves to mobilize the community for the funeral rites. The announcement is not merely informational but is a call to action that requires the participation of the entire community.

Once the death is announced, the family begins the process of preparing for the funeral. This preparation involves both practical arrangements (such as securing a burial site and preparing food for guests) and spiritual preparations (such as consulting with spiritual leaders about the appropriate rituals and ceremonies).

The Lying-in-State:
One of the most important aspects of Akan funeral rites is the lying-in-state, where the deceased is displayed for public viewing. This practice serves several purposes: it allows people to pay their respects to the deceased, it provides an opportunity for the community to come together in mourning, and it serves as a form of public acknowledgment of the death.

The lying-in-state typically lasts for several days, during which time people from the community and beyond come to pay their respects. This period is marked by various rituals and ceremonies, including prayers, traditional music and dance performances, and communal meals.

The Burial Ceremony:
The actual burial ceremony is the climax of the funeral rites and involves various rituals designed to ensure the proper transition of the deceased to the ancestral world. These rituals vary depending on the status of the deceased and the specific traditions of the community, but they typically involve prayers, offerings, and symbolic acts that represent the transition from life to death.

The burial site is carefully chosen and prepared, often with the assistance of spiritual leaders who can determine the most appropriate location. The site is typically marked with a headstone or other memorial that serves as a permanent reminder of the deceased and their contribution to the community.

The Mourning Period:
After the burial, the family and community enter a period of mourning that can last for weeks or even months. This mourning period serves several purposes: it allows the family to grieve their loss, it provides an opportunity for the community to offer support and comfort, and it serves as a transition period during which the deceased completes their journey to the ancestral world.

During the mourning period, the family observes various restrictions and taboos that are designed to show respect for the deceased and to avoid actions that might interfere with their transition to the ancestral world. These restrictions may include avoiding certain foods, activities, or social interactions.

Community Support and Participation:
One of the most remarkable aspects of Akan funeral rites is the level of community participation and support. Funerals are not private family affairs but community events that require the participation and support of the entire community. This community involvement serves several purposes: it provides practical support to the grieving family, it reinforces community bonds, and it ensures that the funeral rites are conducted properly.

The community's participation in funeral rites is not optional but is considered a moral obligation. People who fail to participate in funeral rites may face social sanctions, as their absence is seen as a sign of disrespect for the deceased and a failure to fulfill their community responsibilities.

Spiritual and Cultural Significance:
The funeral rites have deep spiritual and cultural significance that goes beyond their practical function. They serve as a way of maintaining the connection between the living and the dead, ensuring that the ancestral world remains accessible and that the community continues to benefit from the wisdom and guidance of their ancestors.

The rites also serve as a form of cultural education, teaching people about their heritage and the values that have sustained their community for generations. Through participation in funeral rites, people learn about their cultural identity and their responsibilities to their community and their ancestors.

Modern Adaptations:
While the core elements of Akan funeral rites remain the same, modern Akan communities have adapted these practices to fit contemporary lifestyles. Some communities have simplified certain rituals, while others have incorporated modern elements while maintaining the traditional spiritual focus.

However, the fundamental purpose and significance of the funeral rites remain unchanged. Even in modern urban settings, Akan communities continue to observe these traditions as a way of maintaining their cultural identity and spiritual connection.

The Enduring Legacy:
Akan funeral rites continue to be a vital part of cultural and spiritual life. They serve as a reminder of the importance of tradition, community, and spiritual connection in human development. The rites teach people about their place in the world and their responsibilities to their ancestors, their community, and future generations.

As Akan culture continues to evolve and adapt to modern circumstances, the funeral rites remain a constant reminder of the values and traditions that have sustained the Akan people for generations. They are a living tradition that continues to shape and define Akan identity in the contemporary world, ensuring that the connection between the living and the dead remains strong and that the cultural heritage of the Akan people continues to flourish.`
    }
  ],
  history: [
    {
      id: 1,
      title: "The Golden Stool",
      description: "Sacred symbol of Ashanti unity and power",
      content: "The Golden Stool (Sika Dwa Kofi) is the most sacred symbol of the Ashanti people. According to legend, it descended from the heavens in the late 17th century during the reign of Osei Tutu, the first Asantehene (King of Ashanti). The stool is said to contain the soul of the Ashanti nation and is never allowed to touch the ground. It represents the unity and strength of the Ashanti people and is central to their cultural identity.",
      timeline: "Late 17th Century - Present",
      significance: "The Golden Stool symbolizes the spiritual and political unity of the Ashanti people. It represents the divine right to rule and is the ultimate source of authority in Ashanti traditional governance. The stool is so revered that it has its own attendants and is kept in a special room in the palace.",
      region: "Ashanti Region",
      tags: ["monarchy", "spirituality", "unity", "authority"],
      fullScript: `The Golden Stool: A Sacred Symbol of Ashanti Unity and Power

The Golden Stool (Sika Dwa Kofi) stands as the most sacred and revered symbol of the Ashanti people, embodying their cultural heritage, spiritual beliefs, and political unity. This extraordinary artifact, which has never touched the ground since its divine appearance, represents the very soul of the Ashanti nation.

Historical Origins:
The legend of the Golden Stool begins in the late 17th century during the reign of Osei Tutu, the first Asantehene (King of Ashanti). According to traditional accounts, the great priest and spiritual advisor Okomfo Anokye summoned the Golden Stool from the heavens during a moment of divine revelation. As the stool descended from the sky, it was accompanied by thunder and lightning, marking its sacred nature and divine origin.

The stool's appearance coincided with a crucial period in Ashanti history when various Akan states were being unified under a single political and cultural system. Osei Tutu recognized the stool's significance and declared that it would serve as the symbol of Ashanti unity and the source of all political authority.

Physical Description and Care:
The Golden Stool is approximately 18 inches high and 24 inches long, crafted from solid gold and adorned with intricate designs and symbols that represent various aspects of Ashanti culture and spirituality. It is never allowed to touch the ground, as this would be considered a grave offense to the ancestors and the Ashanti people.

The stool has its own dedicated attendants, known as the "Stool Fathers," who are responsible for its care and protection. These attendants carry the stool on their heads when it needs to be moved, ensuring it never comes into contact with the earth. The stool is kept in a special room in the Manhyia Palace in Kumasi, the traditional seat of Ashanti power.

Spiritual and Political Significance:
The Golden Stool represents the divine right to rule and serves as the ultimate source of authority in Ashanti traditional governance. It is believed to contain the soul (sunsum) of the Ashanti nation, making it the most sacred object in their spiritual cosmology. The stool is not merely a symbol of power but is considered a living entity that must be respected and honored.

When a new Asantehene is enstooled, the ceremony involves the new king being placed on the Golden Stool, symbolizing his acceptance of the responsibility to rule and his connection to the divine authority it represents. The stool also plays a central role in the Adae festival, a sacred celebration held every 21 days to honor the ancestors and renew the spiritual bonds of the community.

Cultural Impact and Legacy:
The Golden Stool has become the defining symbol of Ashanti cultural identity and unity. It represents the strength and resilience of the Ashanti people throughout their history, including periods of colonial rule and modern challenges. The stool's continued reverence demonstrates the enduring power of traditional beliefs and cultural practices in contemporary Ashanti society.

The story of the Golden Stool teaches important lessons about unity, respect for tradition, and the importance of spiritual values in governance. It serves as a reminder that true leadership comes not from personal ambition but from divine appointment and the collective will of the people.

Today, the Golden Stool remains at the heart of Ashanti cultural life, continuing to inspire and unite the people while preserving their rich heritage for future generations.`
    },
    {
      id: 2,
      title: "The Ashanti Empire",
      description: "Rise and fall of one of Africa's greatest kingdoms",
      content: "The Ashanti Empire emerged in the late 17th century and became one of the most powerful states in West Africa. Under the leadership of Osei Tutu and his successors, the empire expanded through military conquest and strategic alliances, controlling vast territories and establishing a sophisticated system of governance.",
      timeline: "Late 17th Century - 1902",
      significance: "The Ashanti Empire represents one of the most sophisticated pre-colonial African states, with advanced systems of administration, trade, and culture. Its legacy continues to influence modern Ghana and serves as a model of African political and cultural achievement.",
      region: "Ashanti Region",
      tags: ["empire", "governance", "trade", "military"],
      fullScript: `The Ashanti Empire: Rise and Fall of One of Africa's Greatest Kingdoms

The Ashanti Empire stands as one of the most remarkable achievements in African history, representing a sophisticated civilization that rivaled the great empires of Europe and Asia during its peak. From its humble beginnings in the late 17th century to its eventual incorporation into the British Empire in 1902, the Ashanti Empire demonstrated extraordinary political, economic, and cultural achievements.

Foundation and Early Growth:
The foundation of the Ashanti Empire can be traced to the vision and leadership of Osei Tutu, who ruled from approximately 1680 to 1717. Born into the Oyoko clan, Osei Tutu recognized the need for unity among the various Akan states that inhabited the region. Through strategic marriages, military alliances, and spiritual leadership, he began the process of unification that would create the Ashanti Empire.

The empire's growth was facilitated by several key factors. First, the region was rich in gold, which provided the economic foundation for expansion. Second, the Ashanti people had developed sophisticated systems of governance that could be adapted to rule over larger territories. Third, the spiritual authority of the Golden Stool provided a unifying symbol that transcended local loyalties.

Military Expansion and Governance:
The Ashanti Empire expanded primarily through military conquest, but also through strategic alliances and diplomatic marriages. The empire's military success was due in large part to its well-organized army, which included specialized units for different types of warfare. The Ashanti were particularly skilled in forest warfare, using their knowledge of the terrain to their advantage.

The empire's system of governance was remarkably sophisticated for its time. Power was distributed among various officials, including the Asantehene (king), the Queen Mother, and various chiefs and councilors. This system of checks and balances prevented any single individual from becoming too powerful, while ensuring that decisions were made with the input of various stakeholders.

Economic and Cultural Achievements:
The Ashanti Empire was a major center of trade, particularly in gold, which was used to create the beautiful artifacts for which the empire became famous. The empire's artisans were skilled in working with gold, creating intricate jewelry, ceremonial objects, and the famous kente cloth that remains a symbol of Ashanti culture today.

The empire also developed sophisticated systems of communication, including a network of roads and messengers that allowed for rapid communication across vast distances. This system was crucial for maintaining control over the empire's extensive territories and for coordinating military and economic activities.

Cultural and Religious Life:
Religion played a central role in Ashanti society, with the Golden Stool serving as the ultimate symbol of spiritual and political authority. The empire's religious practices were characterized by a deep respect for ancestors and a belief in the interconnectedness of the spiritual and material worlds.

The Ashanti people were also known for their rich cultural traditions, including music, dance, and storytelling. These traditions served not only as forms of entertainment but also as ways of preserving history and passing on important cultural values to future generations.

Challenges and Decline:
The Ashanti Empire faced numerous challenges throughout its history, including internal conflicts, external threats, and the growing influence of European powers in the region. The empire's resistance to British colonial rule was particularly notable, with the Ashanti fighting several wars to maintain their independence.

The final defeat of the Ashanti Empire came in 1902, when the British captured Kumasi and exiled the Asantehene, Prempeh I, to the Seychelles. However, the empire's cultural and spiritual legacy continued to influence the region, and many of its traditions and institutions have been preserved to this day.

Legacy and Modern Significance:
The Ashanti Empire's legacy continues to be felt in modern Ghana and throughout West Africa. The empire demonstrated that African societies were capable of creating sophisticated political and cultural systems that could rival those of other civilizations. This legacy serves as a source of pride and inspiration for people of African descent around the world.

The empire's traditions and cultural practices continue to be celebrated and preserved, ensuring that future generations can learn from and be inspired by this remarkable chapter in African history. The story of the Ashanti Empire teaches us about the importance of unity, the value of cultural heritage, and the potential for human achievement in even the most challenging circumstances.`
    },
    {
      id: 3,
      title: "The Transatlantic Slave Trade",
      description: "Impact on Akan society and resistance",
      content: "The transatlantic slave trade had a profound impact on Akan society, leading to significant social and economic changes. Many Akan people were captured and transported to the Americas, while others participated in the trade as intermediaries. The legacy of this period continues to affect Akan communities today.",
      timeline: "15th Century - 19th Century",
      significance: "The transatlantic slave trade represents one of the darkest chapters in human history, with lasting impacts on Akan society and culture. Understanding this history is crucial for addressing contemporary issues of race, identity, and social justice.",
      region: "All Akan areas",
      tags: ["slavery", "resistance", "diaspora", "justice"],
      fullScript: `The Transatlantic Slave Trade: Impact on Akan Society and Resistance

The transatlantic slave trade represents one of the most devastating chapters in human history, with profound and lasting impacts on Akan society and culture. This period, which lasted from the 15th to the 19th century, saw millions of Africans forcibly removed from their homelands and transported to the Americas under conditions of extreme brutality and dehumanization.

Historical Context and Scale:
The transatlantic slave trade began in the 15th century when Portuguese explorers first reached the West African coast. What began as a relatively small-scale trade in African laborers quickly grew into a massive enterprise that would ultimately transport an estimated 12.5 million Africans to the Americas. Of these, approximately 2.4 million died during the brutal journey across the Atlantic, known as the Middle Passage.

The Akan people, particularly those from the coastal regions, were heavily impacted by this trade. Their strategic location along the Gold Coast made them vulnerable to European traders, while their sophisticated social and political systems made them attractive targets for slave raiders and traders.

Impact on Akan Society:
The slave trade had devastating effects on Akan society at multiple levels. At the individual level, families were torn apart as loved ones were captured and sold. Communities were destabilized as people lived in constant fear of raids and kidnappings. The social fabric of Akan society was severely damaged as trust between communities broke down and traditional systems of governance were undermined.

Economically, the slave trade created a distorted economy that prioritized human trafficking over other forms of trade and production. While some Akan leaders and traders profited from the trade, the overall economic impact was negative, as productive members of society were removed and traditional economic activities were disrupted.

Resistance and Agency:
Despite the overwhelming power of the European slave traders and their African collaborators, the Akan people did not passively accept their fate. There were numerous forms of resistance, both individual and collective. Some people escaped from slave ships or plantations, while others organized armed resistance against slave raiders.

The Akan people also used their cultural and spiritual traditions as forms of resistance. Traditional religious practices, language, and cultural customs were maintained and passed down, even under the most difficult circumstances. These cultural practices served as a source of strength and identity for enslaved Akan people and their descendants.

The Role of Akan Leaders:
The response of Akan leaders to the slave trade was complex and varied. Some leaders actively participated in the trade, seeing it as a way to gain wealth and power. Others resisted the trade, recognizing its destructive impact on their societies. Still others attempted to regulate and control the trade in ways that would minimize its negative effects.

The Ashanti Empire, for example, attempted to maintain control over the slave trade within its territories, sometimes using it as a tool of statecraft while at other times working to limit its impact. This complex response reflects the difficult choices that African leaders faced during this period.

Cultural Survival and Adaptation:
Despite the devastating impact of the slave trade, Akan culture has survived and adapted. Many of the cultural practices, religious beliefs, and social customs that were maintained by enslaved Akan people have been passed down through generations and continue to influence African American and Caribbean cultures today.

The survival of Akan culture under such difficult circumstances is a testament to the strength and resilience of the Akan people and their cultural traditions. It also demonstrates the importance of cultural preservation and the ways in which culture can serve as a source of strength and identity even in the most challenging circumstances.

Contemporary Relevance and Healing:
The legacy of the transatlantic slave trade continues to affect Akan communities and people of African descent around the world. Contemporary issues of race, identity, and social justice are deeply connected to this historical trauma. Understanding this history is crucial for addressing these contemporary challenges and working toward healing and reconciliation.

The story of the transatlantic slave trade also teaches important lessons about the importance of human dignity, the value of cultural heritage, and the need for justice and reconciliation. By remembering and learning from this history, we can work to prevent similar atrocities in the future and build more just and equitable societies.

The resilience and resistance of the Akan people during this period serve as an inspiration for contemporary struggles for justice and human rights. Their story reminds us that even in the darkest times, human dignity and cultural identity can be preserved and passed on to future generations.`
    },
    {
      id: 4,
      title: "The Yaa Asantewaa War",
      description: "Queen Mother's resistance against British colonialism",
      content: "The Yaa Asantewaa War of 1900 was a significant resistance movement led by Queen Mother Yaa Asantewaa against British colonial rule. This war demonstrated the strength and determination of Ashanti women in defending their culture and sovereignty.",
      timeline: "1900",
      significance: "The Yaa Asantewaa War represents one of the most significant examples of African resistance to colonialism, particularly highlighting the important role of women in traditional Akan society and their willingness to fight for their people's freedom.",
      region: "Ashanti Region",
      tags: ["resistance", "colonialism", "women", "war"],
      fullScript: `The Yaa Asantewaa War: Queen Mother's Resistance Against British Colonialism

The Yaa Asantewaa War of 1900 stands as one of the most remarkable examples of African resistance to European colonialism, particularly notable for being led by a woman. This conflict, which took place in the Ashanti Empire (modern-day Ghana), demonstrated the extraordinary courage and leadership of Queen Mother Yaa Asantewaa and highlighted the important role of women in traditional Akan society.

Historical Background:
By 1900, the Ashanti Empire had already been significantly weakened by British colonial expansion. The British had captured Kumasi, the Ashanti capital, in 1896 and exiled the Asantehene (King) Prempeh I to the Seychelles. The British also demanded the surrender of the Golden Stool, the sacred symbol of Ashanti unity and power, which the Ashanti people refused to give up.

The British colonial administration, led by Governor Frederick Hodgson, was determined to complete the subjugation of the Ashanti people. Hodgson's demand for the Golden Stool was seen as the ultimate insult to Ashanti culture and sovereignty, as the stool was not only a political symbol but also contained the spiritual soul of the Ashanti nation.

Yaa Asantewaa's Leadership:
Yaa Asantewaa, the Queen Mother of Ejisu, emerged as the natural leader of the resistance movement. As Queen Mother, she held a position of great authority in Ashanti society, serving as the mother of the king and playing a crucial role in the selection and guidance of rulers. Her position gave her the moral authority to rally the Ashanti people to resistance.

When the Ashanti chiefs seemed hesitant to take action against the British, Yaa Asantewaa famously challenged them, asking if they were men or women. This challenge, which questioned their courage and commitment to their people, galvanized the Ashanti leadership and led to the decision to go to war.

The War and Its Course:
The Yaa Asantewaa War began in March 1900 and lasted for several months. The Ashanti forces, though outnumbered and outgunned, used their knowledge of the local terrain and guerrilla warfare tactics to mount an effective resistance. They laid siege to the British fort in Kumasi, cutting off supplies and communication.

The British forces, led by Colonel James Willcocks, eventually managed to break the siege and defeat the Ashanti resistance. However, the war demonstrated the determination and fighting spirit of the Ashanti people, particularly their women leaders.

The Role of Women in Akan Society:
The Yaa Asantewaa War highlighted the important and respected position of women in traditional Akan society. Unlike many other societies of the time, Akan women held positions of significant political and social authority. The Queen Mother was not merely a ceremonial figure but played an active role in governance and decision-making.

This tradition of female leadership continues in modern Akan society, where women continue to hold important positions in traditional governance and cultural life. The story of Yaa Asantewaa serves as an inspiration for contemporary women leaders and activists.

Legacy and Significance:
The Yaa Asantewaa War, though ultimately unsuccessful in preventing British colonial rule, demonstrated the Ashanti people's unwillingness to surrender their cultural and spiritual heritage without a fight. The war showed that the Ashanti were not passive victims of colonialism but active resisters who were willing to fight and die for their freedom and cultural identity.

The war also highlighted the importance of the Golden Stool to Ashanti identity and the lengths to which the Ashanti people were willing to go to protect it. The stool's survival and continued reverence today is a testament to the success of this resistance, even in defeat.

Contemporary Relevance:
The story of Yaa Asantewaa and the war of 1900 continues to inspire people around the world, particularly those fighting against oppression and colonialism. Her leadership demonstrates that women have always played crucial roles in resistance movements and that traditional societies can provide models of female leadership and empowerment.

The war also teaches important lessons about the importance of cultural heritage and the willingness of people to fight for their identity and freedom. These lessons remain relevant today as many communities around the world continue to struggle for cultural preservation and self-determination.

Yaa Asantewaa's legacy lives on not only in Ghana but throughout the African diaspora, where she is celebrated as a symbol of resistance, leadership, and the power of women to effect change. Her story reminds us that history is not just about the actions of great men but also about the courage and determination of ordinary people, including women, who stand up for what they believe in.`
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
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "ah-DWOH",
    etymology: "From an Akan root meaning 'calm', used in greetings and blessings.",
    examples: [
      { akan: "Yɛpɛ adwo", english: "We want peace", audio: "/audio/adwo_example1.mp3" },
      { akan: "Adwo wɔ fie", english: "There is peace at home", audio: "/audio/adwo_example2.mp3" }
    ],
    audio: "/audio/adwo.mp3",
    related: ["asomdwoe", "ahomeka"]
  },
  {
    id: 2,
    akan: "Abrewa",
    english: "Old woman",
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "ah-BRAY-wah",
    etymology: "Compound word: 'abre' (old) + 'wa' (woman)",
    examples: [
      { akan: "Abrewa no yɛ nyansafoɔ", english: "The old woman is wise", audio: "/audio/abrewa_example1.mp3" }
    ],
    audio: "/audio/abrewa.mp3",
    related: ["nana"]
  },
  {
    id: 3,
    akan: "Papa",
    english: "Father",
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "PAH-pah",
    examples: [
      { akan: "Papa no yɛ dɔfo", english: "Father is loving", audio: "/audio/papa_example1.mp3" }
    ],
    audio: "/audio/papa.mp3",
    related: ["agya"]
  },
  {
    id: 4,
    akan: "Maame",
    english: "Mother",
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "MAH-may",
    examples: [
      { akan: "Maame no w) adwuma", english: "Mother is at work", audio: "/audio/maame_example1.mp3" }
    ],
    audio: "/audio/maame.mp3",
    related: ["ɛna"]
  },
  {
    id: 5,
    akan: "Ɔba",
    english: "Child",
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "AW-bah",
    examples: [
      { akan: "Ɔba no rebɔ asuade", english: "The child is studying", audio: "/audio/oba_example1.mp3" }
    ],
    audio: "/audio/oba.mp3",
    related: ["mmofra"]
  },
  {
    id: 6,
    akan: "Kasa",
    english: "Speak / Language",
    partOfSpeech: "verb/noun",
    dialect: "Twi",
    pronunciation: "KAH-sah",
    examples: [
      { akan: "Kasa kyerɛ me", english: "Speak to me", audio: "/audio/kasa_example1.mp3" }
    ],
    audio: "/audio/kasa.mp3",
    related: ["kasakoa"]
  },
  {
    id: 7,
    akan: "Nsuo",
    english: "Water",
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "nn-SOO-oh",
    examples: [
      { akan: "Fa nsuo ma me", english: "Give me water", audio: "/audio/nsuo_example1.mp3" }
    ],
    audio: "/audio/nsuo.mp3",
    related: ["nsu"]
  },
  {
    id: 8,
    akan: "Aduane",
    english: "Food",
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "ah-DOO-ah-nay",
    examples: [
      { akan: "Wopɛ aduane?", english: "Do you want food?", audio: "/audio/aduane_example1.mp3" }
    ],
    audio: "/audio/aduane.mp3",
    related: ["εduane"]
  },
  {
    id: 9,
    akan: "Nkwan",
    english: "Soup / Stew",
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "nn-KWAHN",
    examples: [
      { akan: "Mepɛ nkwan", english: "I like soup", audio: "/audio/nkwan_example1.mp3" }
    ],
    audio: "/audio/nkwan.mp3",
    related: ["ɛmo"]
  },
  {
    id: 10,
    akan: "Akwaaba",
    english: "Welcome",
    partOfSpeech: "interjection",
    dialect: "Twi",
    pronunciation: "ah-KWAH-bah",
    examples: [
      { akan: "Akwaaba!", english: "Welcome!", audio: "/audio/akwaaba_example1.mp3" }
    ],
    audio: "/audio/akwaaba.mp3",
    related: ["akwaaba"]
  },
  {
    id: 11,
    akan: "Maakye",
    english: "Good morning",
    partOfSpeech: "interjection",
    dialect: "Twi",
    pronunciation: "MAH-chay",
    examples: [
      { akan: "Maakye, anka wo ho te sɛn?", english: "Good morning, how are you?", audio: "/audio/maakye_example1.mp3" }
    ],
    audio: "/audio/maakye.mp3",
    related: ["maaha", "maadwo"]
  },
  {
    id: 12,
    akan: "Maaha",
    english: "Good afternoon",
    partOfSpeech: "interjection",
    dialect: "Twi",
    pronunciation: "MAH-hah",
    examples: [
      { akan: "Maaha, wo din de sɛn?", english: "Good afternoon, what's your name?", audio: "/audio/maaha_example1.mp3" }
    ],
    audio: "/audio/maaha.mp3",
    related: ["maakye", "maadwo"]
  },
  {
    id: 13,
    akan: "Maadwo",
    english: "Good evening",
    partOfSpeech: "interjection",
    dialect: "Twi",
    pronunciation: "MAH-dwo",
    examples: [
      { akan: "Maadwo, meda wo ase", english: "Good evening, thank you", audio: "/audio/maadwo_example1.mp3" }
    ],
    audio: "/audio/maadwo.mp3",
    related: ["maakye", "maaha"]
  },
  {
    id: 14,
    akan: "Ɛte sɛn?",
    english: "How are you?",
    partOfSpeech: "phrase",
    dialect: "Twi",
    pronunciation: "eh-tay-sen",
    examples: [
      { akan: "Ɛte sɛn?", english: "How are you?", audio: "/audio/etesen_example1.mp3" }
    ],
    audio: "/audio/etesen.mp3",
    related: ["me ho yɛ"]
  },
  {
    id: 15,
    akan: "Me ho yɛ",
    english: "I am fine",
    partOfSpeech: "phrase",
    dialect: "Twi",
    pronunciation: "may-ho-yay",
    examples: [
      { akan: "Me ho yɛ, meda wo ase", english: "I am fine, thank you", audio: "/audio/mehoye_example1.mp3" }
    ],
    audio: "/audio/mehoye.mp3",
    related: ["etesen"]
  },
  {
    id: 16,
    akan: "Agya",
    english: "Father (formal)",
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "AH-jah",
    examples: [
      { akan: "Agya no kɔ adwuma", english: "Father went to work", audio: "/audio/agya_example1.mp3" }
    ],
    audio: "/audio/agya.mp3",
    related: ["papa"]
  },
  {
    id: 17,
    akan: "Nana",
    english: "Grandparent / Elder",
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "NAH-nah",
    examples: [
      { akan: "Nana no yɛ onimuonyam", english: "The elder is honorable", audio: "/audio/nana_example1.mp3" }
    ],
    audio: "/audio/nana.mp3",
    related: ["abrewa"]
  },
  {
    id: 18,
    akan: "Wɔfa",
    english: "Uncle",
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "WAW-fah",
    examples: [
      { akan: "Wɔfa no reba", english: "Uncle is coming", audio: "/audio/wofa_example1.mp3" }
    ],
    audio: "/audio/wofa.mp3",
    related: ["sewaa"]
  },
  {
    id: 19,
    akan: "Sewaa",
    english: "Aunt",
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "say-WAH",
    examples: [
      { akan: "Sewaa no yɛ adwuma", english: "Aunt is working", audio: "/audio/sewaa_example1.mp3" }
    ],
    audio: "/audio/sewaa.mp3",
    related: ["wofa"]
  },
  {
    id: 20,
    akan: "Nua",
    english: "Sibling",
    partOfSpeech: "noun",
    dialect: "Twi",
    pronunciation: "NOO-ah",
    examples: [
      { akan: "Nua no te fie", english: "Sibling is at home", audio: "/audio/nua_example1.mp3" }
    ],
    audio: "/audio/nua.mp3",
    related: ["mmofra"]
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

export const cultureData = {
  
}


export const eventsData ={}