import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

  return (
    <div
      className="relative h-dvh w-full flex flex-col items-center px-4 sm:px-6 text-center bg-[url('/src/assets/hero.jpg')] bg-cover bg-center overflow-hidden"
    >
  {/* Overlay */}
  <div className="absolute inset-0 backdrop-blur-md bg-black/40" />
      <div className="my-auto flex flex-col items-center">
      {/* Intro Banner */}
      <div className="flex flex-wrap z-30 items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5 border border-gray-300 rounded-full bg-white/90 backdrop-blur-sm pl-5 sm:pl-8 p-2 sm:p-2.5 text-sm sm:text-base lg:text-lg text-gray-700 shadow-lg">
         <p className="font-medium">Discover the Akan Language and Culture</p>
         <Link to="/learn-home-page" className="flex items-center cursor-pointer gap-2 sm:gap-3 bg-white border border-gray-300 rounded-2xl px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 whitespace-nowrap hover:bg-gray-100 hover:shadow-md transition-all duration-200 text-sm sm:text-base lg:text-base">
           <span className="font-medium">Start Learning</span>
           <svg width="16" height="12" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
           </svg>
         </Link>
       </div>

       {/* Main Heading */}
       <h1 className="text-3xl z-30 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold max-w-4xl text-white drop-shadow-lg leading-tight">
         Unlocking the Richness of Akan Language, Culture, and Heritage
       </h1>

       {/* Description */}
        <p className="max-w-2xl z-30 text-center mt-3 sm:mt-4 px-2 sm:px-4 text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
         Explore the beauty of the Akan language, delve into vibrant cultural traditions, and connect with a rich heritage. Your journey into the heart of Akan starts here.
       </p>

       {/* Action Buttons */}
        <div className="flex z-30 flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-4 sm:pt-5">
         <Link to="/learn-home-page" className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 rounded-xl bg-[#f59e0b] hover:bg-[#ca8a04] text-gray-900 font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base sm:text-lg text-center">
           Get Started
         </Link>
         <button
           className="group w-full sm:w-auto px-8 sm:px-10 py-3 flex items-center justify-center gap-2 font-medium text-white hover:text-[#f59e0b] transition-all duration-200 text-base sm:text-lg"
           onClick={scrollToAbout}
         >
           Learn More
           <svg className="transform group-hover:translate-x-1 pt-0.5 transition-transform" width="14" height="10" viewBox="0 0 12 9"
             fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
           </svg>
          </button>
         </div>
       </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/70 sm:w-7 sm:h-7">
           <path d="M12 5v14m-7-7l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
        </div>

     </div>
   );
}

export default HeroSection;
