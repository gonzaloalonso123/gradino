"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      const sections = ["home", "about", "menu", "gallery", "contacts"];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section); // Set active section
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Disable scroll when the menu is open
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Close the menu if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 p-4 z-50 transition-all duration-300 ${
        scrolled ? "bg-black backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#home">
            <img src="/path/to/logo.png" alt="Logo" className="h-8 w-auto" />
          </a>
        </div>

        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-8 font-semibold text-white ">
          <li>
            <a
              href="#home"
              className={`hover:text-primary ${
                activeSection === "home" ? "text-primary" : ""
              }`}
            >
              Hem
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`hover:text-primary ${
                activeSection === "about" ? "text-primary" : ""
              }`}
            >
              Om Oss
            </a>
          </li>
          <li>
            <a
              href="#menu"
              className={`hover:text-primary ${
                activeSection === "menu" ? "text-primary" : ""
              }`}
            >
              Meny
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className={`hover:text-primary ${
                activeSection === "gallery" ? "text-primary" : ""
              }`}
            >
              Galleri
            </a>
          </li>
          <li>
            <a
              href="#contacts"
              className={`hover:text-primary ${
                activeSection === "contacts" ? "text-primary" : ""
              }`}
            >
              Kontakt
            </a>
          </li>
        </ul>

        {/* Sidebar for Mobile */}
        <div
          id="sidebar"
          className={`z-50 fixed top-0 right-0 h-screen w-64 bg-black bg-opacity-100 transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out `}
        >
          <button
            className="absolute top-4 right-4 text-white focus:outline-none"
            onClick={handleMenuToggle}
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <ul className="flex flex-col space-y-4 mt-16 ml-8 text-white">
            <li>
              <a href="#home" onClick={() => setMenuOpen(false)}>
                Hem
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                Om Oss
              </a>
            </li>
            <li>
              <a href="#menu" onClick={() => setMenuOpen(false)}>
                Meny
              </a>
            </li>
            <li>
              <a href="#gallery" onClick={() => setMenuOpen(false)}>
                Galleri
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
