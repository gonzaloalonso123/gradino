"use client";

import React from "react";
import { Parallax } from "react-parallax";
import ContactBgImage from "../assets/menu.jpg"; // Replace with your contact background image path

export default function Contact() {
  return (
    <section id="contact" className="h-full">
      <Parallax
        bgImage={ContactBgImage.src}
        bgImageAlt="Contact Background"
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
              Kontakta Oss
            </h2>
            <p className="text-lg pb-8">
              Vi är här för att hjälpa dig! Kontakta oss för frågor eller mer
              information.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 text-xl">
            <ul>
              <li>
                <strong>Adress:</strong> Storgatan 123, Uppsala, Sverige
              </li>
              <li>
                <strong>Telefon:</strong> +46 123 456 789
              </li>
              <li>
                <strong>E-post:</strong> info@nordicpro.se
              </li>
            </ul>
          </div>

          {/* Google Map Section */}
          <div className="relative w-3/5 h-64 mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.827915255329!2d17.64038731583253!3d59.858567280846634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f83fcf3fc5535%3A0xc415831c760ada60!2sUppsala%2C%20Sweden!5e0!3m2!1sen!2sus!4v1696583523758!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-sm"
            ></iframe>
          </div>

          {/* Call to Action */}
          <a
            href="mailto:info@nordicpro.se"
            className="inline-block bg-primary text-black py-2 px-6 md:py-3 md:px-8 rounded-sm font-semibold transition duration-300 hover:bg-transparent border-2 border-primary hover:text-primary"
          >
            Skicka ett meddelande
          </a>
        </div>
      </Parallax>
    </section>
  );
}
