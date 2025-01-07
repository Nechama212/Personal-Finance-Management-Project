import React from 'react';

const ExpensesSummary: React.FC<{ expenses: Array<any> }> = ({ expenses }) => {
  console.log("Expenses data:", expenses);

  const totalExpenses = expenses.reduce((total, expense) => total + expense.Amount, 0);

  return (
    <div className="expenses-summary">
      <h2>Expenses Summary</h2>
      <p>Total Expenses: {totalExpenses}₪</p>
    </div>
  );
};

export default ExpensesSummary;
