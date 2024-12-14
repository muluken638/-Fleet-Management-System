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
        const response = await fetch('http://localhost:4000/api/products'); // Ensure this path is correct
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
  const totalAvailable = products.filter(product => product.status === 'active').length;
  const totalInUse = products.filter(product => product.status === 'inactive').length;
  const totalUnderMaintenance = products.filter(product => product.status === 'maintenance').length;

  // Chart data configuration
  const data = {
    labels: ['active', 'inactive', 'maintenance'],
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
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-semibold flex items-center justify-center"><FaCarAlt /> Vehicle Status Overview</h2>
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