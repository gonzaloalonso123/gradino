"use client";

import { useState } from "react";
import { Parallax } from "react-parallax";
import HeroImge from "../assets/hero.jpg";
import Modal from "../_components/modal";
import ReservationForm from "../_components/reservation-form";


export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="home" className="min-h-screen">
      <Parallax
        bgImage={HeroImge.src}
        bgImageAlt="Restaurant interior"
        strength={200}
        bgImageStyle={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
          <div className="relative text-center text-white px-4 z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-primary">
              Benvenuti al Gradino
            </h1>
            <p className="text-base md:text-2xl font-medium mb-8">
              Upptäck utsökt matlagning med en touch av elegans.
            </p>
            <button
              onClick={openModal}
              className="inline-block text-lg bg-primary text-black py-2 px-6 md:py-3 md:px-8 rounded-sm font-semibold transition duration-300 hover:bg-transparent border-2 border-primary hover:text-primary"
              aria-label="Boka ditt bord"
            >
              Boka ditt bord
            </button>
          </div>
        </div>
      </Parallax>

      {/* Modal with Reservation Form */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ReservationForm />
      </Modal>
    </section>
  );
}
