import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaCarAlt } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartData = () => {
  const [products, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState('14 Days');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using the environment variable for the API URL
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
        const response = await fetch(`${apiUrl}/vehicles`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div>
      <p>Error: {error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  // Count products by status
  const totalAvailable = products.filter(product => product.status === 'available').length;
  const totalInUse = products.filter(product => product.status === 'out_of_stock').length;
  const totalUnderMaintenance = products.filter(product => product.status === 'discontinued').length;


  // Chart data configuration
  const data = {
    labels: ['available', 'out_of_stock', 'discontinued'],
    datasets: [
      {
        label: 'Vehicle Count',
        data: [totalAvailable, totalInUse, totalUnderMaintenance],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return;

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'lightgreen'); // Light green at the bottom
          gradient.addColorStop(1, 'darkgreen');  // Dark green at the top
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
        text: 'Vehicle Status Overview',
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
          text: 'Vehicle Status',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <FaCarAlt className="mr-2" /> Vehicle Status Overview
        </h2>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="14 Days">Last 14 Days</option>
          <option value="30 Days">Last 30 Days</option>
          <option value="60 Days">Last 60 Days</option>
        </select>
      </div>

      {/* Bar chart component */}
      <div className="w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartData;
