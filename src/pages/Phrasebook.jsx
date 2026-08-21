import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, BookOpen, ArrowLeft } from 'lucide-react';
import { getGreetings } from '../api';

const Phrasebook = () => {
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getGreetings({ time_of_day: category === 'all' ? 'all' : category });
        setPhrases(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-white" style={{background: 'linear-gradient(135deg, #564c38 0%, #695e46 100%)'}}>
        <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-4">
            <Link to="/learn" className="flex items-center text-white/80 hover:text-white mr-4"><ArrowLeft className="w-5 h-5 mr-2" />Back to Learning</Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Akan Phrasebook</h1>
          <p className="text-xl opacity-90 max-w-3xl">Common phrases and expressions for everyday conversations</p>
        </div>
      </div>

      <div className="w-full sm:w-[80%] md:w-[75%] lg:w-[94%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex space-x-2">
            {['all', 'general', 'morning', 'afternoon', 'evening'].map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === cat ? 'bg-[#564c38] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>{cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12"><div className="w-16 h-16 border-4 border-gray-200 border-t-[#564c38] rounded-full animate-spin"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phrases.map((phrase) => (
              <div key={phrase.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{phrase.akan}</h3>
                    <p className="text-gray-600">{phrase.english}</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium capitalize">{phrase.time_of_day || 'general'}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Pronunciation: {phrase.pronunciation}</p>
                {phrase.context && <p className="text-sm text-gray-600 italic">{phrase.context}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Phrasebook;
