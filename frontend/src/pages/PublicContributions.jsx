import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Music, Camera, FileText, Send, CheckCircle } from 'lucide-react';
import Modal from '../components/ui/Modal';
import MediaField from '../components/media/MediaField';
import { useAuth } from '../hooks/useAuth';
import CommunityLayout from '../components/CommunityLayout';
import {
  submitFolkStoryContribution,
  submitDrummingContribution,
  submitFestivalPhotoContribution,
  submitResearchPaperContribution,
} from '../api';

const SECTIONS = [
  { id: 'folk-stories', label: 'Folk Stories', icon: BookOpen, description: 'Share traditional Akan folk stories, Anansi tales, or oral traditions' },
  { id: 'drumming', label: 'Drumming', icon: Music, description: 'Contribute a drumming lesson or rhythm pattern' },
  { id: 'festival-photos', label: 'Festival Photos', icon: Camera, description: 'Submit photos from cultural festivals and ceremonies' },
  { id: 'research-papers', label: 'Research Papers', icon: FileText, description: 'Submit an academic paper or research about Akan culture' },
];

const ContributionForm = ({ section, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [folkForm, setFolkForm] = useState({ title: '', description: '', category: '', language: 'Twi', narrator: '', region: '', duration: '', transcript: '', audio_url: '', video_url: '' });
  const [drumForm, setDrumForm] = useState({ title: '', description: '', instrument: '', difficulty: 'Beginner', bpm: '', duration: '', instructor: '', region: '', transcript: '', audio_url: '', video_url: '' });
  const [photoForm, setPhotoForm] = useState({ title: '', description: '', category: '', location: '', date: '', photographer: '', tags: '', imageUrl: '' });
  const [paperForm, setPaperForm] = useState({ title: '', description: '', author: '', institution: '', category: '', abstract: '', publicationDate: '', pages: '', keywords: '', doi: '', pdfUrl: '' });

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">You must be logged in to contribute.</p>
        <button onClick={() => navigate('/login')} className="px-6 py-2 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-600 transition-colors">
          Sign In
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (section === 'folk-stories') await submitFolkStoryContribution({ ...folkForm, type: folkForm.video_url ? 'video' : 'audio', audioUrl: folkForm.audio_url, videoUrl: folkForm.video_url, author_name: user.name, author_email: user.email });
      else if (section === 'drumming') await submitDrummingContribution({ ...drumForm, type: drumForm.video_url ? 'video' : 'audio', audioUrl: drumForm.audio_url, videoUrl: drumForm.video_url, author_name: user.name, author_email: user.email });
      else if (section === 'festival-photos') await submitFestivalPhotoContribution({ ...photoForm, tags: photoForm.tags.split(',').map(t => t.trim()).filter(Boolean), author_name: user.name, author_email: user.email });
      else if (section === 'research-papers') await submitResearchPaperContribution({ ...paperForm, keywords: paperForm.keywords.split(',').map(k => k.trim()).filter(Boolean), author_name: user.name, author_email: user.email });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
        <p className="text-gray-400 mb-6">Your contribution has been submitted and is pending review by our moderators.</p>
        <button onClick={onClose} className="px-6 py-2 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-600 transition-colors">Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-400 rounded">{error}</div>}

      {section === 'folk-stories' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Story Title *</label>
              <input value={folkForm.title} onChange={e => setFolkForm({...folkForm, title: e.target.value})} required className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
              <textarea value={folkForm.description} onChange={e => setFolkForm({...folkForm, description: e.target.value})} rows={2} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
              <input value={folkForm.category} onChange={e => setFolkForm({...folkForm, category: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} placeholder="e.g. Animal Fables" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Language</label>
              <select value={folkForm.language} onChange={e => setFolkForm({...folkForm, language: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }}>
                <option value="Twi">Twi</option><option value="Fante">Fante</option><option value="Akuapem">Akuapem</option><option value="English">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Narrator</label>
              <input value={folkForm.narrator} onChange={e => setFolkForm({...folkForm, narrator: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Region</label>
              <input value={folkForm.region} onChange={e => setFolkForm({...folkForm, region: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Duration</label>
              <input value={folkForm.duration} onChange={e => setFolkForm({...folkForm, duration: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} placeholder="e.g. 12 minutes" />
            </div>
          </div>
          <MediaField label="Audio file" value={folkForm.audio_url} onChange={(url) => setFolkForm({...folkForm, audio_url: url})} accept="audio/*" />
          <MediaField label="Video file (optional)" value={folkForm.video_url} onChange={(url) => setFolkForm({...folkForm, video_url: url})} accept="video/*" />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Transcript</label>
            <textarea value={folkForm.transcript} onChange={e => setFolkForm({...folkForm, transcript: e.target.value})} rows={4} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent font-mono text-sm" style={{ '--tw-ring-color': '#f59e0b' }} />
          </div>
        </>
      )}

      {section === 'drumming' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Lesson Title *</label>
              <input value={drumForm.title} onChange={e => setDrumForm({...drumForm, title: e.target.value})} required className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
              <textarea value={drumForm.description} onChange={e => setDrumForm({...drumForm, description: e.target.value})} rows={2} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Instrument</label>
              <input value={drumForm.instrument} onChange={e => setDrumForm({...drumForm, instrument: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} placeholder="e.g. Kagan, Atumpan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Difficulty</label>
              <select value={drumForm.difficulty} onChange={e => setDrumForm({...drumForm, difficulty: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }}>
                <option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Instructor</label>
              <input value={drumForm.instructor} onChange={e => setDrumForm({...drumForm, instructor: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Region</label>
              <input value={drumForm.region} onChange={e => setDrumForm({...drumForm, region: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
          </div>
          <MediaField label="Audio file" value={drumForm.audio_url} onChange={(url) => setDrumForm({...drumForm, audio_url: url})} accept="audio/*" />
          <MediaField label="Video file" value={drumForm.video_url} onChange={(url) => setDrumForm({...drumForm, video_url: url})} accept="video/*" />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Rhythm Pattern / Notes</label>
            <textarea value={drumForm.transcript} onChange={e => setDrumForm({...drumForm, transcript: e.target.value})} rows={4} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent font-mono text-sm" style={{ '--tw-ring-color': '#f59e0b' }} placeholder="Describe the rhythm pattern or technique" />
          </div>
        </>
      )}

      {section === 'festival-photos' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Photo Title *</label>
              <input value={photoForm.title} onChange={e => setPhotoForm({...photoForm, title: e.target.value})} required className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
              <textarea value={photoForm.description} onChange={e => setPhotoForm({...photoForm, description: e.target.value})} rows={2} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
              <select value={photoForm.category} onChange={e => setPhotoForm({...photoForm, category: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }}>
                <option value="">Select category</option>
                <option value="festival">Festival</option><option value="dance">Dance</option><option value="ritual">Ritual</option>
                <option value="procession">Procession</option><option value="chiefs">Chiefs & Royalty</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Location</label>
              <input value={photoForm.location} onChange={e => setPhotoForm({...photoForm, location: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Date Taken</label>
              <input type="date" value={photoForm.date} onChange={e => setPhotoForm({...photoForm, date: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Photographer</label>
              <input value={photoForm.photographer} onChange={e => setPhotoForm({...photoForm, photographer: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
          </div>
          <MediaField label="Photo *" value={photoForm.imageUrl} onChange={(url) => setPhotoForm({...photoForm, imageUrl: url})} accept="image/*" hint="Upload your festival photo" />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Tags</label>
            <input value={photoForm.tags} onChange={e => setPhotoForm({...photoForm, tags: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} placeholder="e.g. drumming, traditional, palace" />
          </div>
        </>
      )}

      {section === 'research-papers' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Paper Title *</label>
              <input value={paperForm.title} onChange={e => setPaperForm({...paperForm, title: e.target.value})} required className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Author</label>
              <input value={paperForm.author} onChange={e => setPaperForm({...paperForm, author: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Institution</label>
              <input value={paperForm.institution} onChange={e => setPaperForm({...paperForm, institution: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
              <input value={paperForm.category} onChange={e => setPaperForm({...paperForm, category: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} placeholder="e.g. Anthropology" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Publication Date</label>
              <input type="date" value={paperForm.publicationDate} onChange={e => setPaperForm({...paperForm, publicationDate: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">DOI (optional)</label>
              <input value={paperForm.doi} onChange={e => setPaperForm({...paperForm, doi: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} placeholder="10.xxxx/xxxxx" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Abstract</label>
            <textarea value={paperForm.abstract} onChange={e => setPaperForm({...paperForm, abstract: e.target.value})} rows={4} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} />
          </div>
          <MediaField label="PDF document" value={paperForm.pdfUrl} onChange={(url) => setPaperForm({...paperForm, pdfUrl: url})} accept=".pdf,.doc,.docx" />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Keywords</label>
            <input value={paperForm.keywords} onChange={e => setPaperForm({...paperForm, keywords: e.target.value})} className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-800 text-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#f59e0b' }} placeholder="e.g. oral tradition, Akan culture" />
          </div>
        </>
      )}

      <div className="flex justify-end pt-4 border-t border-gray-700">
        <button type="button" onClick={onClose} className="px-5 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors text-sm mr-3 text-gray-300">Cancel</button>
        <button type="submit" disabled={submitting} className="px-5 py-2 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-600 transition-colors flex items-center text-sm disabled:opacity-50">
          <Send className="w-4 h-4 mr-1.5" />
          {submitting ? 'Submitting...' : 'Submit for Review'}
        </button>
      </div>
    </form>
  );
};

const PublicContributions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Sign in to contribute</h1>
          <p className="text-gray-400 mb-6">You need an account to submit content for review.</p>
          <button onClick={() => navigate('/login')} className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-600 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <CommunityLayout showComposer={false} onToggleComposer={() => {}}>
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 px-4 py-3">
        <h2 className="text-xl font-bold">Contribute Content</h2>
      </header>
      <main className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SECTIONS.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="bg-gray-900 border border-gray-700 p-6 text-left hover:border-yellow-500 hover:shadow-md transition-all group"
              >
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-gray-700 transition-colors">
                    <Icon className="w-6 h-6 text-yellow-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{section.label}</h3>
                </div>
                <p className="text-sm text-gray-400">{section.description}</p>
              </button>
            );
          })}
        </div>
      </main>

      <Modal open={!!activeSection} onClose={() => setActiveSection(null)} title={activeSection ? `Contribute: ${SECTIONS.find(s => s.id === activeSection)?.label}` : ''} size="lg">
        {activeSection && <ContributionForm section={activeSection} onClose={() => setActiveSection(null)} />}
      </Modal>
    </CommunityLayout>
  );
};

export default PublicContributions;
