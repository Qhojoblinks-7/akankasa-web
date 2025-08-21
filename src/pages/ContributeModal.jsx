// src/components/ContributeModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const ContributeModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    section: 'traditions',
    title: '',
    description: '',
    content: '',
    region: '',
    timeline: '',
    significance: '',
    examples: '',
    instruments: '',
    tags: ''
  });

  const regions = ['Ashanti Region', 'Eastern Region', 'Central Region', 'Western Region'];
  const sections = [
    { id: 'traditions', label: 'Traditions & Customs' },
    { id: 'history', label: 'History & Heritage' },
    { id: 'arts', label: 'Arts & Crafts' },
    { id: 'music', label: 'Music & Dance' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSectionChange = (e) => {
    const { value } = e.target;
    setFormData({
      section: value,
      title: '',
      description: '',
      content: '',
      region: '',
      timeline: '',
      significance: '',
      examples: '',
      instruments: '',
      tags: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newContent = {
      ...formData,
      id: Date.now().toString(),
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      instruments: formData.instruments ? formData.instruments.split(',').map(inst => inst.trim()) : [],
      examples: formData.examples ? formData.examples.split(',').map(ex => ({ symbol: ex.trim(), meaning: '', description: '' })) : []
    };

    Object.keys(newContent).forEach(key => {
      if (newContent[key] === '' || (Array.isArray(newContent[key]) && newContent[key].length === 0)) {
        delete newContent[key];
      }
    });

    console.log('Submitting content:', newContent);
    onSubmit(newContent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative mt-30 p-8 w-full max-w-2xl bg-white rounded-lg shadow-xl m-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Contribute Content</h3>
        <p className="text-gray-600 mb-6">Help preserve Akan culture by sharing your knowledge with the community.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="section" className="block text-sm font-medium text-gray-700">Choose a Category</label>
            <select
              id="section"
              name="section"
              value={formData.section}
              onChange={handleSectionChange}
              className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm **py-2**"
            >
              {sections.map(section => (
                <option key={section.id} value={section.id}>{section.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {/* General Fields (always visible) */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-10 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm **py-2**"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Full Content</label>
              <textarea
                id="content"
                name="content"
                rows="6"
                value={formData.content}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region (Optional)</label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-10 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm **py-2**"
              >
                <option value="">Select a region</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Conditional Fields based on section */}
            {formData.section === 'history' && (
              <>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">History Details</h4>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">Timeline</label>
                    <input
                      type="text"
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-10 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm **py-2**"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="significance" className="block text-sm font-medium text-gray-700">Significance</label>
                    <textarea
                      id="significance"
                      name="significance"
                      rows="2"
                      value={formData.significance}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-15 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    ></textarea>
                  </div>
                </div>
              </>
            )}

            {formData.section === 'arts' && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Arts & Crafts Details</h4>
                <div>
                  <label htmlFor="examples" className="block text-sm font-medium text-gray-700">
                    Examples (e.g., Symbol, another example)
                  </label>
                  <input
                    type="text"
                    id="examples"
                    name="examples"
                    value={formData.examples}
                    onChange={handleChange}
                    placeholder="Separate examples with commas"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-15 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm **py-2**"
                  />
                </div>
              </div>
            )}

            {formData.section === 'music' && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Music & Dance Details</h4>
                <div>
                  <label htmlFor="instruments" className="block text-sm font-medium text-gray-700">
                    Instruments (e.g., Atumpan, Fontomfrom)
                  </label>
                  <input
                    type="text"
                    id="instruments"
                    name="instruments"
                    value={formData.instruments}
                    onChange={handleChange}
                    placeholder="Separate instruments with commas"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-15 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm **py-2**"
                  />
                </div>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-4">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags (e.g., #festival, #royalty)
                </label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Separate tags with commas"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-15 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm **py-2**"
                />
            </div>
          </div>

          <div className="flex justify-end space-x-2 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700"
            >
              Submit Contribution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContributeModal;