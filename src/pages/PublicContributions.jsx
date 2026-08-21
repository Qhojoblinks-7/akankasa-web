import React, { useState } from 'react';
import { BookOpen, Music, Camera, FileText, Send, CheckCircle } from 'lucide-react';
import Modal from '../components/ui/Modal';
import MediaField from '../components/media/MediaField';
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
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [folkForm, setFolkForm] = useState({ title: '', description: '', category: '', language: 'Twi', narrator: '', region: '', duration: '', transcript: '', audio_url: '', video_url: '' });
  const [drumForm, setDrumForm] = useState({ title: '', description: '', instrument: '', difficulty: 'Beginner', bpm: '', duration: '', instructor: '', region: '', transcript: '', audio_url: '', video_url: '' });
  const [photoForm, setPhotoForm] = useState({ title: '', description: '', category: '', location: '', date: '', photographer: '', tags: '', imageUrl: '' });
  const [paperForm, setPaperForm] = useState({ title: '', description: '', author: '', institution: '', category: '', abstract: '', publicationDate: '', pages: '', keywords: '', doi: '', pdfUrl: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (section === 'folk-stories') await submitFolkStoryContribution({ ...folkForm, type: folkForm.video_url ? 'video' : 'audio', audioUrl: folkForm.audio_url, videoUrl: folkForm.video_url });
      else if (section === 'drumming') await submitDrummingContribution({ ...drumForm, type: drumForm.video_url ? 'video' : 'audio', audioUrl: drumForm.audio_url, videoUrl: drumForm.video_url });
      else if (section === 'festival-photos') await submitFestivalPhotoContribution({ ...photoForm, tags: photoForm.tags.split(',').map(t => t.trim()).filter(Boolean) });
      else if (section === 'research-papers') await submitResearchPaperContribution({ ...paperForm, keywords: paperForm.keywords.split(',').map(k => k.trim()).filter(Boolean) });
      setSubmitted(true);
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">Your contribution has been submitted and is pending review by our moderators.</p>
        <button onClick={onClose} className="px-6 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors">Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {section === 'folk-stories' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Story Title *</label>
              <input value={folkForm.title} onChange={e => setFolkForm({...folkForm, title: e.target.value})} required className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea value={folkForm.description} onChange={e => setFolkForm({...folkForm, description: e.target.value})} rows={2} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <input value={folkForm.category} onChange={e => setFolkForm({...folkForm, category: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} placeholder="e.g. Animal Fables" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Language</label>
              <select value={folkForm.language} onChange={e => setFolkForm({...folkForm, language: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }}>
                <option value="Twi">Twi</option><option value="Fante">Fante</option><option value="Akuapem">Akuapem</option><option value="English">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Narrator</label>
              <input value={folkForm.narrator} onChange={e => setFolkForm({...folkForm, narrator: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Region</label>
              <input value={folkForm.region} onChange={e => setFolkForm({...folkForm, region: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
              <input value={folkForm.duration} onChange={e => setFolkForm({...folkForm, duration: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} placeholder="e.g. 12 minutes" />
            </div>
          </div>
          <MediaField label="Audio file" value={folkForm.audio_url} onChange={(url) => setFolkForm({...folkForm, audio_url: url})} accept="audio/*" />
          <MediaField label="Video file (optional)" value={folkForm.video_url} onChange={(url) => setFolkForm({...folkForm, video_url: url})} accept="video/*" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Transcript</label>
            <textarea value={folkForm.transcript} onChange={e => setFolkForm({...folkForm, transcript: e.target.value})} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent font-mono text-sm" style={{ '--tw-ring-color': '#564c38' }} />
          </div>
        </>
      )}

      {section === 'drumming' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Lesson Title *</label>
              <input value={drumForm.title} onChange={e => setDrumForm({...drumForm, title: e.target.value})} required className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea value={drumForm.description} onChange={e => setDrumForm({...drumForm, description: e.target.value})} rows={2} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Instrument</label>
              <input value={drumForm.instrument} onChange={e => setDrumForm({...drumForm, instrument: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} placeholder="e.g. Kagan, Atumpan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Difficulty</label>
              <select value={drumForm.difficulty} onChange={e => setDrumForm({...drumForm, difficulty: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }}>
                <option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Instructor</label>
              <input value={drumForm.instructor} onChange={e => setDrumForm({...drumForm, instructor: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Region</label>
              <input value={drumForm.region} onChange={e => setDrumForm({...drumForm, region: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
          </div>
          <MediaField label="Audio file" value={drumForm.audio_url} onChange={(url) => setDrumForm({...drumForm, audio_url: url})} accept="audio/*" />
          <MediaField label="Video file" value={drumForm.video_url} onChange={(url) => setDrumForm({...drumForm, video_url: url})} accept="video/*" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Rhythm Pattern / Notes</label>
            <textarea value={drumForm.transcript} onChange={e => setDrumForm({...drumForm, transcript: e.target.value})} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} placeholder="Describe the rhythm pattern or technique" />
          </div>
        </>
      )}

      {section === 'festival-photos' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Photo Title *</label>
              <input value={photoForm.title} onChange={e => setPhotoForm({...photoForm, title: e.target.value})} required className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea value={photoForm.description} onChange={e => setPhotoForm({...photoForm, description: e.target.value})} rows={2} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select value={photoForm.category} onChange={e => setPhotoForm({...photoForm, category: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }}>
                <option value="">Select category</option>
                <option value="festival">Festival</option><option value="dance">Dance</option><option value="ritual">Ritual</option>
                <option value="procession">Procession</option><option value="chiefs">Chiefs & Royalty</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <input value={photoForm.location} onChange={e => setPhotoForm({...photoForm, location: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date Taken</label>
              <input type="date" value={photoForm.date} onChange={e => setPhotoForm({...photoForm, date: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Photographer</label>
              <input value={photoForm.photographer} onChange={e => setPhotoForm({...photoForm, photographer: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
          </div>
          <MediaField label="Photo *" value={photoForm.imageUrl} onChange={(url) => setPhotoForm({...photoForm, imageUrl: url})} accept="image/*" hint="Upload your festival photo" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
            <input value={photoForm.tags} onChange={e => setPhotoForm({...photoForm, tags: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} placeholder="e.g. drumming, traditional, palace" />
          </div>
        </>
      )}

      {section === 'research-papers' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Paper Title *</label>
              <input value={paperForm.title} onChange={e => setPaperForm({...paperForm, title: e.target.value})} required className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
              <input value={paperForm.author} onChange={e => setPaperForm({...paperForm, author: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Institution</label>
              <input value={paperForm.institution} onChange={e => setPaperForm({...paperForm, institution: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <input value={paperForm.category} onChange={e => setPaperForm({...paperForm, category: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} placeholder="e.g. Anthropology" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Publication Date</label>
              <input type="date" value={paperForm.publicationDate} onChange={e => setPaperForm({...paperForm, publicationDate: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">DOI (optional)</label>
              <input value={paperForm.doi} onChange={e => setPaperForm({...paperForm, doi: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} placeholder="10.xxxx/xxxxx" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Abstract</label>
            <textarea value={paperForm.abstract} onChange={e => setPaperForm({...paperForm, abstract: e.target.value})} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} />
          </div>
          <MediaField label="PDF document" value={paperForm.pdfUrl} onChange={(url) => setPaperForm({...paperForm, pdfUrl: url})} accept=".pdf,.doc,.docx" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Keywords</label>
            <input value={paperForm.keywords} onChange={e => setPaperForm({...paperForm, keywords: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:border-transparent" style={{ '--tw-ring-color': '#564c38' }} placeholder="e.g. oral tradition, Akan culture" />
          </div>
        </>
      )}

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button type="button" onClick={onClose} className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm mr-3">Cancel</button>
        <button type="submit" disabled={submitting} className="px-5 py-2 bg-[#564c38] text-white rounded-lg hover:bg-[#695e46] transition-colors flex items-center text-sm disabled:opacity-50">
          <Send className="w-4 h-4 mr-1.5" />
          {submitting ? 'Submitting...' : 'Submit for Review'}
        </button>
      </div>
    </form>
  );
};

const PublicContributions = () => {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="bg-gradient-to-r from-[#564c38] to-[#695e46] text-white">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contribute Content</h1>
          <p className="text-xl opacity-90 max-w-3xl">Share your knowledge of Akan culture. All submissions are reviewed by moderators before publishing.</p>
        </div>
      </div>

      <main className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SECTIONS.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:border-amber-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center mr-4 group-hover:bg-amber-100 transition-colors">
                    <Icon className="w-6 h-6 text-[#564c38]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{section.label}</h3>
                </div>
                <p className="text-sm text-gray-600">{section.description}</p>
              </button>
            );
          })}
        </div>
      </main>

      <Modal open={!!activeSection} onClose={() => setActiveSection(null)} title={activeSection ? `Contribute: ${SECTIONS.find(s => s.id === activeSection)?.label}` : ''} size="lg">
        {activeSection && <ContributionForm section={activeSection} onClose={() => setActiveSection(null)} />}
      </Modal>
    </div>
  );
};

export default PublicContributions;
