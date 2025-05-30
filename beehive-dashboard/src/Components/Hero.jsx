import React from "react";
import { FaBook } from "react-icons/fa";
import "../Styles/Components/Hero.scss";  // Import the global SCSS file
import bggggImage from "../Assets/bgggg.png"; 

const Hero = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="home" className="hero-container">
      {/* Left Text */}
      <div className="left-text">
        <h1>Smart Beehive Monitoring System</h1>

        <p>Harvesting insights from the heartbeat of nature, our beehive monitoring system buzzes with intelligence,
        ensuring the sweet success of both bees and beekeepers alike.</p>

        <button onClick={() => scrollToSection("features")}>Explore</button>

        <a href="assets/User_manual.pdf" className="manual-link" target="_blank" rel="noopener noreferrer">
          <FaBook />
          User manual
        </a>
      </div>

      {/* Right Image */}
      <div className="right-image">
        <img src={bggggImage} alt="Smart Hive" />
      </div>
    </div>
  );
};

export default Hero;
