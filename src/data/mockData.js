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
      region: "All Akan areas",
      tags: ["naming", "ceremonies", "traditions"],
      fullContent: `# Akan Naming Ceremonies: A Sacred Tradition

## The Significance of Names

In Akan culture, names are not merely labels but carry profound spiritual and cultural significance. The naming ceremony, known as "Din Toa" in Twi, is one of the most important rites of passage in a child's life.

## The Day Name System

Akan children receive their first names based on the day of the week they were born. This system creates a spiritual connection between the child and the day's associated deity and characteristics.

### Day Names for Boys:
- **Kwadwo** (Monday): Associated with peace and calmness
- **Kwabena** (Tuesday): Represents the ocean and its vastness
- **Kwaku** (Wednesday): Symbolizes the spider, known for wisdom
- **Yaw** (Thursday): Represents the earth and its fertility
- **Kofi** (Friday): Associated with fertility and abundance
- **Kwame** (Saturday): Represents the universe and creation
- **Kwasi** (Sunday): Symbolizes the sun and its life-giving energy

### Day Names for Girls:
- **Adwoa** (Monday): Peaceful and gentle nature
- **Abena** (Tuesday): Born on the ocean's day
- **Akua** (Wednesday): Born on the spider's day
- **Yaa** (Thursday): Born on the earth's day
- **Afua** (Friday): Born on fertility day
- **Ama** (Saturday): Born on the universe's day
- **Akosua** (Sunday): Born on the sun's day

## The Ceremony Process

The naming ceremony typically takes place on the 8th day after birth, a number considered sacred in Akan numerology. The ceremony involves:

1. **Purification**: The mother and child are purified with special herbs
2. **Prayers**: Elders offer prayers to ancestors and deities
3. **Name Announcement**: The chosen name is revealed to the community
4. **Feast**: A communal meal celebrates the new life
5. **Gifts**: Family and friends present gifts to the child

## Cultural Importance

This tradition serves multiple purposes:
- **Identity Formation**: Establishes the child's place in the community
- **Spiritual Connection**: Links the child to ancestral spirits
- **Cultural Continuity**: Preserves Akan traditions across generations
- **Community Bonding**: Strengthens family and community ties

## Modern Adaptations

While the core tradition remains, modern Akan families often combine traditional day names with additional names that reflect personal preferences, family history, or contemporary influences.`
    },
    {
      id: 2,
      title: "Adae Festival",
      description: "Sacred day when ancestors are honored",
      content: "A traditional day of rest and spiritual reflection held every 21 days.",
      importance: "High",
      region: "Ashanti, Akuapem",
      timeline: "Every 21 days (Adae cycle)",
      significance: "Honors ancestors and maintains spiritual balance",
      tags: ["festival", "ancestors", "spiritual"],
      fullContent: `# Adae Festival: Honoring the Ancestors

## What is Adae?

Adae is one of the most sacred festivals in Akan culture, particularly among the Ashanti people. The word "Adae" means "resting place" and refers to the day when the living rest from their daily activities to honor and communicate with their ancestors.

## The Sacred Cycle

The Adae festival follows a 21-day cycle, creating a sacred calendar that regulates spiritual and social life. This cycle is based on the traditional Akan calendar system, which divides time into periods of spiritual significance.

## Historical Origins

The Adae festival has its roots in the ancient Akan belief system that emphasizes the importance of maintaining strong connections with ancestors. According to oral tradition, the festival was established by the first Asantehene (King of Ashanti) to ensure that the spirits of departed kings and queens continued to guide and protect the kingdom.

## The Festival Rituals

### Preparation Phase
- **Cleaning**: Homes and public spaces are thoroughly cleaned
- **Food Preparation**: Special meals are prepared for the ancestors
- **Spiritual Cleansing**: Participants undergo purification rituals

### The Main Ceremony
1. **Dawn Prayers**: Early morning prayers at family shrines
2. **Ancestral Offerings**: Food, drinks, and other items are offered
3. **Libation**: Traditional prayers with alcohol or water
4. **Feasting**: Communal meals with family and community
5. **Rest**: Complete cessation of work and daily activities

## Cultural Significance

### Spiritual Connection
The festival maintains the vital link between the living and the dead, ensuring that ancestral wisdom continues to guide the community.

### Social Cohesion
Adae brings families and communities together, strengthening bonds and reinforcing cultural identity.

### Cultural Preservation
The festival serves as a living museum of Akan traditions, passing knowledge from one generation to the next.

## Regional Variations

### Ashanti Region
- Most elaborate celebrations
- Royal participation and ceremonies
- Extended periods of rest and reflection

### Akuapem Region
- Focus on family and community
- Emphasis on storytelling and oral history
- Integration with Christian practices

## Modern Observance

While the traditional 21-day cycle is still observed in rural areas, urban Akan communities often adapt the festival to modern schedules, sometimes celebrating on weekends or during holidays while maintaining the core spiritual practices.

## The Golden Stool Connection

The Adae festival is closely connected to the Golden Stool (Sika Dwa Kofi), the sacred symbol of Ashanti unity and power. During major Adae celebrations, the stool is brought out and honored, symbolizing the connection between the living kings and their royal ancestors.`
    }
  ],
  history: [
    {
      id: 1,
      title: "The Golden Stool",
      description: "Sacred symbol of Ashanti unity and power",
      content: "The Golden Stool is the most sacred object in Ashanti culture, representing the soul of the Ashanti nation.",
      timeline: "Late 17th century - Present",
      significance: "Symbol of Ashanti unity, power, and spiritual authority",
      region: "Ashanti Region",
      tags: ["golden stool", "ashanti", "royalty", "spiritual"],
      fullContent: `# The Golden Stool: Heart of the Ashanti Nation

## The Sacred Legend

According to Ashanti oral tradition, the Golden Stool (Sika Dwa Kofi) descended from the heavens during the reign of Osei Tutu, the first Asantehene (King of Ashanti). The story tells of a miraculous event where the stool, covered in gold and adorned with bells, floated down from the sky and landed gently in Osei Tutu's lap.

## Historical Context

The Golden Stool was created during a period of great political and social change in the late 17th century. The Ashanti people, previously divided into separate states, were uniting under the leadership of Osei Tutu and his spiritual advisor, Okomfo Anokye.

### The Unification Process
- **Political Consolidation**: Various Ashanti states were brought together
- **Spiritual Foundation**: The stool provided divine legitimacy to the new kingdom
- **Cultural Identity**: A shared symbol created a sense of common purpose

## Physical Description

The Golden Stool is approximately 46 centimeters high and is made of wood covered with gold. It features:
- **Base**: Solid wooden foundation
- **Seat**: Curved surface for the king
- **Backrest**: Ornate design with symbolic carvings
- **Decoration**: Gold leaf, bells, and traditional symbols
- **Weight**: Surprisingly light despite its appearance

## Spiritual Significance

### Divine Authority
The stool is believed to contain the soul (sunsum) of the Ashanti nation. It is not merely a symbol of power but the actual embodiment of Ashanti spiritual and political authority.

### Ancestral Connection
The stool serves as a bridge between the living and the dead, allowing the current Asantehene to communicate with his royal ancestors and receive their guidance.

### National Unity
The stool represents the collective spirit of all Ashanti people, transcending individual interests and creating a sense of shared destiny.

## The Stool's Role in Ashanti Society

### Coronation Ceremonies
New kings are not crowned but "enstooled" - they are placed upon the Golden Stool during their installation ceremony, symbolizing their acceptance of the responsibilities of leadership.

### Judicial Authority
The stool is present during important court proceedings, ensuring that justice is dispensed with divine authority and ancestral wisdom.

### National Decisions
Major decisions affecting the Ashanti nation are made in the presence of the stool, ensuring that all actions align with ancestral wishes and divine will.

## Historical Challenges

### The Yaa Asantewaa War
In 1900, when the British attempted to capture the Golden Stool, Queen Mother Yaa Asantewaa led a rebellion to protect it. This conflict, known as the War of the Golden Stool, demonstrated the stool's importance to Ashanti identity and resistance.

### Colonial Resistance
The stool became a symbol of resistance against colonial rule, representing the Ashanti people's determination to maintain their cultural and spiritual autonomy.

## Modern Significance

### Cultural Preservation
The Golden Stool continues to play a vital role in preserving Ashanti culture and traditions in the modern world.

### Tourism and Education
The stool attracts visitors from around the world, helping to educate people about Ashanti history and culture.

### National Identity
For Ghanaians and people of Ashanti descent worldwide, the stool represents a connection to their heritage and cultural roots.

## Conservation and Care

The Golden Stool is carefully maintained and protected by the Ashanti royal family and traditional authorities. It is kept in a special room in the Manhyia Palace in Kumasi and is only brought out for the most important ceremonies and occasions.

## The Stool's Message

The Golden Stool teaches us that true leadership is not about personal power but about serving the community and honoring the wisdom of those who came before us. It reminds us that our cultural heritage is a precious gift that must be preserved and passed on to future generations.`
    },
    {
      id: 2,
      title: "The Ashanti Empire",
      description: "Rise and development of the powerful Ashanti kingdom",
      content: "The Ashanti Empire emerged in the 17th century and became one of the most powerful states in West Africa.",
      timeline: "1670 - 1902",
      significance: "Established Akan political and cultural dominance in the region",
      region: "Ashanti Region, Ghana",
      tags: ["empire", "ashanti", "history", "west africa"],
      fullContent: `# The Ashanti Empire: A Legacy of Power and Culture

## Origins and Foundation

The Ashanti Empire, also known as the Asante Empire, emerged in the late 17th century from the unification of several Akan states in what is now modern-day Ghana. The empire's foundation is attributed to Osei Tutu, who, with the guidance of his spiritual advisor Okomfo Anokye, united the various Ashanti clans under a single political and spiritual authority.

### The Founding Fathers
- **Osei Tutu**: First Asantehene (King of Ashanti)
- **Okomfo Anokye**: Spiritual advisor and architect of unification
- **Yaa Asantewaa**: Later queen mother who defended the empire

## The Golden Age (1700-1820)

### Territorial Expansion
The Ashanti Empire expanded rapidly during this period, incorporating neighboring territories and establishing control over key trade routes. The empire's influence extended across much of present-day Ghana and parts of neighboring countries.

### Economic Prosperity
The empire's wealth was built on several key resources:
- **Gold**: Abundant gold deposits in the region
- **Trade Routes**: Control of important commercial pathways
- **Agriculture**: Fertile land supporting diverse crops
- **Crafts**: Skilled artisans producing high-quality goods

### Cultural Flourishing
This period saw the development of:
- **Art and Architecture**: Elaborate palaces and artistic traditions
- **Music and Dance**: Rich cultural expressions
- **Social Systems**: Complex political and social structures
- **Religious Practices**: Sophisticated spiritual traditions

## Political Structure

### The Asantehene
The king (Asantehene) was the supreme ruler, but his power was balanced by various councils and traditional authorities.

### The Council of Elders
- **Nananom**: Traditional chiefs and elders
- **Queen Mothers**: Female leaders with significant influence
- **Military Leaders**: Commanders of the Ashanti army

### Administrative System
The empire was divided into provinces, each governed by a chief who owed allegiance to the Asantehene while maintaining local autonomy.

## Military Power

### The Ashanti Army
The empire maintained a powerful military force that was instrumental in its expansion and defense.

### Military Innovations
- **Tactical Excellence**: Sophisticated battle strategies
- **Weapon Technology**: Advanced weaponry for the time
- **Training**: Professional soldiers with extensive training
- **Logistics**: Efficient supply and communication systems

### Notable Campaigns
The Ashanti army successfully defended the empire against various external threats and expanded its territory through strategic military campaigns.

## Cultural Achievements

### Art and Craftsmanship
- **Kente Cloth**: Intricate woven textiles with symbolic patterns
- **Gold Work**: Sophisticated metalworking techniques
- **Wood Carving**: Beautiful sculptures and decorative items
- **Pottery**: Functional and artistic ceramic works

### Social Organization
- **Matrilineal System**: Inheritance and lineage through the mother
- **Extended Families**: Strong family bonds and support networks
- **Education**: Traditional knowledge passed down through generations
- **Healthcare**: Herbal medicine and spiritual healing practices

## Trade and Commerce

### Gold Trade
Gold was the empire's most valuable export, traded extensively with European merchants and other African states.

### Other Commodities
- **Kola Nuts**: Used in traditional ceremonies and trade
- **Textiles**: Locally produced and imported fabrics
- **Agricultural Products**: Various food crops and livestock
- **Crafts**: Artisan goods and traditional items

### Trade Routes
The empire controlled key trade routes connecting the interior of West Africa with coastal trading posts and international markets.

## Religion and Spirituality

### Traditional Beliefs
The Ashanti practiced a complex religious system that included:
- **Ancestor Worship**: Honoring departed family members
- **Nature Spirits**: Respecting natural forces and elements
- **Divine Beings**: Belief in various deities and spirits
- **Sacred Objects**: Veneration of important cultural items

### The Golden Stool
The most sacred object in Ashanti culture, believed to contain the soul of the nation and serving as the ultimate symbol of unity and authority.

## Decline and Colonial Period

### External Pressures
The 19th century brought increasing pressure from European colonial powers, particularly the British, who sought to expand their influence in the region.

### Internal Challenges
- **Succession Disputes**: Conflicts over royal succession
- **Economic Changes**: Shifts in trade patterns and economic systems
- **Social Transformations**: Changes in traditional social structures

### The Final Years
The empire officially ended in 1902 when it was incorporated into the British Gold Coast colony, though Ashanti cultural and traditional authority continued in modified forms.

## Legacy and Modern Impact

### Cultural Continuity
Despite political changes, Ashanti culture has remained vibrant and continues to influence modern Ghanaian society.

### Traditional Authority
The Asantehene and traditional chiefs still play important roles in cultural and social life, even in the modern democratic system.

### Global Influence
Ashanti culture has spread worldwide through the African diaspora, influencing art, music, and cultural practices in many countries.

### Tourism and Education
The empire's history and cultural heritage attract visitors and researchers from around the world, contributing to Ghana's cultural tourism industry.

## Lessons for Today

The Ashanti Empire teaches us about:
- **Unity in Diversity**: How different groups can come together for common goals
- **Cultural Preservation**: The importance of maintaining cultural identity
- **Adaptation**: How societies can evolve while preserving core values
- **Leadership**: The balance between authority and community participation

The empire's legacy continues to inspire and educate, reminding us of the rich cultural heritage that has shaped modern Ghana and the broader African continent.`
    },
    {
      id: 3,
      title: "Yaa Asantewaa",
      description: "Queen Mother who led resistance against British rule",
      content: "Yaa Asantewaa was a queen mother who led the Ashanti rebellion against British colonial rule in 1900.",
      timeline: "1840 - 1921",
      significance: "Symbol of resistance and female leadership in African history",
      region: "Ashanti Region, Ghana",
      tags: ["yaa asantewaa", "resistance", "queen mother", "colonialism"],
      fullContent: `# Yaa Asantewaa: The Warrior Queen

## Early Life and Background

Yaa Asantewaa was born around 1840 in the village of Ejisu, located in the Ashanti Empire (present-day Ghana). She was born into the royal family of Ejisu, a state within the larger Ashanti confederation. From an early age, she was exposed to the political and cultural traditions of the Ashanti people.

### Family Heritage
- **Royal Lineage**: Born into the Ejisu royal family
- **Cultural Education**: Learned traditional Ashanti customs and history
- **Leadership Training**: Prepared for her future role as queen mother

## Rise to Power

### Becoming Queen Mother
Yaa Asantewaa became the queen mother (Nana Yaa Asantewaa) of Ejisu, a position of great importance in Ashanti society. The queen mother was not just the mother of the king but also a political and spiritual leader in her own right.

### Political Influence
As queen mother, Yaa Asantewaa had significant influence in:
- **Political Decisions**: Advising on matters of state
- **Cultural Affairs**: Preserving and promoting traditions
- **Social Issues**: Addressing community concerns
- **Spiritual Matters**: Participating in religious ceremonies

## The Colonial Threat

### British Expansion
By the late 19th century, the British were expanding their colonial influence in West Africa, including the Gold Coast (modern Ghana). They sought to control the Ashanti Empire and its valuable resources.

### The Golden Stool Crisis
The British governor, Sir Frederick Hodgson, demanded that the Ashanti surrender the Golden Stool, the most sacred object in Ashanti culture. This demand was seen as a direct attack on Ashanti identity and sovereignty.

## The War of Resistance

### Yaa Asantewaa's Leadership
When the Ashanti chiefs seemed hesitant to resist British demands, Yaa Asantewaa took decisive action. She famously declared:

*"If you, the men of Ashanti, will not go forward, then we will. We, the women, will. I shall call upon my fellow women. We will fight the white men. We will fight until the last of us falls in the battlefields."*

### Mobilizing the Resistance
Yaa Asantewaa:
- **Rallied Support**: Gathered warriors and supporters
- **Strategic Planning**: Organized military resistance
- **Cultural Motivation**: Used traditional symbols and beliefs to inspire resistance
- **International Appeal**: Sought support from other African states

### The Military Campaign
The resistance forces engaged in guerrilla warfare against the British, using their knowledge of the local terrain and traditional military tactics. The conflict lasted for several months and demonstrated the Ashanti people's determination to defend their culture and independence.

## The Aftermath

### Capture and Exile
Despite their valiant resistance, the Ashanti were eventually defeated by superior British military technology and resources. Yaa Asantewaa was captured and exiled to the Seychelles Islands, where she spent the remainder of her life.

### Legacy of Resistance
While the military resistance was unsuccessful, Yaa Asantewaa's actions had lasting impact:
- **Symbol of Courage**: Became a symbol of African resistance to colonialism
- **Female Leadership**: Demonstrated the important role of women in African societies
- **Cultural Pride**: Inspired pride in Ashanti and African identity
- **Historical Memory**: Her story continues to inspire future generations

## Historical Significance

### Colonial Resistance
Yaa Asantewaa's resistance was part of a broader pattern of African resistance to European colonialism. Her actions demonstrated that African societies were not passive victims but active agents in their own history.

### Gender and Leadership
Her leadership challenged European assumptions about African societies and demonstrated the important role of women in traditional African political systems.

### Cultural Preservation
The resistance was not just about political independence but also about preserving Ashanti cultural identity and traditions.

## Modern Recognition

### Memorials and Honors
- **Statues**: Monuments erected in her honor
- **Educational Institutions**: Schools and programs named after her
- **Cultural Celebrations**: Annual commemorations of her legacy
- **International Recognition**: Honored by various organizations and governments

### Cultural Impact
Yaa Asantewaa's story continues to inspire:
- **Literature**: Books, poems, and plays about her life
- **Art**: Paintings, sculptures, and other artistic representations
- **Education**: Her story is taught in schools throughout Ghana
- **Tourism**: Her legacy attracts visitors interested in African history

## Lessons for Today

### Leadership and Courage
Yaa Asantewaa teaches us about:
- **Standing Up for What's Right**: Even when the odds seem impossible
- **Cultural Pride**: The importance of preserving cultural identity
- **Female Leadership**: Women's capacity for strong, effective leadership
- **Unity in Resistance**: How communities can come together against oppression

### Historical Memory
Her story reminds us of:
- **The Cost of Freedom**: The sacrifices made by previous generations
- **Cultural Heritage**: The value of preserving traditional knowledge
- **Resistance to Injustice**: The importance of standing against oppression
- **African Agency**: Africans as active participants in their own history

## Conclusion

Yaa Asantewaa's legacy extends far beyond her military resistance. She represents the strength, courage, and determination of the Ashanti people and serves as an inspiration for all who value freedom, cultural identity, and human dignity. Her story continues to resonate in modern Ghana and throughout the African diaspora, reminding us of the rich history and cultural heritage that shapes our present and future.`
    }
  ],
  symbols: [
    {
      id: 1,
      name: "Sankofa",
      symbol: "𝓢",
      meaning: "Go back and get it - learning from the past",
      usage: "Education, wisdom, personal growth",
      tags: ["sankofa", "wisdom", "learning", "symbols"],
      fullContent: `# Sankofa: Learning from the Past

## The Symbol's Meaning

Sankofa is one of the most important symbols in Akan culture, representing the concept of learning from the past to build a better future. The word "Sankofa" comes from the Akan language and literally means "go back and get it."

## Visual Representation

The Sankofa symbol is typically depicted as a bird with its head turned backward, picking up an egg from its back. This visual metaphor represents:
- **Looking Back**: Reflecting on past experiences and knowledge
- **Retrieving Wisdom**: Gathering valuable lessons from history
- **Moving Forward**: Using past knowledge to inform future decisions

## Cultural Significance

### Wisdom and Learning
Sankofa emphasizes the importance of:
- **Historical Knowledge**: Understanding where we come from
- **Cultural Heritage**: Preserving traditional wisdom
- **Intergenerational Learning**: Passing knowledge from elders to youth
- **Mistake Prevention**: Learning from past errors to avoid repeating them

### Personal Growth
The symbol encourages individuals to:
- **Reflect on Experience**: Consider past actions and their outcomes
- **Learn from Mistakes**: Use failures as opportunities for growth
- **Honor Traditions**: Respect and preserve cultural practices
- **Build on Foundations**: Use existing knowledge as a base for innovation

## Historical Context

### Origins
The Sankofa symbol has ancient roots in Akan culture, dating back to the early days of the Ashanti Empire. It was used in:
- **Royal Regalia**: Adorning the clothing and accessories of kings and queens
- **Architecture**: Carved into buildings and ceremonial structures
- **Textiles**: Woven into traditional kente cloth patterns
- **Artwork**: Featured in paintings, sculptures, and other artistic expressions

### Evolution
Over time, the symbol has taken on additional meanings and has been adapted for use in various contexts, both traditional and modern.

## Modern Applications

### Education
Sankofa is widely used in educational contexts to emphasize:
- **Historical Learning**: The importance of studying history
- **Cultural Education**: Teaching about traditional values and practices
- **Critical Thinking**: Encouraging reflection and analysis
- **Lifelong Learning**: Promoting continuous personal development

### Personal Development
The symbol serves as a reminder to:
- **Reflect Regularly**: Take time to consider past experiences
- **Learn Continuously**: Always seek new knowledge and understanding
- **Honor Roots**: Remember and respect one's cultural heritage
- **Plan Strategically**: Use past knowledge to make better future decisions

## Global Influence

### African Diaspora
Sankofa has become an important symbol for people of African descent worldwide, representing:
- **Cultural Connection**: Link to African heritage and traditions
- **Historical Awareness**: Understanding of African history and contributions
- **Identity Formation**: Development of positive cultural identity
- **Community Building**: Uniting people around shared cultural values

### International Recognition
The symbol has gained recognition beyond African communities and is used by:
- **Educational Institutions**: Schools and universities worldwide
- **Cultural Organizations**: Museums and cultural centers
- **Social Movements**: Groups promoting cultural awareness and social justice
- **Individual Practitioners**: People seeking personal growth and cultural connection

## Practical Applications

### Daily Life
Individuals can apply Sankofa principles by:
- **Journaling**: Recording experiences and reflecting on them
- **Family History**: Learning about ancestors and family traditions
- **Cultural Participation**: Engaging with traditional practices and celebrations
- **Mentorship**: Learning from elders and experienced community members

### Professional Development
In work and career contexts, Sankofa encourages:
- **Performance Review**: Regular assessment of past work and achievements
- **Skill Development**: Building on existing knowledge and abilities
- **Mentorship**: Learning from experienced colleagues and supervisors
- **Continuous Improvement**: Using past experiences to enhance future performance

## The Symbol's Message

Sankofa teaches us that:
- **The Past is Valuable**: Historical knowledge and experience are precious resources
- **Learning is Continuous**: We should always seek to grow and improve
- **Culture Matters**: Traditional wisdom and practices enrich our lives
- **Reflection is Essential**: Taking time to think about our experiences leads to better decisions
- **Growth is Possible**: We can always learn from our past to create a better future

## Conclusion

Sankofa is more than just a symbol; it's a philosophy of life that encourages us to honor our past while building our future. By embracing the wisdom of our ancestors and learning from our experiences, we can create a more meaningful and fulfilling life for ourselves and future generations.`
    },
    {
      id: 2,
      name: "Gye Nyame",
      symbol: "※",
      meaning: "Except for God - supremacy of God",
      usage: "Spiritual contexts, decoration",
      tags: ["gye nyame", "god", "spiritual", "symbols"],
      fullContent: `# Gye Nyame: The Supremacy of God

## The Symbol's Meaning

Gye Nyame is one of the most profound and widely recognized symbols in Akan culture. The phrase "Gye Nyame" translates to "Except for God" or "Nothing but God" in the Akan language, emphasizing the absolute supremacy and omnipotence of the divine.

## Visual Representation

The Gye Nyame symbol is typically depicted as a complex geometric pattern that represents:
- **Divine Authority**: The central position of God in all things
- **Spiritual Protection**: God's role as protector and guardian
- **Universal Power**: God's influence over all aspects of existence
- **Eternal Presence**: God's constant and unchanging nature

## Cultural Significance

### Religious Beliefs
Gye Nyame reflects the Akan understanding of:
- **Divine Sovereignty**: God as the ultimate ruler of the universe
- **Spiritual Hierarchy**: The proper relationship between humans and the divine
- **Religious Devotion**: The importance of faith and spiritual practice
- **Moral Guidance**: God as the source of ethical principles

### Social Values
The symbol promotes values such as:
- **Humility**: Recognizing human limitations in comparison to divine power
- **Gratitude**: Acknowledging God's role in all blessings
- **Respect**: Honoring the divine order of the universe
- **Community**: Uniting people through shared spiritual beliefs

## Historical Context

### Ancient Origins
The Gye Nyame symbol has deep roots in Akan religious and cultural traditions, dating back to the earliest days of Akan civilization. It was used in:
- **Royal Ceremonies**: Adorning the regalia of kings and queens
- **Religious Rituals**: Featured in spiritual ceremonies and practices
- **Architecture**: Carved into temples and sacred buildings
- **Personal Items**: Worn as jewelry and incorporated into clothing

### Cultural Evolution
Over centuries, the symbol has maintained its core meaning while adapting to changing social and cultural contexts.

## Spiritual Applications

### Daily Worship
Gye Nyame is used in:
- **Morning Prayers**: Beginning each day with acknowledgment of God's presence
- **Meal Blessings**: Giving thanks for food and sustenance
- **Life Transitions**: Marking important moments with spiritual recognition
- **Protection Rituals**: Seeking divine protection and guidance

### Ceremonial Use
The symbol is prominent in:
- **Naming Ceremonies**: Acknowledging God's role in new life
- **Marriage Ceremonies**: Seeking divine blessing for unions
- **Funeral Rites**: Honoring the divine plan for life and death
- **Festival Celebrations**: Celebrating God's blessings and protection

## Modern Interpretations

### Personal Spirituality
Individuals use Gye Nyame to:
- **Center Themselves**: Focus on what truly matters in life
- **Find Peace**: Remember that they are not alone in their struggles
- **Make Decisions**: Consider divine guidance in life choices
- **Express Gratitude**: Acknowledge blessings and good fortune

### Cultural Identity
The symbol serves as a reminder of:
- **Heritage**: Connection to Akan cultural traditions
- **Values**: The spiritual and moral principles of Akan society
- **Community**: Shared beliefs that unite people
- **Continuity**: The enduring nature of cultural and spiritual traditions

## Artistic Expressions

### Traditional Arts
Gye Nyame appears in:
- **Kente Cloth**: Woven into traditional textile patterns
- **Wood Carvings**: Carved into ceremonial objects and furniture
- **Metalwork**: Incorporated into jewelry and decorative items
- **Architecture**: Featured in building designs and decorations

### Contemporary Art
Modern artists use the symbol in:
- **Paintings**: Creating works that explore spiritual themes
- **Sculptures**: Making three-dimensional representations
- **Digital Art**: Creating modern interpretations using technology
- **Performance Art**: Incorporating the symbol into theatrical and musical performances

## Educational Value

### Cultural Learning
Gye Nyame teaches about:
- **Akan Philosophy**: Understanding of the universe and human place in it
- **Spiritual Traditions**: Religious practices and beliefs
- **Moral Values**: Ethical principles and social norms
- **Historical Context**: How spiritual beliefs have shaped Akan society

### Personal Development
The symbol encourages:
- **Spiritual Growth**: Development of personal faith and understanding
- **Moral Reflection**: Consideration of ethical issues and choices
- **Cultural Appreciation**: Respect for diverse spiritual traditions
- **Community Engagement**: Participation in shared cultural practices

## Global Significance

### African Diaspora
Gye Nyame has become important for:
- **Cultural Connection**: Linking people to their African heritage
- **Identity Formation**: Developing positive cultural identity
- **Community Building**: Uniting people around shared values
- **Spiritual Practice**: Providing spiritual guidance and comfort

### International Recognition
The symbol has gained recognition beyond African communities and is appreciated by:
- **Religious Scholars**: Studying diverse spiritual traditions
- **Cultural Enthusiasts**: Learning about world cultures
- **Art Collectors**: Appreciating the aesthetic and cultural value
- **Spiritual Seekers**: Finding meaning and inspiration

## Practical Applications

### Daily Life
People can incorporate Gye Nyame principles by:
- **Morning Reflection**: Starting each day with spiritual awareness
- **Gratitude Practice**: Regularly acknowledging blessings
- **Moral Decision-Making**: Considering spiritual values in choices
- **Community Service**: Helping others as an expression of divine love

### Professional Life
In work contexts, the symbol encourages:
- **Ethical Behavior**: Maintaining high moral standards
- **Service Orientation**: Focusing on helping others
- **Humility**: Recognizing the contributions of others
- **Integrity**: Acting with honesty and honor

## The Symbol's Message

Gye Nyame teaches us that:
- **God is Supreme**: The divine is the ultimate authority and power
- **Humility is Virtuous**: Recognizing our limitations leads to wisdom
- **Gratitude is Essential**: Acknowledging blessings brings joy and peace
- **Community Matters**: Shared spiritual beliefs unite people
- **Purpose is Divine**: Our lives have meaning in relation to the divine plan

## Conclusion

Gye Nyame is a powerful symbol that reminds us of the divine presence in all aspects of life. By acknowledging God's supremacy and living according to spiritual principles, we can find meaning, purpose, and peace in our daily lives while honoring the rich cultural heritage that has shaped our understanding of the divine.`
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