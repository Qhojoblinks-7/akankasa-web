import { cultureData } from '../data/mockData';

const CultureArts = () => {
  const arts = cultureData.arts || [];
  return (
    <div className="min-h-screen bg-gray-50 py-12 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 overflow-hidden">
        <h1 className="text-3xl font-bold text-akan-red mb-8 break-words">Adinkra Symbols & Arts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
          {arts.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 mb-2 break-words">{item.title}</h2>
              <p className="text-gray-700 mb-2 break-words">{item.content}</p>
              {item.examples && (
                <div className="mt-4 overflow-hidden">
                  <h3 className="font-semibold mb-2 break-words">Examples:</h3>
                  {item.examples.map((ex, idx) => (
                    <div key={idx} className="mb-2 p-2 bg-gray-50 rounded overflow-hidden">
                      <div className="font-bold text-lg break-words">{ex.symbol}</div>
                      <div className="text-gray-600 break-words">{ex.meaning}</div>
                      <div className="text-xs text-gray-500 break-words">{ex.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CultureArts;