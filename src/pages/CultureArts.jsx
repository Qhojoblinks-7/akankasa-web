import { cultureData } from '../data/mockData';

const CultureArts = () => {
  const arts = cultureData.arts || [];
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-akan-red mb-8">Adinkra Symbols & Arts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {arts.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-gray-700 mb-2">{item.content}</p>
              {item.examples && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Examples:</h3>
                  {item.examples.map((ex, idx) => (
                    <div key={idx} className="mb-2 p-2 bg-gray-50 rounded">
                      <div className="font-bold text-lg">{ex.symbol}</div>
                      <div className="text-gray-600">{ex.meaning}</div>
                      <div className="text-xs text-gray-500">{ex.description}</div>
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