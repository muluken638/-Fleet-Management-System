import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const SatisfactionCard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL; // Use the environment variable
        const response = await fetch(`${apiUrl}/vehicles`); // Ensure this path is correct
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

  // Count vehicles by status
  const totalAvailable = vehicles.filter(product => product.status === 'available').length;
  const totalInUse = vehicles.filter(product => product.status === 'out_of_stock').length;
  const totalUnderMaintenance = vehicles.filter(product => product.status === 'discontinued').length;

  const totalVehicles = vehicles.length;

  // Calculate percentages
  const satisfiedPercentage = totalAvailable / totalVehicles * 100 || 0; // Available vehicles as satisfied
  const unsatisfiedPercentage = totalInUse / totalVehicles * 100 || 0; // In use vehicles as unsatisfied
  const maintenancePercentage = totalUnderMaintenance / totalVehicles * 100 || 0; // Under maintenance vehicles

  // Data for the Doughnut chart
  const data = {
    labels: ['available', 'out_of_stock', 'discontinued'],
    datasets: [
      {
        data: [satisfiedPercentage, unsatisfiedPercentage, maintenancePercentage],
        backgroundColor: ['#3b82f6', '#f87171', '#fbbf24'], // Blue for satisfied, Red for unsatisfied, Yellow for under maintenance
        hoverBackgroundColor: ['#2563eb', '#dc2626', '#d97706'],
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
        ctx.save();
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#000'; // Black color for the text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${Math.round(satisfiedPercentage)}%`, centerX, centerY); // Display percentage at the center
        ctx.restore();
      },
    },
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg w-full h-full">
      <h2 className="text-2xl font-semibold text-blue-500 flex items-center space-x-2">
        <span>Total</span>
      </h2>
      <div className="w-full mx-auto mt-6">
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-6">
        <p className="text-gray-700 flex justify-start items-center">
          <span className="text-blue-500 text-4xl gap-2">•</span>Available {totalAvailable}
        </p>
        <p className="text-gray-700 flex justify-start items-center">
          <span className="text-red-500 text-4xl gap-2">•</span> out_of_stock {totalInUse}
        </p>
        <p className="text-gray-700 flex justify-start items-center">
          <span className="text-yellow-500 text-4xl gap-2">•</span>discontinued {totalUnderMaintenance}
        </p>
      </div>
    </div>
  );
};

export default SatisfactionCard;