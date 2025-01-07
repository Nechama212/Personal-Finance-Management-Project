import React from 'react';

const IncomesSummary: React.FC<{ incomes: Array<any> }> = ({ incomes }) => {
  console.log("Incomes data:", incomes);

  const totalIncomes = incomes.reduce((total, income) => total + income.Amount, 0);

  return (
    <div className="incomes-summary">
      <h2>Incomes Summary</h2>
      <p>Total Incomes: {totalIncomes}₪</p>
    </div>
  );
};

export default IncomesSummary;
