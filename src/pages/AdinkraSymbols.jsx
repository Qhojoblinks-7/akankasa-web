import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, X, Info } from 'lucide-react';
import ArticleLayout from '../components/ArticleLayout';
import { getCultureArticles } from '../api';

const AdinkraSymbols = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await getCultureArticles({ category: 'arts', limit: 50 });
      setArticles(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSymbols = articles.filter(article => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      article.title.toLowerCase().includes(term) ||
      article.description.toLowerCase().includes(term) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(term)))
    );
  });

  if (selectedArticle) {
    return (
      <ArticleLayout
        article={selectedArticle}
        sectionConfig={{ id: 'arts', label: 'Adinkra Symbols', icon: () => <span className="text-white text-xl">※</span>, color: '#564c38' }}
        onBack={() => setSelectedArticle(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-4">
            <Link to="/culture" className="flex items-center text-white/80 hover:text-white mr-4">
              ← Back to Culture
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Adinkra Symbols</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Discover the wisdom embedded in traditional Akan symbols, each carrying deep cultural meaning and philosophical significance
          </p>
        </div>
      </div>

      <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search symbols by name, meaning, or usage..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                style={{'--tw-ring-color': '#564c38'}}
                aria-label="Search Adinkra symbols"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#564c38] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading symbols...</p>
          </div>
        ) : filteredSymbols.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No symbols found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSymbols.map((symbol) => (
              <div
                key={symbol.id}
                onClick={() => setSelectedArticle(symbol)}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl font-bold" style={{color: '#564c38'}}>
                      {symbol.examples && symbol.examples.length > 0 ? symbol.examples[0].symbol : '※'}
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {symbol.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{symbol.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{symbol.description || symbol.content}</p>
                  
                  <div className="space-y-2">
                    {symbol.examples && symbol.examples.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Meaning:</h4>
                        <p className="text-sm text-gray-600">{symbol.examples[0].meaning}</p>
                      </div>
                    )}
                    {symbol.usage && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Usage:</h4>
                        <p className="text-sm text-gray-600">{symbol.usage}</p>
                      </div>
                    )}
                  </div>

                  {symbol.tags && symbol.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {symbol.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdinkraSymbols;

