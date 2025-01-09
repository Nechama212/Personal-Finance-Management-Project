import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,  // Added Bar Element for Bar Chart
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,  // Register Bar Element for Bar Chart
  Title,
  Tooltip,
  Legend
);

const ExpensesByMonthChart: React.FC<{ monthlyExpenses: Array<any> }> = ({ monthlyExpenses }) => {
  console.log("Monthly Expenses data:", monthlyExpenses);

  // Extract unique months and their corresponding expense amounts
  const monthsData = monthlyExpenses.reduce((acc: any, expense) => {
    const month = new Date(expense.Date).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += expense.Amount;
    return acc;
  }, {});

  // Prepare labels and data for the Bar chart
  const labels = Object.keys(monthsData);  // Unique months
  const data = {
    labels: labels,  // Month names in English (unique months)
    datasets: [{
      label: 'Expenses Amount',  // Label for the chart
      data: labels.map(month => monthsData[month]),  // Total expense amount for each unique month
      backgroundColor: '#36A2EB',  // Color for the bars
      borderColor: '#36A2EB',  // Border color for the bars
      borderWidth: 1,  // Border width for the bars
    }],
  };

  console.log("Chart data:", data);

  return (
    <div className="expenses-by-month-chart">
      <h2>Expenses by Month</h2>
      <Bar data={data} /> {/* Render Bar Chart */}
    </div>
  );
};

export default ExpensesByMonthChart;