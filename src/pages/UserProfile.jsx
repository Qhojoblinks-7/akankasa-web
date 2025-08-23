import { useParams } from 'react-router-dom';
import { userProfiles } from '../data/mockData';

const UserProfile = () => {
  const { id } = useParams();
  const user = userProfiles.find(u => String(u.id) === String(id));
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-2xl overflow-x-hidden"><div className="max-w-2xl w-full text-center overflow-hidden"><span className="break-words">User not found</span></div></div>;
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12 overflow-x-hidden">
      <div className="max-w-xl mx-auto px-4 bg-white rounded-lg shadow-lg p-8 overflow-hidden">
        <div className="flex flex-col items-center mb-6 overflow-hidden">
          <div className="w-24 h-24 bg-gradient-to-r from-akan-gold to-akan-red rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 overflow-hidden">
            <span className="break-words">{user.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 break-words">{user.name}</h1>
          <p className="text-gray-600 mb-1 break-words">{user.role}</p>
          <p className="text-gray-500 mb-1 break-words">{user.location}</p>
        </div>
        <div className="mb-4 overflow-hidden">
          <h2 className="font-semibold mb-2 break-words">Specialties</h2>
          <div className="flex flex-wrap gap-2 overflow-hidden">
            {user.specialties.map((s, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs break-words">{s}</span>
            ))}
          </div>
        </div>
        <div className="mb-4 overflow-hidden">
          <h2 className="font-semibold mb-2 break-words">Contributions</h2>
          <div className="text-lg font-bold text-akan-red break-words">{user.contributions}</div>
        </div>
        <div className="mb-4 overflow-hidden">
          <h2 className="font-semibold mb-2 break-words">Joined</h2>
          <div className="text-gray-600 break-words">{new Date(user.joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;