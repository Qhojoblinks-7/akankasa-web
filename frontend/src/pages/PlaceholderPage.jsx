import { Link } from 'react-router-dom';

const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-8">
    <h1 className="text-4xl font-bold text-akan-red mb-4">{title}</h1>
    <p className="text-lg text-gray-700 mb-8">This is a demo placeholder page. All functionality will be available in the full version.</p>
    <Link to="/" className="bg-akan-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">Back to Home</Link>
  </div>
);

export default PlaceholderPage;