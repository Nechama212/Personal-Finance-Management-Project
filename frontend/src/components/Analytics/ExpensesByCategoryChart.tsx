import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpensesByCategoryChart: React.FC<{ expensesByCategory: Array<any> }> = ({ expensesByCategory }) => {
  console.log("Expenses by Category data:", expensesByCategory); 

  const data = {
    labels: expensesByCategory.map(expense => expense.CategoryName),
    datasets: [{
      data: expensesByCategory.map(expense => expense.Amount),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
      ], 
    }],
  };

  return (
    <div className="expenses-by-category-chart">
      <h2>Expenses by Category</h2>
      <Pie data={data} />
    </div>
  );
};

export default ExpensesByCategoryChart;