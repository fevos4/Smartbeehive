import React from 'react';
import { MdMonitor, MdAnalytics, MdSensors, MdFavorite } from 'react-icons/md';
import { FaCheckSquare } from 'react-icons/fa';
import "../Styles/Components/Features.scss";

const features = [
  {
    icon: <MdMonitor className="feature-icon" />,
    title: 'Real-time Monitoring',
    points: [
      'The system continuously monitors hive conditions in real-time.',
      'Cameras capture live footage, allowing beekeepers to observe the hive remotely.',
    ],
  },
  {
    icon: <MdAnalytics className="feature-icon" />,
    title: 'Historical Analysis',
    points: [
      'Data collected over time enables historical analysis.',
      'Trends and patterns are identified, aiding in understanding the long-term health of the bee colony.',
    ],
  },
  {
    icon: <MdSensors className="feature-icon" />,
    title: 'Sensor Suite',
    points: [
      'Smart sensors measure various parameters such as temperature, humidity, and bee activity.',
      'These sensors provide detailed insights into the hive environment.',
    ],
  },
  {
    icon: <MdFavorite className="feature-icon" />,
    title: 'User-friendly Interface',
    points: [
      'The system offers a user-friendly interface accessible via a web application.',
      'Beekeepers can receive alerts, view real-time data, and access historical information effortlessly.',
    ],
  },
];

const FeatureCard = ({ icon, title, points }) => (
  <div className="feature-card">
    {icon}
    <h3 className="feature-title">{title}</h3>
    <ul className="feature-points">
      {points.map((point, index) => (
        <li key={index} className="feature-point">
          <FaCheckSquare className="check-icon" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Features = () => {
  return (
    <section className="features-section" id='features'>
      <h2 className="section-title">Key Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;