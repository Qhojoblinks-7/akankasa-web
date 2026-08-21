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
