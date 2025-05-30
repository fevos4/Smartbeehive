import React from 'react';

import '../Styles/Components/About.scss'
import ab from "../Assets/ab.jpg"; 

const About = () => {
    return (
        <div className="about-container" id='about'>
            <div className="about-content">
                <div className="about-text">
                    <h2 className="about-title">Introduction</h2>
                    <p className="about-description">
                        Smart Hive is an advanced smart beehive monitoring system designed to help beekeepers effortlessly track and maintain hive health. Our platform provides real-time data on temperature, humidity, hive weight, and activity, allowing for early detection of potential issues and enhanced hive management. With Smart Hive, beekeepers gain valuable insights that support bee health and productivity, promoting a more sustainable and successful apiary.
                    </p>
                </div>

                <div className="about-image">
                <img src={ab} alt="Smart Hive" />
                </div>
            </div>
        </div>
    );
};

export default About;