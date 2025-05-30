import React from "react";
import "../Styles/Components/Setup.scss";
import setup from "../Assets/setup.png"; 

const Setup = () => {
  return (
    <div className="setup-section">
      <div className="setup-container">
        <h1 className="setup-title">
          Smart Hive <span className="highlight">Setup</span>
        </h1>
        <p className="setup-description">
          The sensors are integrated with the Beehive monitoring device and monitor different
          parameters like weight, temperature, humidity, etc. If there is any declination in the
          honeybee count or sudden changes in the weight, temperature, and humidity conditions
          instant notifications will be sent to the apiarists through our web app.
        </p>

        <div className="setup-image-wrapper">
          <div className="setup-image-container">
            <img
              src={setup}
              alt="Smart Hive Web App"
              className="setup-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
