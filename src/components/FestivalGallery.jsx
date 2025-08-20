import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Grid, Maximize2, Download, Share2, Heart } from 'lucide-react';

const FestivalGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [likedImages, setLikedImages] = useState(new Set());

  // Mock festival photos data
  const festivalPhotos = [
    {
      id: 1,
      title: "Akwasidae Festival",
      description: "Traditional drumming ceremony at the Manhyia Palace",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      category: "festival",
      location: "Kumasi, Ashanti Region",
      date: "2024-01-21",
      photographer: "Kwame Asante",
      tags: ["drumming", "traditional", "palace"]
    },
    {
      id: 2,
      title: "Kundum Festival",
      description: "Colorful traditional dancers in elaborate costumes",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      category: "dance",
      location: "Axim, Western Region",
      date: "2024-08-15",
      photographer: "Ama Boateng",
      tags: ["dance", "costumes", "celebration"]
    },
    {
      id: 3,
      title: "Homowo Festival",
      description: "Traditional priests performing rituals",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      category: "ritual",
      location: "Accra, Greater Accra",
      date: "2024-08-12",
      photographer: "Kofi Mensah",
      tags: ["ritual", "priests", "ceremony"]
    },
    {
      id: 4,
      title: "Aboakyir Festival",
      description: "Youth carrying ceremonial stools",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      category: "procession",
      location: "Winneba, Central Region",
      date: "2024-05-25",
      photographer: "Adwoa Darko",
      tags: ["procession", "youth", "stools"]
    },
    {
      id: 5,
      title: "Fetu Afahye",
      description: "Traditional warriors in battle regalia",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      category: "warriors",
      location: "Cape Coast, Central Region",
      date: "2024-09-01",
      photographer: "Yaw Osei",
      tags: ["warriors", "regalia", "tradition"]
    },
    {
      id: 6,
      title: "Odwira Festival",
      description: "Chiefs in traditional kente cloth",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      category: "chiefs",
      location: "Akropong, Eastern Region",
      date: "2024-09-27",
      photographer: "Efua Takyi",
      tags: ["chiefs", "kente", "royalty"]
    },
    {
      id: 7,
      title: "Damba Festival",
      description: "Horse riders during the grand durbar",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      category: "durbar",
      location: "Tamale, Northern Region",
      date: "2024-10-15",
      photographer: "Ibrahim Mohammed",
      tags: ["horses", "durbar", "celebration"]
    },
    {
      id: 8,
      title: "Asafotufiam",
      description: "Musket firing demonstration",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      category: "demonstration",
      location: "Ada, Greater Accra",
      date: "2024-08-04",
      photographer: "Kwesi Arthur",
      tags: ["muskets", "demonstration", "history"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Photos', count: festivalPhotos.length },
    { id: 'festival', name: 'Festivals', count: festivalPhotos.filter(p => p.category === 'festival').length },
    { id: 'dance', name: 'Dance', count: festivalPhotos.filter(p => p.category === 'dance').length },
    { id: 'ritual', name: 'Rituals', count: festivalPhotos.filter(p => p.category === 'ritual').length },
    { id: 'procession', name: 'Processions', count: festivalPhotos.filter(p => p.category === 'procession').length },
    { id: 'chiefs', name: 'Chiefs & Royalty', count: festivalPhotos.filter(p => p.category === 'chiefs').length },
  ];

  const filteredPhotos = filter === 'all' 
    ? festivalPhotos 
    : festivalPhotos.filter(photo => photo.category === filter);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(filteredPhotos[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % filteredPhotos.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredPhotos[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredPhotos[newIndex]);
  };

  const toggleLike = (imageId) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const handleKeyDown = (e) => {
    if (!selectedImage) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-akan-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading festival gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-akan-gold to-akan-red text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Festival Photos</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Explore vibrant cultural celebrations through stunning photography from across Ghana
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  filter === category.id
                    ? 'border-akan-gold text-akan-gold'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                  <p className="text-sm opacity-90">{photo.location}</p>
                </div>
                
                {/* Action buttons */}
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(photo.id);
                    }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedImages.has(photo.id) ? 'fill-red-500 text-red-500' : 'text-white'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-6xl max-h-screen p-4">
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            
            <div className="mt-4 text-white">
              <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
              <p className="text-lg mb-2">{selectedImage.description}</p>
              <div className="flex items-center space-x-4 text-sm opacity-75">
                <span>{selectedImage.location}</span>
                <span>•</span>
                <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>By {selectedImage.photographer}</span>
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                {selectedImage.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/20 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4 mt-6">
                <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => toggleLike(selectedImage.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedImages.has(selectedImage.id) ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                  <span>Like</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FestivalGallery;
