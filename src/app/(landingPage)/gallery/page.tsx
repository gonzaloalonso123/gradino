import React from "react";

export default function Gallery() {
  return (
    <div className="overflow-hidden py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Galleri</h1>{" "}
      {/* Updated to Swedish */}
      <p className="text-center text-lg mb-8">
        Upptäck vårt fantastiska galleri med bilder som inspirerar och berättar
        en historia. Bläddra igenom och låt dig inspireras!
      </p>
      <div className="space-y-8">
        {/* First Row (Right to Left) */}
        <div className="flex animate-scroll-left space-x-4">
          {/* Duplicate images at the beginning and end for a seamless loop */}
          {Array.from({ length: 10 }).map((_, index) => (
            <img
              key={index}
              src={`https://picsum.photos/500/300?random=${index + 1}`} // Different aspect ratio
              alt={`Gallery image ${index + 1}`}
              className="w-80 object-cover rounded-sm shadow-md" // Adjust width and remove fixed height
            />
          ))}
          {/* Images for the second half (to complete the infinite effect) */}
          {Array.from({ length: 10 }).map((_, index) => (
            <img
              key={index + 10}
              src={`https://picsum.photos/500/300?random=${index + 11}`} // Different aspect ratio
              alt={`Gallery image ${index + 11}`}
              className="w-80 object-cover rounded-sm shadow-md" // Adjust width and remove fixed height
            />
          ))}
        </div>

        {/* Second Row (Right to Left) */}
        <div className="flex animate-scroll-left-fast space-x-4">
          {/* Duplicate images at the beginning and end for seamless loop */}
          {Array.from({ length: 10 }).map((_, index) => (
            <img
              key={index}
              src={`https://picsum.photos/500/300?random=${index + 20}`} // Different aspect ratio
              alt={`Gallery image ${index + 1}`}
              className="w-80 object-cover rounded-sm shadow-md" // Adjust width and remove fixed height
            />
          ))}
          {/* Images for the second half (to complete the infinite effect) */}
          {Array.from({ length: 10 }).map((_, index) => (
            <img
              key={index + 10}
              src={`https://picsum.photos/500/300?random=${index + 20}`} // Different aspect ratio
              alt={`Gallery image ${index + 31}`}
              className="w-80 object-cover rounded-sm shadow-md" // Adjust width and remove fixed height
            />
          ))}
        </div>
      </div>
    </div>
  );
}
