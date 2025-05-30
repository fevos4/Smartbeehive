import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import "../Styles/Components/Contact.scss";
import logos from "../Assets/logos.png"; 

const Contact = () => {
  return (
    <footer className="contact-footer" id='contact'>
      <div className="container">
        <div className="grid-layout">
          <div className="brand-info">
            <div className="logo-wrapper">
              <img src={logos} alt="Logo" className="logo" />
            </div>
            <p className="description">
              By real-time monitoring of traffic enhance the pollination productivity and number of flights of your bees.
            </p>
          </div>

          <div className="links-section">
            <h3 className="section-title">Links</h3>
            <ul className="links-list">
              <li><a href="#home" className="link">Home</a></li>
              <li><a href="#about" className="link">About</a></li>
              <li><a href="#features" className="link">Features</a></li>
              <li><a href="#impact" className="link">Impact</a></li>
              <li><a href="#team" className="link">Team</a></li>
            </ul>
          </div>

          <div className="contact-info">
            <h3 className="section-title">Contact Us</h3>
            <p className="contact-detail">0987654321</p>
            <p className="contact-detail">smartbeehive@gmail.com</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <FaFacebook />
              </a>
              <a href="#" className="social-link">
                <AiFillInstagram />
              </a>
              <a href="#" className="social-link">
                <FaSquareXTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} SmartBeehive. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Contact;