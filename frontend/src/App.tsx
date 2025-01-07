import React from 'react';
import Transactions from './components/Transactions/Transactions'; // Path to your Transactions component
import MonthlyBudget from './components/MonthlyBudget/MonthlyBudget'; // Path to your MonthlyBudget component
import Analytics from './components/Analytics/Analytics'; 
const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Finance Management</h1>
      <Transactions />  
      <MonthlyBudget />
      <Analytics />
    </div>
  ); 
  
  
};

export default App;
