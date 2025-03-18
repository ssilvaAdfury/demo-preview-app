"use client";

import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const videos = [
    { id: "D1", src: "/D1.mov", title: "Product Generation" },
    { id: "D2", src: "/D2.mov", title: "Lifestyle Image Customization Window" },
    { id: "D3", src: "/D3.mov", title: "Keyword Generation Preview" },
    { id: "D4", src: "/D4.mov", title: "Headline and Subheading Generation and Customization" },
    { id: "D5", src: "/D5.mov", title: "Background Generation Preview" },
    { id: "D6", src: "/D6.mov", title: "Ad Previews and Customization Window" },
    { id: "D7", src: "/D7.mov", title: "Organization and Generation History Preview" },
  ];

  return (
    <main 
      className={`min-h-screen px-4 py-6 sm:p-8 ${roboto.className} text-white`}
      style={{ 
        background: 'linear-gradient(to bottom, #1a0000, #380505, #701203, #a52019, #db3a00, #ff7700, #ffbf00)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header section */}
      <div className="mb-6 sm:mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>Demo Gallery</h1>
        <h2 className="text-lg sm:text-xl text-white mb-4 sm:mb-6" style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}>
          Click on any video for a demo on individual features:
        </h2>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="relative aspect-video bg-black rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition shadow-xl"
            onClick={() => setSelectedVideo(video.src)}
            style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)' }}
          >
            <video 
              src={video.src}
              className="w-full h-full object-cover"
              controls={false}
              muted
              preload="metadata"
              playsInline
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/30 flex items-center justify-center">
                <div className="w-0 h-0 border-y-6 sm:border-y-8 border-y-transparent border-l-8 sm:border-l-12 border-l-white ml-1"></div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 text-white text-xs sm:text-sm" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}>
              {video.title}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button 
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white z-10 bg-black/50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-black/80"
            onClick={() => setSelectedVideo(null)}
            aria-label="Close video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <video 
            src={selectedVideo} 
            className="w-full h-full object-contain"
            autoPlay 
            controls 
            playsInline
            onEnded={() => setSelectedVideo(null)}
          />
        </div>
      )}
    </main>
  );
}
