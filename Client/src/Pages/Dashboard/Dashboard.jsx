import React , {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token)navigate('/');
    })

  const cardData = [
    {
      title: "Aadhar Card Section",
      description: "Parse Aadhar Card data with precision and ease",
      colorClass: "aadhar-card",
      route: "/adhar",
    },
    {
      title: "PAN Card Section",
      description: "Effortlessly extract PAN details",
      colorClass: "pan-card",
      route: "/pancard",
    },
    {
      title: "Passport Section",
      description: "Seamless passport information parsing made simple",
      colorClass: "passport-card",
      route: "/passport",
    },
    {
      title: "Vehicle Registration",
      description: "Vehicle Registration proficiency",
      colorClass: "voter-id-card",
      route: "/vehicle",
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
