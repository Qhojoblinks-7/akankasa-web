import { useState } from 'react';

const Contribute = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div className="min-h-screen py-12 flex flex-col items-center" style={{background: '#FDF6EC'}}>
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6" style={{color: '#C19A6B', fontFamily: 'Georama, sans-serif'}}>Contribute Content</h1>
        {submitted ? (
          <div className="text-lg font-semibold text-center" style={{color: '#3B7A57'}}>Thank you for your contribution! (Demo only)</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Your Name</label>
              <input type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Content Title</label>
              <input type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Content Description</label>
              <textarea className="w-full border rounded px-3 py-2" rows={4} required />
            </div>
            <button type="submit" className="w-full px-6 py-2 rounded-lg font-semibold transition-colors" style={{backgroundColor: '#C19A6B', color: '#1C1C1C'}} onMouseEnter={(e)=> e.currentTarget.style.backgroundColor = '#a98253'} onMouseLeave={(e)=> e.currentTarget.style.backgroundColor = '#C19A6B'}>Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contribute;