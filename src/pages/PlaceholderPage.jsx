import { Link } from 'react-router-dom';

const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-8 overflow-x-hidden">
    <div className="max-w-2xl w-full overflow-hidden">
      <h1 className="text-4xl font-bold text-akan-red mb-4 break-words">{title}</h1>
      <p className="text-lg text-gray-700 mb-8 break-words">This is a demo placeholder page. All functionality will be available in the full version.</p>
      <Link to="/" className="bg-akan-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors break-words min-h-[44px] inline-flex items-center justify-center">Back to Home</Link>
    </div>
  </div>
);

export default PlaceholderPage;