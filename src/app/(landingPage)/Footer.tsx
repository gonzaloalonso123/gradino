import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function () {
  return (
    <footer className="bg-white text-black py-12">
      <div className="container mx-auto px-6">
        {/* Logo and Social Icons */}
        <div className="flex justify-between items-start mb-8 w-full">
          <div className="w-1/3">
            {/* Placeholder Text instead of Logo */}
            <div className="text-2xl font-semibold">Your Company Name</div>
          </div>
          {/* Opening Hours Section */}
          <div className="text-center mb-8 w-1/3">
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-lg">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          <div className="space-x-6 w-1/3 flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold mb-4">Follow us!</h3>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition duration-300"
              >
                <FontAwesomeIcon icon={faFacebook} className="h-8" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Your Company Name. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
