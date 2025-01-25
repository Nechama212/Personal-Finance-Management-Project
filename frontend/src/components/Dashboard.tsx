import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Add custom CSS for styling

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { title: 'Transactions', route: '/transactions' },
    { title: 'Monthly Budget', route: '/monthly-budget' },
    { title: 'Analytics', route: '/analytics' },
  ];

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <div className="feature-grid">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="feature-card"
            onClick={() => navigate(feature.route)}
          >
            <h2>{feature.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;