import React, { useEffect, useRef, useState } from 'react';
import { Heart, Bookmark, ChevronLeft, ChevronRight, Linkedin, Github, Instagram, Mail } from 'lucide-react';

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [userLikes, setUserLikes] = useState<{ [key: number]: boolean }>({});

  // Gallery images with more variety for better layout
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      title: "Circuit Dreams",
      category: "Technology"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
      title: "Digital Matrix",
      category: "Cyberpunk"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      title: "Code Terminal",
      category: "Programming"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop",
      title: "Stellar Network",
      category: "Space"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop",
      title: "Neural Pathways",
      category: "Abstract"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=800&h=600&fit=crop",
      title: "Architecture Flow",
      category: "Design"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=800&h=600&fit=crop",
      title: "Urban Geometry",
      category: "Architecture"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      title: "Data Streams",
      category: "Technology"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      title: "Digital Horizon",
      category: "Space"
    }
  ];

  // Initialize user likes
  useEffect(() => {
    const initialUserLikes: { [key: number]: boolean } = {};
    images.forEach(image => {
      initialUserLikes[image.id] = false;
    });
    setUserLikes(initialUserLikes);
  }, []);

  const handleLike = (imageId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserLikes(prev => ({
      ...prev,
      [imageId]: !prev[imageId]
    }));
  };

  const openSlideshow = (imageId: number) => {
    const index = images.findIndex(img => img.id === imageId);
    setCurrentSlideIndex(index);
    setSelectedImage(imageId);
  };

  const nextSlide = () => {
    const nextIndex = (currentSlideIndex + 1) % images.length;
    setCurrentSlideIndex(nextIndex);
    setSelectedImage(images[nextIndex].id);
  };

  const prevSlide = () => {
    const prevIndex = currentSlideIndex === 0 ? images.length - 1 : currentSlideIndex - 1;
    setCurrentSlideIndex(prevIndex);
    setSelectedImage(images[prevIndex].id);
  };

  // Particle animation effect with new color scheme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 127, 255, ${particle.opacity})`;
        ctx.fill();

        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 127, 255, ${0.2 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative" style={{ backgroundColor: '#0C1C3D' }}>
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-blue-800/20 z-10 pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 p-8 text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent mb-4 animate-pulse font-sans">
          MILESTONE-MOMENTS
        </h1>
        <p className="text-xl text-gray-300 opacity-80 font-sans">
          Capture • Share • Celebrate
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-4 rounded-full animate-pulse" />
      </header>

      {/* Gallery Grid - Updated to 3 columns */}
      <main className="relative z-20 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 animate-fadeInUp cursor-pointer"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => openSlideshow(image.id)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Scan Line Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000" />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-blue-400 font-mono font-semibold">
                    {image.category}
                  </span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 font-sans">
                  {image.title}
                </h3>
                
                {/* Like Button */}
                <div className="mt-3 flex items-center justify-between">
                  <button
                    onClick={(e) => handleLike(image.id, e)}
                    className="flex items-center space-x-2 transition-all duration-200 hover:scale-110"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors duration-200 ${
                        userLikes[image.id] 
                          ? 'text-red-500 fill-red-500' 
                          : 'text-gray-400 hover:text-red-400'
                      }`}
                    />
                  </button>
                  <div className="text-xs text-blue-400 font-mono flex items-center space-x-1">
                    <Bookmark className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-400/5 to-blue-600/5 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Image Slideshow Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Current Image */}
            <img
              src={images[currentSlideIndex]?.src}
              alt={images[currentSlideIndex]?.title}
              className="max-w-full max-h-full object-contain rounded-xl border border-blue-500/30 shadow-2xl shadow-blue-500/20 transition-transform duration-300"
            />
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors duration-200"
            >
              ×
            </button>
            
            {/* Image Info */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
              <h3 className="text-white font-semibold">{images[currentSlideIndex]?.title}</h3>
              <p className="text-blue-400 text-sm">{images[currentSlideIndex]?.category}</p>
            </div>

            {/* Slide Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-white text-sm">
                {currentSlideIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-20 mt-16 border-t border-blue-500/20 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
              Let's Connect!
            </h3>
            <p className="text-gray-300">Follow me on various platforms</p>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-600/20 hover:bg-blue-600/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <Linkedin className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
            </a>
            
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-600/20 hover:bg-gray-600/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <Github className="w-6 h-6 text-gray-400 group-hover:text-gray-300" />
            </a>
            
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-pink-600/20 hover:bg-pink-600/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <Instagram className="w-6 h-6 text-pink-400 group-hover:text-pink-300" />
            </a>
            
            <a
              href="https://leetcode.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-orange-600/20 hover:bg-orange-600/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <div className="w-6 h-6 text-orange-400 group-hover:text-orange-300 font-bold text-sm flex items-center justify-center">
                LC
              </div>
            </a>
            
            <a
              href="https://hackerrank.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-green-600/20 hover:bg-green-600/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <div className="w-6 h-6 text-green-400 group-hover:text-green-300 font-bold text-sm flex items-center justify-center">
                HR
              </div>
            </a>
            
            <a
              href="mailto:your.email@example.com"
              className="w-12 h-12 bg-red-600/20 hover:bg-red-600/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <Mail className="w-6 h-6 text-red-400 group-hover:text-red-300" />
            </a>
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-blue-500/10">
            <p className="text-gray-400 text-sm">
              © 2024 Milestone-Moments. Crafted with passion and code.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <div className="fixed top-20 right-8 z-30 space-y-4">
        <div className="w-12 h-12 border border-blue-400/30 rounded-lg backdrop-blur-sm bg-black/20 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
        </div>
        <div className="w-12 h-12 border border-blue-500/30 rounded-lg backdrop-blur-sm bg-black/20 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Index;
