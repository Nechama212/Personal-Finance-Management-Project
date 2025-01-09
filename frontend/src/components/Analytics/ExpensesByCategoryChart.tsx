import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Define props interface for the component
interface Props {
  expensesByCategory: Array<{
    CategoryName: string;
    Amount: number;
  }>;
}

// Functional component for Pie Chart visualization
const ExpensesByCategoryChart: React.FC<Props> = ({ expensesByCategory }) => {
  console.log('Expenses by Category data:', expensesByCategory); // Debugging log

  // Combine categories with the same name by summing their amounts
  const combinedData = expensesByCategory.reduce((acc, { CategoryName, Amount }) => {
    // Check if the category already exists in the accumulator
    if (acc[CategoryName]) {
      acc[CategoryName] += Amount; // Add to existing amount
    } else {
      acc[CategoryName] = Amount; // Create new category entry
    }
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for the Pie Chart from combined data
  const data = {
    labels: Object.keys(combinedData), // Categories as labels
    datasets: [
      {
        data: Object.values(combinedData), // Amounts as data
        backgroundColor: [
          '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#4BC0C0', // Teal
          '#9966FF', // Purple
          '#FF9F40', // Orange
        ],
      },
    ],
  };

  // Explicitly define options with the correct type for Pie Chart
  const options: import('chart.js').ChartOptions<'pie'> = {
    responsive: true, // Allow responsiveness
    maintainAspectRatio: false, // Disable aspect ratio to control size
    plugins: {
      legend: {
        position: 'bottom', // Place legend at the bottom
      },
    },
  };

  return (
    <div className="expenses-by-category-chart">
      <h2>Expenses by Category</h2>
      {/* Render Pie Chart */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default ExpensesByCategoryChart;