import React from 'react';

const ArticleLayout = ({ article, sectionConfig, onBack }) => {
  if (!article) return null;

  const SectionIcon = sectionConfig?.icon || (() => null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-4">
            <button onClick={onBack} className="flex items-center text-white/80 hover:text-white mr-4">
              ← Back
            </button>
          </div>
          <div className="flex items-center mb-4">
            {SectionIcon && (
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{backgroundColor: sectionConfig.color || '#564c38'}}>
                <SectionIcon />
              </div>
            )}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{article.title}</h1>
              <p className="text-xl opacity-90">{article.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-white/80">
            {article.region && (
              <span className="flex items-center">
                📍 {article.region}
              </span>
            )}
            {article.timeline && (
              <span className="flex items-center">
                📅 {article.timeline}
              </span>
            )}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            {article.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))}
          </div>

          {article.significance && (
            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Cultural Significance</h3>
              <p className="text-yellow-700">{article.significance}</p>
            </div>
          )}

          {article.examples && article.examples.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Examples</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.examples.map((example, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="text-2xl font-bold mb-2" style={{color: '#564c38'}}>{example.symbol}</div>
                    <div className="text-gray-700">{example.meaning}</div>
                    {example.description && (
                      <div className="text-sm text-gray-500 mt-2">{example.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {article.instruments && article.instruments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Instruments</h3>
              <div className="flex flex-wrap gap-2">
                {article.instruments.map((instrument, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-sm" style={{backgroundColor: '#f1d799', color: '#564c38'}}>
                    {instrument}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {article.author_name && (
          <div className="bg-white rounded-lg shadow p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <span className="text-gray-600 font-medium">
                {article.author_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="font-medium text-gray-900">Contributed by {article.author_name}</div>
              <div className="text-sm text-gray-500">Community submission</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleLayout;

