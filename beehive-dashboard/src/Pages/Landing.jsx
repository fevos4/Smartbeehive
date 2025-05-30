import React from "react";
import Navbar from "../Components/Navbar";
import Setup from "../Components/Setup";
import Impact from "../Components/Impact";
import Team from "../Components/Team";
import Hero from "../Components/Hero";
import About from "../Components/About";
import Features from "../Components/Features";
import Contact from "../Components/Contact";
//import Banner from "../Assets/Banner.png";
//import Hexagon from "../Assets/Hexagon-Design.png";
//import { Link } from 'react-router-dom';
import '../Styles/Pages/Landing.scss';

function Landing() {
  return (
    <div className="landing-container">
      <Navbar />
      <Hero />
      <About />
      <Features />

      {/*<div className="banner-container">
        <img src={Banner} alt="Banner" className="banner-image" />
        <div className="color-overlay"></div>
      </div>

      <div className="hexagon-design">
        <img src={Hexagon} alt="Hexagon Design" />
      </div>

      <div className="content-container">
        <h3>Monitoring Hives, Nurturing Lives.</h3>
        <p>
          Harvesting insights from the heartbeat of nature, our beehive monitoring system buzzes with intelligence,
          ensuring the sweet success of both bees and beekeepers alike.
        </p>
        <Link to="/signin" className="learn-more">SIGN IN</Link>
      </div>*/}

      <Setup />
      <Impact />
      <Team />
      <Contact />
    </div>
  );
}

export default Landing;
