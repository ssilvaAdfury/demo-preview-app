"use client";

import { useState } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
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
    <main className={`min-h-screen p-8 ${roboto.className}`}>
      {/* Header section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">Video Gallery</h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-300">
          Click on any video to play in fullscreen mode
        </h2>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="relative aspect-video bg-black rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition"
            onClick={() => setSelectedVideo(video.src)}
          >
            <video 
              src={video.src}
              className="w-full h-full object-cover"
              controls={false}
              muted
              preload="metadata"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center">
                <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 text-white text-sm">
              {video.title}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button 
            className="absolute top-4 right-4 text-white z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80"
            onClick={() => setSelectedVideo(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <video 
            src={selectedVideo} 
            className="w-full h-full object-contain"
            autoPlay 
            controls 
            onEnded={() => setSelectedVideo(null)}
          />
        </div>
      )}
    </main>
  );
}
