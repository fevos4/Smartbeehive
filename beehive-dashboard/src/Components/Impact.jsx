import React from 'react';
import { FaCheckSquare } from 'react-icons/fa';
import "../Styles/Components/Impact.scss";

const impacts = [
  {
    title: 'Early Detection of Abscondment',
    points: [
      'The system enables early identification of abscondment events.',
      'Beekeepers receive immediate alerts, allowing them to take proactive measures to address the issue.',
    ],
  },
  {
    title: 'Efficiency and Sustainability',
    points: [
      'By automating monitoring processes, the system streamlines beekeeping operations.',
      'Timely alerts and actionable insights empower beekeepers to make informed decisions, promoting the overall health and sustainability of their colonies.',
    ],
  },
  {
    title: 'Data-driven Insights',
    points: [
      'The collected data provides valuable insights into hive dynamics, contributing to a better understanding of bee behavior and environmental factors affecting bee colonies.',
    ],
  },
  {
    title: 'Swift Identification of Feeding Irregularities',
    points: [
      'Anomalies in feeding patterns are detected through AI analysis.',
      'Beekeepers can intervene promptly, ensuring the health and well-being of the bee colony.',
    ],
  },
];

const ImpactCard = ({ title, points }) => (
  <div className="impact-card">
    <h3>{title}</h3>
    <ul>
      {points.map((point, index) => (
        <li key={index}>
          <FaCheckSquare className="icon" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Impact = () => {
  return (
    <section className="impact-section" id="impact">
      <h2>Impact</h2>
      <div className="impact-grid">
        {impacts.map((impact, index) => (
          <ImpactCard key={index} {...impact} />
        ))}
      </div>
    </section>
  );
};

export default Impact;
