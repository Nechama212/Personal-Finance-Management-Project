import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpensesByMonthChart: React.FC<{ monthlyExpenses: Array<any> }> = ({ monthlyExpenses }) => {
  console.log("Monthly Expenses data:", monthlyExpenses);

  // Prepare data for the chart
  const data = {
    labels: monthlyExpenses.map(expense => new Date(expense.Date).toLocaleString('he-IL', { month: 'long' })),
    datasets: [{
      data: monthlyExpenses.map(expense => expense.Amount),
      borderColor: '#36A2EB',
      fill: false,
    }],
  };

  console.log("Chart data:", data);

  return (
    <div className="expenses-by-month-chart">
      <h2>Expenses by Month</h2>
      <Line data={data} />
    </div>
  );
};

export default ExpensesByMonthChart;
