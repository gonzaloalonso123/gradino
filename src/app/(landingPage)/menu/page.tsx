"use client";

import { Parallax } from "react-parallax";
import MenuImge from "../assets/menu.jpg";
import CarouselMenu from "../_components/carousel-menu";

export default function Menu() {
  return (
    <section id="menu" className="h-full">
      <Parallax
        bgImage={MenuImge.src}
        bgImageAlt="Meny"
        strength={300}
        bgImageStyle={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
        <div className="py-16 relative text-center text-white px-4 z-10 h-screen flex flex-col items-center justify-between">
          <div>
            <h2 className="text-4xl font-extrabold mb-6 text-primary">
              Upptäck Vår Meny
            </h2>
            <p className="text-xl pb-8">
              Njut av våra kulinariska skapelser, framtagna med passion och
              precision.
            </p>
          </div>
          <CarouselMenu />
          <a
            href="/menus"
            className="inline-block bg-primary text-black py-2 px-6 md:py-3 md:px-8 rounded-sm font-semibold transition duration-300 hover:bg-transparent border-2 border-primary hover:text-primary"
          >
            Ladda ner menyn
          </a>
        </div>
      </Parallax>
    </section>
  );
}
