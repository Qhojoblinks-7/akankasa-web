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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-start p-4">
      <div className="relative mt-8 sm:mt-16 p-4 sm:p-6 lg:p-8 w-full max-w-2xl bg-white rounded-lg shadow-xl">
        {/* Close Button - Mobile First */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        
        {/* Header - Mobile First */}
        <div className="pr-12 sm:pr-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
            Contribute Content
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
            Help preserve Akan culture by sharing your knowledge with the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Section Selection - Mobile First */}
          <div className="space-y-2">
            <label htmlFor="section" className="block text-sm font-medium text-gray-700">
              Choose a Category
            </label>
            <select
              id="section"
              name="section"
              value={formData.section}
              onChange={handleSectionChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base min-h-[44px] px-3 py-2"
              aria-label="Select content category"
            >
              {sections.map(section => (
                <option key={section.id} value={section.id}>{section.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* General Fields - Mobile First */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm min-h-[44px] px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
                placeholder="Enter a descriptive title"
                aria-label="Content title"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Short Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base px-3 py-2"
                placeholder="Brief summary of the content"
                aria-label="Content description"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Full Content
              </label>
              <textarea
                id="content"
                name="content"
                rows="6"
                value={formData.content}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base px-3 py-2"
                placeholder="Detailed content about the topic"
                aria-label="Full content text"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                Region (Optional)
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm min-h-[44px] px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
                aria-label="Select region"
              >
                <option value="">Select a region</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Conditional Fields based on section - Mobile First */}
            {formData.section === 'history' && (
              <>
                <div className="border-t border-gray-200 pt-4 sm:pt-6">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 leading-tight">
                    History Details
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                        Timeline
                      </label>
                      <input
                        type="text"
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm min-h-[44px] px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
                        placeholder="e.g., 18th century, pre-colonial era"
                        aria-label="Historical timeline"
                      />
                    </div>
                    <div>
                      <label htmlFor="significance" className="block text-sm font-medium text-gray-700">
                        Significance
                      </label>
                      <textarea
                        id="significance"
                        name="significance"
                        rows="2"
                        value={formData.significance}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base px-3 py-2"
                        placeholder="Why is this historically important?"
                        aria-label="Historical significance"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </>
            )}

            {formData.section === 'arts' && (
              <div className="border-t border-gray-200 pt-4 sm:pt-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 leading-tight">
                  Arts & Crafts Details
                </h4>
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
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm min-h-[44px] px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
                    aria-label="Arts and crafts examples"
                  />
                </div>
              </div>
            )}

            {formData.section === 'music' && (
              <div className="border-t border-gray-200 pt-4 sm:pt-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 leading-tight">
                  Music & Dance Details
                </h4>
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
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm min-h-[44px] px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
                    aria-label="Musical instruments"
                  />
                </div>
              </div>
            )}
            
            {/* Tags - Mobile First */}
            <div className="border-t border-gray-200 pt-4 sm:pt-6">
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm min-h-[44px] px-3 py-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm sm:text-base"
                aria-label="Content tags"
              />
            </div>
          </div>

          {/* Action Buttons - Mobile First */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 border-t border-gray-200 pt-4 sm:pt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px]"
              aria-label="Cancel contribution"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 sm:px-6 py-3 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-yellow-600 hover:bg-yellow-700 transition-colors min-h-[44px]"
              aria-label="Submit contribution"
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