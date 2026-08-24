import { initDatabase, getDb } from './database.js';
import { dictionaryData, culturalData, researchData, forumData, communityData, lessonsData, alphabetData, greetingsData, vocabularyModules, userProfiles } from '../src/data/mockData.js';

const seed = async () => {
  try {
    console.log('Starting database initialization...');
    const db = await initDatabase();
    console.log('Database initialized successfully');
    
    db.serialize(() => {
      console.log('Seeding dictionary terms...');
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO dictionary_terms (id, primary_akan, english_translation, part_of_speech, etymology, is_published)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      dictionaryData.forEach(entry => {
        stmt.run([
          entry.id,
          entry.akan,
          entry.english,
          entry.partOfSpeech || 'noun',
          entry.etymology || '',
          1
        ]);
      });

      stmt.finalize();

      const varStmt = db.prepare(`
        INSERT OR IGNORE INTO dialect_variations (term_id, dialect, spelling, phonetic_script, example_sentence_akan, example_sentence_english)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      const audioStmt = db.prepare(`
        INSERT OR IGNORE INTO audio_pronunciations (term_id, dialect, audio_url, speaker_gender, is_verified)
        VALUES (?, ?, ?, ?, ?)
      `);

      dictionaryData.forEach(entry => {
        const dialect = entry.dialect === 'Twi' ? 'Twi' : entry.dialect || 'Twi';
        varStmt.run([entry.id, dialect, entry.akan, entry.pronunciation || '', entry.examples && entry.examples[0] ? entry.examples[0].akan : '', entry.examples && entry.examples[0] ? entry.examples[0].english : '']);
        audioStmt.run([entry.id, dialect, entry.audio || '', '', 0]);
      });

      varStmt.finalize();
      audioStmt.finalize();
      console.log('Seeded dictionary terms, variations, and audio');

      const culturePromises = [];
      const categories = {
        traditions: 'traditions',
        history: 'history',
        symbols: 'arts'
      };

      Object.entries(categories).forEach(([dataKey, category]) => {
        const items = culturalData[dataKey] || [];
        items.forEach(item => {
          const title = item.title || item.name || 'Untitled';
          const description = item.description || item.usage || '';
          const content = item.content || item.meaning || '';
          const tags = item.tags ? item.tags.join(',') : (item.usage ? [item.usage] : []).join(',');
          const examples = item.examples ? item.examples.map(ex => ex.symbol || ex).join(',') : '';
          const instruments = item.instruments ? item.instruments.join(',') : '';
          
          const p = new Promise((resolve, reject) => {
            db.run(
              `INSERT OR IGNORE INTO culture_articles (title, description, content, category, region, timeline, significance, examples, instruments, tags, author_name, author_email, status, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                title,
                description,
                content,
                category,
                item.region || '',
                item.timeline || '',
                item.significance || '',
                examples,
                instruments,
                tags,
                'Admin',
                'admin@akankasa.org',
                'approved',
                1
              ],
              (err) => {
                if (err) reject(err);
                else resolve();
              }
            );
          });
          culturePromises.push(p);
        });
      });

      Promise.all(culturePromises).then(() => console.log('Seeded culture articles'));

      const docPromises = [];
      (researchData.papers || []).forEach(paper => {
        const p = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO documents (title, description, file_url, file_type, category, level, author, tags, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              paper.title,
              paper.abstract || '',
              paper.downloadUrl || `/papers/${paper.id}.pdf`,
              'pdf',
              'research',
              paper.level ? paper.level.toLowerCase() : 'intermediate',
              paper.author || 'Unknown',
              paper.tags ? paper.tags.join(',') : '',
              1
            ],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        docPromises.push(p);
      });

      Promise.all(docPromises).then(() => console.log('Seeded documents'));

      const forumPromises = [];
      (forumData || []).forEach(post => {
        const p = new Promise((resolve, reject) => {
          db.run(
            'INSERT OR IGNORE INTO forum_posts (title, content, category, author_name, author_email, status, views) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
              post.title,
              post.content,
              post.category,
              post.author || 'Anonymous',
              '',
              'approved',
              post.replies || 0
            ],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        forumPromises.push(p);
      });

      Promise.all(forumPromises).then(() => console.log('Seeded forum posts'));

      const eventPromises = [];
      (communityData.events || []).forEach(event => {
        const p = new Promise((resolve, reject) => {
          db.run(
            'INSERT OR IGNORE INTO events (title, description, event_date, event_time, location, event_type, max_participants, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
              event.title,
              event.description || '',
              event.date || '',
              event.time || '',
              event.location || '',
              event.type ? event.type.toLowerCase() : 'online',
              event.participants || null,
              'upcoming'
            ],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        eventPromises.push(p);
      });

      Promise.all(eventPromises).then(() => console.log('Seeded events'));

      const lessonPromises = [];
      (lessonsData || []).forEach(lesson => {
        const p = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO lessons (title, description, level, duration, overview, objectives, content, quiz, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              lesson.title,
              lesson.description || '',
              lesson.level || 'beginner',
              lesson.duration || '',
              lesson.content?.overview || '',
              JSON.stringify(lesson.content?.objectives || []),
              JSON.stringify(lesson.content?.sections || []),
              JSON.stringify(lesson.quiz || []),
              1
            ],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        lessonPromises.push(p);
      });
      Promise.all(lessonPromises).then(() => console.log('Seeded lessons'));

      const vocabPromises = [];
      (vocabularyModules || []).forEach(mod => {
        const p = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO vocabulary_modules (title, description, words, is_published) VALUES (?, ?, ?, ?)`,
            [
              mod.title,
              mod.description || '',
              JSON.stringify(mod.words || []),
              1
            ],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        vocabPromises.push(p);
      });
      Promise.all(vocabPromises).then(() => console.log('Seeded vocabulary modules'));

      const greetingPromises = [];
      (greetingsData || []).forEach(g => {
        const p = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO greetings (akan, english, pronunciation, context, audio_url, time_of_day, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              g.akan,
              g.english,
              g.pronunciation || '',
              g.context || '',
              g.audio || '',
              'general',
              1
            ],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        greetingPromises.push(p);
      });
      Promise.all(greetingPromises).then(() => console.log('Seeded greetings'));

      const profilePromises = [];
      (userProfiles || []).forEach(profile => {
        const p = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO user_profiles (name, role, location, contributions, joined, specialties, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              profile.name,
              profile.role || '',
              profile.location || '',
              profile.contributions || 0,
              profile.joined || '',
              (profile.specialties || []).join(','),
              1
            ],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        profilePromises.push(p);
      });
      Promise.all(profilePromises).then(() => console.log('Seeded user profiles'));

      const legalPromises = [];
      const legalPages = [
        { slug: 'privacy', title: 'Privacy Policy', content: 'We respect your privacy. This policy outlines how we collect, use, and protect your personal data when you use AkanKasa.' },
        { slug: 'terms', title: 'Terms of Service', content: 'By accessing AkanKasa, you agree to these terms. Our platform is provided for educational and cultural preservation purposes.' }
      ];
      legalPages.forEach(page => {
        const p = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO legal_pages (slug, title, content) VALUES (?, ?, ?)`,
            [page.slug, page.title, page.content],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        legalPromises.push(p);
      });
      Promise.all(legalPromises).then(() => console.log('Seeded legal pages'));

      const proposalPromises = [];
      (researchData.papers || []).slice(0, 2).forEach(paper => {
        const p = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO project_proposals (title, description, proposer_name, proposer_email, status) VALUES (?, ?, ?, ?, ?)`,
            [
              `Research: ${paper.title}`,
              paper.abstract || '',
              paper.author || 'Anonymous',
              '',
              'approved'
            ],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        proposalPromises.push(p);
      });
      Promise.all(proposalPromises).then(() => console.log('Seeded project proposals'));

      const homepagePromises = [];
      const sections = [
        { section: 'hero', title: 'AkanKasa', subtitle: 'Preserve. Learn. Connect.', body: 'The premier digital platform for Akan language learning and cultural preservation.', image_url: '', link_url: '/learn', link_text: 'Start Learning', sort_order: 0 },
        { section: 'feature', title: 'Bilingual Dictionary', subtitle: '500+ Akan words with audio', body: 'Search Akan to English or English to Akan with dialect filtering and native pronunciation.', image_url: '', link_url: '/dictionary', link_text: 'Explore Dictionary', sort_order: 1 },
        { section: 'feature', title: 'Interactive Lessons', subtitle: 'Alphabet, greetings & vocabulary', body: 'Structured learning paths with flashcards, quizzes, and progress tracking.', image_url: '', link_url: '/learn', link_text: 'Start Learning', sort_order: 2 },
        { section: 'feature', title: 'Culture Repository', subtitle: 'Traditions, history, and Adinkra', body: 'Discover the rich cultural heritage of the Akan people through articles and multimedia.', image_url: '', link_url: '/culture', link_text: 'Explore Culture', sort_order: 3 },
        { section: 'cta', title: 'Join the Community', subtitle: 'Connect with learners worldwide', body: 'Participate in forums, attend events, and contribute to preserving Akan language and culture.', image_url: '', link_url: '/community', link_text: 'Join Community', sort_order: 4 }
      ];
      sections.forEach(s => {
        const p = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO homepage_content (section, title, subtitle, body, image_url, link_url, link_text, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [s.section, s.title, s.subtitle, s.body, s.image_url, s.link_url, s.link_text, s.sort_order],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        homepagePromises.push(p);
      });
      Promise.all(homepagePromises).then(() => console.log('Seeded homepage content'));

      const festivalPromises = [];
      const festivals = [
        { title: 'Akwasidae Festival', description: 'Traditional drumming ceremony at the Manhyia Palace', category: 'festival', location: 'Kumasi, Ashanti Region', event_date: '2024-01-21', photographer: 'Kwame Asante', tags: 'drumming,traditional,palace', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' },
        { title: 'Kundum Festival', description: 'Colorful traditional dancers in elaborate costumes', category: 'dance', location: 'Axim, Western Region', event_date: '2024-08-15', photographer: 'Ama Boateng', tags: 'dance,costumes,celebration', image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop' },
        { title: 'Homowo Festival', description: 'Traditional priests performing rituals', category: 'ritual', location: 'Accra, Greater Accra', event_date: '2024-08-12', photographer: 'Kofi Mensah', tags: 'ritual,priests,ceremony', image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' },
        { title: 'Aboakyir Festival', description: 'Youth carrying ceremonial stools', category: 'festival', location: 'Winneba, Central Region', event_date: '2024-05-20', photographer: 'Kwame Asante', tags: 'youth,ceremony,stools', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop' }
      ];
      festivals.forEach(f => {
        const p = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO festivals (title, description, image_url, category, location, event_date, photographer, tags, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [f.title, f.description, f.image_url, f.category, f.location, f.event_date, f.photographer, f.tags, 1],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        festivalPromises.push(p);
      });
      Promise.all(festivalPromises).then(() => console.log('Seeded festivals'));

      // Seed Folk Stories
      const folkStoryPromises = [];
      const folkStories = [
        { title: 'The Spider and the Wisdom', description: "Anansi's quest to obtain wisdom from the sky god Nyame", category: 'Animal Fables', language: 'Twi', duration: '12 minutes', type: 'audio', transcript: 'Once upon a time, Anansi the spider wanted to obtain wisdom from the sky god Nyame...', narrator: 'Kwame Asante', region: 'Ashanti' },
        { title: 'The Origin of Fire', description: 'How fire came to the earth through the cleverness of the animals', category: 'Creation Stories', language: 'Twi', duration: '15 minutes', type: 'audio', transcript: 'Long ago, when the world was young, there was no fire on earth...', narrator: 'Afua Darko', region: 'Akuapem' },
        { title: 'The Talking Skull', description: 'A cautionary tale about the dangers of boasting and pride', category: 'Moral Stories', language: 'Twi', duration: '10 minutes', type: 'audio', transcript: 'There once lived two friends who were very boastful...', narrator: 'Yaw Mensah', region: 'Fante' },
        { title: 'The Moon and the Sea', description: 'Why the moon reflects on water and the origin of tides', category: 'Nature Stories', language: 'Twi', duration: '8 minutes', type: 'audio', transcript: 'In the beginning, the moon and the sea were close friends...', narrator: 'Adwoa Boateng', region: 'Ga' }
      ];
      folkStories.forEach(s => {
        const p = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO folk_stories (title, description, category, language, duration, type, transcript, narrator, region, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [s.title, s.description, s.category, s.language, s.duration, s.type, s.transcript, s.narrator, s.region, 1],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        folkStoryPromises.push(p);
      });
      Promise.all(folkStoryPromises).then(() => console.log('Seeded folk stories'));

      // Seed Drumming
      const drummingPromises = [];
      const drummingLessons = [
        { title: 'Introduction to Kagan Drum', description: 'Learn the basics of the Kagan, a double-headed drum used in storytelling', instrument: 'Kagan', difficulty: 'Beginner', bpm: 80, type: 'video', pattern_notation: 'Tone - Tone - Slap - Tone - Tone - Slap', transcript: 'The Kagan drum is a double-headed drum with a unique hourglass shape...', instructor: 'Kofi Asante', duration: '15 minutes', region: 'Ashanti' },
        { title: 'Dondo Rhythms for Beginners', description: 'Master the fundamental rhythms of the Dondo drum', instrument: 'Dondo', difficulty: 'Beginner', bpm: 100, type: 'video', pattern_notation: 'Bass - Tone - Tone - Bass - Tone - Tone', transcript: 'The Dondo is a cylindrical drum that produces deep, resonant sounds...', instructor: 'Yaw Mensah', duration: '12 minutes', region: 'Akuapem' },
        { title: 'Advanced Atumpan Techniques', description: 'Learn complex polyrhythms with the Atumpan talking drums', instrument: 'Atumpan', difficulty: 'Advanced', bpm: 120, type: 'video', pattern_notation: 'Tone - Slap - Bass - Slap - Tone - Bass', transcript: 'The Atumpan are talking drums that can mimic the tonal patterns of Akan speech...', instructor: 'Kwame Boateng', duration: '20 minutes', region: 'Ashanti' },
        { title: 'Fontomfrom Ensemble Playing', description: 'Learn to play in a traditional Fontomfrom drum ensemble', instrument: 'Fontomfrom', difficulty: 'Intermediate', bpm: 90, type: 'video', pattern_notation: 'Bass - Bass - Tone - Tone - Slap - Slap', transcript: 'The Fontomfrom is a large ceremonial drum played in pairs during important occasions...', instructor: 'Afua Darko', duration: '18 minutes', region: 'Ashanti' }
      ];
      drummingLessons.forEach(l => {
        const p = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO drumming (title, description, instrument, difficulty, bpm, type, pattern_notation, transcript, instructor, duration, region, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [l.title, l.description, l.instrument, l.difficulty, l.bpm, l.type, l.pattern_notation, l.transcript, l.instructor, l.duration, l.region, 1],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        drummingPromises.push(p);
      });
      Promise.all(drummingPromises).then(() => console.log('Seeded drumming lessons'));

      // Seed Festival Photos
      const festivalPhotoPromises = [];
      const festivalPhotos = [
        { title: 'Akwasidae Festival', description: 'Traditional drumming ceremony at the Manhyia Palace', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', category: 'festival', location: 'Kumasi, Ashanti Region', event_date: '2024-01-21', photographer: 'Kwame Asante', tags: 'drumming,traditional,palace' },
        { title: 'Kundum Festival', description: 'Colorful traditional dancers in elaborate costumes', image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop', category: 'dance', location: 'Axim, Western Region', event_date: '2024-08-15', photographer: 'Ama Boateng', tags: 'dance,costumes,celebration' },
        { title: 'Homowo Festival', description: 'Traditional priests performing rituals', image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', category: 'ritual', location: 'Accra, Greater Accra', event_date: '2024-08-12', photographer: 'Kofi Mensah', tags: 'ritual,priests,ceremony' },
        { title: 'Aboakyir Festival', description: 'Youth carrying ceremonial stools', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', category: 'procession', location: 'Winneba, Central Region', event_date: '2024-05-20', photographer: 'Adwoa Darko', tags: 'procession,youth,stools' }
      ];
      festivalPhotos.forEach(p => {
        const pr = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO festival_photos (title, description, image_url, category, location, event_date, photographer, tags, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [p.title, p.description, p.image_url, p.category, p.location, p.event_date, p.photographer, p.tags, 1],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        festivalPhotoPromises.push(pr);
      });
      Promise.all(festivalPhotoPromises).then(() => console.log('Seeded festival photos'));

      // Seed Research Papers
      const researchPromises = [];
      const researchPapers = [
        { title: 'The Role of Oral Tradition in Akan Society', description: 'Comprehensive analysis of how oral traditions maintain cultural identity and transmit knowledge across generations', author: 'Dr. Kwame Adu-Gyamfi', institution: 'University of Ghana', category: 'Anthropology', abstract: 'This paper examines the critical role of oral tradition in preserving Akan cultural heritage...', publication_date: '2023-05-15', pages: 45, keywords: 'oral tradition,Akan culture,storytelling,cultural preservation', doi: '10.1234/akan.2023.001', citation: 'Adu-Gyamfi, K. (2023). The Role of Oral Tradition in Akan Society. Journal of African Cultural Studies, 15(2), 78-122.' },
        { title: 'Drumming as Communication in Akan Culture', description: 'Exploration of the linguistic and communicative functions of traditional Akan drumming systems', author: 'Dr. Abena Osei', institution: 'Kwame Nkrumah University', category: 'Ethnomusicology', abstract: 'This study investigates how Akan talking drums serve as sophisticated communication systems...', publication_date: '2023-08-20', pages: 38, keywords: 'talking drums,Akan communication,ethnomusicology,cultural linguistics', doi: '10.1234/akan.2023.002', citation: 'Osei, A. (2023). Drumming as Communication in Akan Culture. African Music Studies, 12(3), 145-182.' },
        { title: 'Gender Roles in Akan Traditional Society', description: 'Analysis of gender dynamics and social structures in traditional Akan communities', author: 'Dr. Esi Mensah', institution: 'University of Cape Coast', category: 'Sociology', abstract: 'This research examines the complex gender roles and social structures within traditional Akan society...', publication_date: '2023-03-10', pages: 52, keywords: 'gender roles,Akan society,social structure,traditional culture', doi: '10.1234/akan.2023.003', citation: 'Mensah, E. (2023). Gender Roles in Akan Traditional Society. Gender & Society in Africa, 8(1), 23-74.' },
        { title: 'The Philosophy of Akan Proverbs', description: 'Deep dive into the philosophical wisdom embedded in Akan proverbs and their cultural significance', author: 'Prof. Kofi Appiah', institution: 'University of Education, Winneba', category: 'Philosophy', abstract: 'This paper explores the philosophical depth and cultural wisdom contained within Akan proverbs...', publication_date: '2023-11-05', pages: 67, keywords: 'Akan proverbs,philosophy,cultural wisdom,linguistic analysis', doi: '10.1234/akan.2023.004', citation: 'Appiah, K. (2023). The Philosophy of Akan Proverbs. African Philosophy Review, 5(2), 89-155.' }
      ];
      researchPapers.forEach(p => {
        const pr = new Promise((resolve, reject) => {
          db.run(
            `INSERT OR IGNORE INTO research_papers (title, description, author, institution, category, abstract, publication_date, pages, keywords, doi, citation, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [p.title, p.description, p.author, p.institution, p.category, p.abstract, p.publication_date, p.pages, p.keywords, p.doi, p.citation, 1],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        researchPromises.push(pr);
      });
      Promise.all(researchPromises).then(() => console.log('Seeded research papers'));
    });

    setTimeout(() => {
      console.log('Seeding complete');
      db.close();
    }, 1000);
  } catch (err) {
    console.error('Seed error:', err);
  }
};

seed();
