import React from 'react';
import "../Styles/Components/Team.scss";
import team from "../Assets/team.jpeg"; 

const teamMembers = [
  { name: 'Petros Lakew', image: "../Assets/team.jpeg" },
  { name: 'Samantha Casale', image: "../Assets/team.jpeg" },
  { name: 'Feven Tesfaye', image: "../Assets/team.jpeg" },
];

const teamMember = [
  { name2: 'Feven Mesfin', image2: "../Assets/team.jpeg" },
  { name2: 'Eyerusalem Bahiru', image2: "../Assets/team.jpeg" },
];

const Team = () => {
  return (
    <div className="team-section" id="team">
      <h2 className="team-title">Meet Our Team</h2>

      <div className="team-grid">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="team-card">
            <div className="hex-wrapper">
              <div className="clip-hexagon">
                <img src={member.image} alt={member.name} />
              </div>
            </div>
            <p className="team-name">{member.name}</p>
          </div>
        ))}
      </div>

      <div className="team-grid secondary">
        {teamMember.map((member2, idx) => (
          <div key={idx} className="team-card">
            <div className="hex-wrapper">
              <div className="clip-hexagon">
                <img src={member2.image2} alt={member2.name2} />
              </div>
            </div>
            <p className="team-name">{member2.name2}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
