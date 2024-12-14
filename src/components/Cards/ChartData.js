import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Importing Bar chart specifically
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaCarAlt } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartData = () => {
  const [selectedOption, setSelectedOption] = useState('14 Days');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Generate random data for the bar chart (you can replace it with real data)
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14'],
    datasets: [
      {
        label: 'Job Situation',
        data: Array.from({ length: 14 }, () => Math.floor(Math.random() * 100)), // Random data for now
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return;

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'lightblue'); // Light blue at the bottom
          gradient.addColorStop(1, 'darkblue');  // Dark blue at the top
          return gradient;
        },
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Job Situation',
        font: {
          size: 20,
          weight: 'bold',
        },
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Job Count',
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg w-100">
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-semibold flex items-center justify-center"><FaCarAlt/> Job Situation</h2>
        <select
          value={selectedOption}
          onChange={handleChange}
          className="border rounded-lg p-2"
        >
          <option value="14 Days">Last 14 Days</option>
          <option value="30 Days">Last 30 Days</option>
          <option value="60 Days">Last 60 Days</option>
        </select>
      </div>

      {/* Bar chart component */}
      <div className="w-100">
        <Bar data={data} options={options} /> {/* Use the Bar chart from react-chartjs-2 */}
      </div>
    </div>
  );
};

export default ChartData;
