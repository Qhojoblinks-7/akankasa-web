import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function HeroSection() {

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[url('/src/assets/hero.jpg')] bg-cover bg-center"
    >
  {/* Overlay */}
  <div className="absolute inset-0 backdrop-blur-md bg-black/40" />
      {/* Intro Banner */}
      <div className="flex flex-wrap z-30 mt-10 items-center justify-center gap-2.5 mb-6 border border-gray-300 rounded-full bg-white/90 backdrop-blur-sm pl-4 p-1 text-sm text-gray-700 max-w-full shadow-lg">
         <p>Discover the Akan Language and Culture</p>
         <Link to="/learn-home-page" className="flex items-center cursor-pointer gap-2 bg-white border border-gray-300 rounded-2xl px-3 py-1 whitespace-nowrap hover:bg-gray-100 hover:shadow-md transition-all duration-200">
           <span>Start Learning</span>
           <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
           </svg>
         </Link>
       </div>

       {/* Main Heading */}
       <h1 className="text-3xl z-30 sm:text-4xl md:text-6xl font-bold max-w-3xl text-white drop-shadow-lg">
         Unlocking the Richness of Akan Language, Culture, and Heritage
       </h1>

       {/* Description */}
       <p className="max-w-xl z-30 text-center mt-6 px-4 text-white/90 text-lg">
         Explore the beauty of the Akan language, delve into vibrant cultural traditions, and connect with a rich heritage. Your journey into the heart of Akan starts here.
       </p>

       {/* Action Buttons */}
       <div className="flex z-30 flex-col sm:flex-row items-center justify-center gap-4 pt-6">
         <Link to="/learn-home-page" className="px-7 py-3 rounded-xl bg-[#f59e0b] hover:bg-[#ca8a04] text-gray-900 font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
           Get Started
         </Link>
         <button
           className="group px-7 py-2.5 flex items-center gap-2 font-medium text-white hover:text-[#f59e0b] transition-all duration-200"
           onClick={scrollToAbout}
         >
           Learn More
           <svg className="transform group-hover:translate-x-1 pt-0.5 transition-transform" width="12" height="9" viewBox="0 0 12 9"
             fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
           </svg>
         </button>
       </div>

       {/* Scroll Indicator */}
       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/70">
           <path d="M12 5v14m-7-7l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
       </div>

    </div>
  );
}

export default HeroSection;