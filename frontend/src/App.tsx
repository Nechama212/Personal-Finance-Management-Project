import React from 'react';
import Transactions from './components/Transactions/Transactions'; // Path to your Transactions component
import MonthlyBudget from './components/MonthlyBudget/MonthlyBudget'; // Path to your MonthlyBudget component

const App = () => {
  return (
    <div className="container">
      <h1>Finance Management</h1>
      <Transactions /> {/* Rendering Transactions component */}
      <MonthlyBudget /> {/* Rendering MonthlyBudget component */}
    </div>
  );
};

export default App;
