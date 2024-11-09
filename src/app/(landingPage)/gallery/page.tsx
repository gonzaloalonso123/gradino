"use client";

import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const Gallery: React.FC = () => {
  // 10 Placeholder images using Lorem Picsum
  const slides = [
    "https://picsum.photos/800/400?random=1",
    "https://picsum.photos/800/400?random=2",
    "https://picsum.photos/800/400?random=3",
    "https://picsum.photos/800/400?random=4",
    "https://picsum.photos/800/400?random=5",
    "https://picsum.photos/800/400?random=6",
    "https://picsum.photos/800/400?random=7",
    "https://picsum.photos/800/400?random=8",
    "https://picsum.photos/800/400?random=9",
    "https://picsum.photos/800/400?random=10",
  ];

  // Embla carousel setup with autoplay enabled on initialization and looping for the first carousel
  const [emblaRef] = useEmblaCarousel(
    { loop: true }, // Infinite loop enabled
    [AutoScroll({ playOnInit: true, speed: 1 })]
  );

  // Embla carousel setup for the second carousel (opposite direction)
  const [emblaRef2] = useEmblaCarousel(
    { loop: true }, // Infinite loop enabled
    [AutoScroll({ playOnInit: true, speed: 2 })]
  );

  return (
    <section id="gallery" className="pb-1 ">
      {/* First Carousel - Default Direction (Left to Right) */}
      <h2 className="text-4xl font-bold   pt-6 pb-6 text-center">Galleri</h2>
      <p className="text-xl text-gray-800  text-center pb-8">
        Utforska vårt galleri för att få en smak av vår restaurang. Här kan du
        se våra läckra rätter och den inbjudande atmosfären vi erbjuder.
      </p>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((src, index) => (
              <div className="embla__slide" key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="embla__image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Carousel - Opposite Direction (Right to Left) */}
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef2}>
          <div className="embla__container">
            {slides.map((src, index) => (
              <div className="embla__slide" key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="embla__image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
