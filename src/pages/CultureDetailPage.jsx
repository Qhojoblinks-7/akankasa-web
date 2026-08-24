import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Heart, MessageCircle, BookOpen } from 'lucide-react';
import { getCultureArticle, getCultureArticles } from '../api';
import ShareButton from '../components/ShareButton';
import SEO from '../components/SEO';

const categoryColors = {
  traditions: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  history: { bg: 'bg-gray-200', text: 'text-gray-800', border: 'border-gray-300' },
  arts: { bg: 'bg-yellow-50', text: 'text-yellow-900', border: 'border-yellow-200' },
  music: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' },
};

const CultureDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [article, list] = await Promise.all([
          id ? getCultureArticle(id) : Promise.resolve(null),
          getCultureArticles(),
        ]);
        setContent(article);
        setArticles(Array.isArray(list) ? list : (list?.results || []));
      } catch (err) {
        setError(err.message || 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-red-600">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/culture')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Culture
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h2>
          <button
            onClick={() => navigate('/culture')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Culture
          </button>
        </div>
      </div>
    );
  }

  const colors = categoryColors[content.category] || categoryColors.traditions;
  const relatedArticles = articles
    .filter(item => item.id !== content.id && item.category === content.category)
    .slice(0, 3);

  return (
    <>
      <SEO
        title={content.title}
        description={content.excerpt || content.subtitle || content.description}
        canonical={`https://akankasa.com/culture/${content.id}`}
        ogImage={content.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": content.title,
          "description": content.excerpt || content.subtitle || content.description,
          "image": content.image,
          "url": `https://akankasa.com/culture/${content.id}`
        }}
      />
      <div className="min-h-screen bg-white">
      {/* Hero Header with Image */}
      {content.image && (
        <div className="relative h-[50vh] min-h-[400px] max-h-[600px]">
          <img
            src={content.image}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          
          {/* Back Button */}
          <div className="absolute top-6 left-0 right-0">
            <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8">
              <button
                onClick={() => navigate('/culture')}
                className="flex items-center text-white/90 hover:text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full transition-all"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Culture
              </button>
            </div>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="max-w-3xl">
                {content.category && (
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {content.category.charAt(0).toUpperCase() + content.category.slice(1)}
                  </span>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {content.title}
                </h1>
                {content.description && (
                  <p className="text-xl text-white/90 leading-relaxed">
                    {content.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Container */}
      <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Meta Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-gray-200">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                {content.author && (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white font-bold">
                      {(content.author || 'A').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{content.author}</p>
                      {content.date && (
                        <p className="text-xs text-gray-500">
                          {new Date(content.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {!content.author && content.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(content.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                )}
                {content.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{content.readTime} min read</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    liked 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">{liked ? 'Liked' : 'Like'}</span>
                </button>
                <ShareButton url={window.location.href} title={content.title} />
              </div>
            </div>

            {/* Article Content */}
            <article>
              {content.fullDescription && (
                <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                  {content.fullDescription}
                </p>
              )}

              {content.content && (
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">
                  {content.content}
                </div>
              )}

              {/* Category-specific content */}
              {content.category === 'history' && (
                <>
                  {content.timeline && (
                    <div className="bg-gray-50 border-l-4 border-gray-900 p-6 rounded-r-lg mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-900" />
                        Timeline
                      </h3>
                      <p className="text-gray-800">{content.timeline}</p>
                    </div>
                  )}
                  {content.significance && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-lg mb-8">
                      <h3 className="text-xl font-bold text-yellow-900 mb-2 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-yellow-600" />
                        Significance
                      </h3>
                      <p className="text-yellow-800">{content.significance}</p>
                    </div>
                  )}
                </>
              )}

              {content.category === 'arts' && content.examples && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Examples & Symbols</h3>
                  <div className="grid gap-4">
                    {content.examples.map((example, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl font-bold text-yellow-600 flex-shrink-0">
                          {example.symbol}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{example.meaning}</h4>
                          {example.description && (
                            <p className="text-gray-600 text-sm">{example.description}</p>
                          )}
                        </div>
                      </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.category === 'music' && content.instruments && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Instruments</h3>
                  <div className="flex flex-wrap gap-3">
                    {content.instruments.map((instrument, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-800 border border-gray-300"
                      >
                        {instrument}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {content.tags && content.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {content.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources */}
              {content.sources && content.sources.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Sources & References</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {content.sources.map((source, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>{source}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>

            {/* Author Bio */}
            {content.author && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {(content.author || 'A').charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">About {content.author}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Contributor to Akan Kasa ne Amammere, sharing knowledge about Akan culture, 
                        language, and heritage with the community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Comments Section Placeholder */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                Comments
              </h3>
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Be the first to comment on this article</p>
                <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium">
                  Write a Comment
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Author Bio Card */}
            {content.author && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {(content.author || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{content.author}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Contributor to Akan Kasa ne Amammere, sharing knowledge about Akan culture, language, and heritage.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            {content.tags && content.tags.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-800 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles Sidebar */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map(related => (
                    <Link
                      key={related.id}
                      to={`/culture/${related.id}`}
                      className="group flex gap-4"
                    >
                      {related.image && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-yellow-700 transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        {related.description && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{related.description}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Related Content */}
      {relatedArticles.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map(related => (
                <Link
                  key={related.id}
                  to={`/culture/${related.id}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {related.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {related.category && (
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[related.category]?.bg || 'bg-gray-100'} ${categoryColors[related.category]?.text || 'text-gray-800'} border ${categoryColors[related.category]?.border || 'border-gray-200'}`}>
                        {related.category.charAt(0).toUpperCase() + related.category.slice(1)}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {related.description}
                    </p>
                    <div className="flex items-center text-amber-600 font-medium text-sm">
                      Read Article
                      <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/culture"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Explore All Articles
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
);
};

export default CultureDetailPage;
