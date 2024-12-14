import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const SatisfactionCard = () => {
  // Set the percentage of satisfied users and the number of users
  const satisfiedPercentage = 80; // This can be dynamic
  const unsatisfiedPercentage = 100 - satisfiedPercentage;
  const satisfiedCustomers = 800; // Example value
  const unsatisfiedCustomers = 200; // Example value

  const data = {
    labels: ['Satisfied', 'Unsatisfied'],
    datasets: [
      {
        data: [satisfiedPercentage, unsatisfiedPercentage],
        backgroundColor: ['#3b82f6', '#f87171'], // Blue for satisfied, Red for unsatisfied
        hoverBackgroundColor: ['#2563eb', '#dc2626'],
        borderWidth: 0, // No border for cleaner look
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false, // Disable tooltip
      },
      legend: {
        display: false, // Hide the legend
      },
      beforeDraw: function (chart) {
        const ctx = chart.ctx;
        const centerX = chart.width / 2;
        const centerY = chart.height / 2;
        const radius = chart.innerRadius + (chart.outerRadius - chart.innerRadius) / 2;
        ctx.save();
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#000'; // Black color for the text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${satisfiedPercentage}%`, centerX, centerY); // Display percentage at the center
        ctx.restore();
      },
    },
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg w-100 h-full">
      <h2 className="text-2xl font-semibold text-blue-500 flex items-center space-x-2">
        <span>⭐</span>
        <span>Customer Satisfaction</span>
      </h2>
      <div className="w-full mx-auto mt-6">
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-6 ">
        <p className="text-gray-700 flex justify-start items-center">
          <span className="text-blue-500 text-4xl gap-2">•</span> Satisfied Customers: {satisfiedCustomers}
        </p>
        <p className="text-gray-700 flex justify-start items-center">
          <span className="text-red-500 text-4xl gap-2">•</span> Unsatisfied Customers: {unsatisfiedCustomers}
        </p>
      </div>
    </div>
  );
};

export default SatisfactionCard;
