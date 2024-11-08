import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Aadhar Card Section",
      description: "Parse Aadhar Card data with precision and ease",
      colorClass: "aadhar-card",
      route: "/aadhar",
    },
    {
      title: "PAN Card Section",
      description: "Effortlessly extract PAN details",
      colorClass: "pan-card",
      route: "/pancard",
    },
    {
      title: "Driving License Section",
      description: "Drive efficiency with license parsing",
      colorClass: "license-card",
      route: "/license",
    },
    {
      title: "Passport Section",
      description: "Seamless passport information parsing made simple",
      colorClass: "passport-card",
      route: "/passport",
    },
    {
      title: "Voter ID Section",
      description: "Voter ID parsing proficiency",
      colorClass: "voter-id-card",
      route: "/voter-id",
    },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        Discover a treasure trove of documents waiting to be parsed under this heading!
      </h1>
      <div className="card-container">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`card ${card.colorClass}`}
            onClick={() => navigate(card.route)}
          >
            <h2 className="card-title">{card.title}</h2>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
