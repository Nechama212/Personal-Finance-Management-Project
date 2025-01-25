import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/login';
import Signup from './components/Login/signup';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions/Transactions';
import MonthlyBudget from './components/MonthlyBudget/MonthlyBudget';
import Analytics from './components/Analytics/Analytics';
import VerificationSuccess from './components/VerificationSuccess';
import { UserProvider } from './context/UserContext'; // Import UserContext
import './styles.css';

const App: React.FC = () => {
  // Function to check if the user is authenticated
  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('authToken'); // Check if a token exists
  };

  return (
    <UserProvider>
      <Router>
        <div className="container">
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Login and Signup routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/transactions"
              element={isAuthenticated() ? <Transactions /> : <Navigate to="/login" />}
            />
            <Route
              path="/monthly-budget"
              element={isAuthenticated() ? <MonthlyBudget /> : <Navigate to="/login" />}
            />
            <Route
              path="/analytics"
              element={isAuthenticated() ? <Analytics /> : <Navigate to="/login" />}
            />

            {/* Email verification route */}
            <Route path="/verify-email/success" element={<VerificationSuccess />} />

            {/* Redirect all unknown paths to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
