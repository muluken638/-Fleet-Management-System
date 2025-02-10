import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ReportsAndAnalytics = () => {
  // Sample data for charts
  const driverData = {
    labels: ['John Doe', 'Jane Smith', 'Alice Brown', 'Charlie Black'],
    datasets: [
      {
        label: 'Trips Completed',
        data: [12, 19, 8, 15],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const vehicleData = {
    labels: ['Sedan', 'Van', 'Truck', 'Electric'],
    datasets: [
      {
        label: 'Vehicles by Type',
        data: [5, 3, 2, 4],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Sample data for cards
  const metrics = [
    { title: 'Total Drivers', value: 25, color: 'bg-blue-500' },
    { title: 'Total Vehicles', value: 15, color: 'bg-green-500' },
    { title: 'Active Trips', value: 8, color: 'bg-yellow-500' },
    { title: 'Maintenance Alerts', value: 3, color: 'bg-red-500' },
  ];

  // Sample data for recent activities
  const recentActivities = [
    { id: 1, activity: 'Trip Completed', driver: 'John Doe', vehicle: 'Toyota Camry', date: '2023-10-01' },
    { id: 2, activity: 'Maintenance Performed', driver: 'Jane Smith', vehicle: 'Ford Transit', date: '2023-10-02' },
    { id: 3, activity: 'New Driver Assigned', driver: 'Alice Brown', vehicle: 'Tesla Model 3', date: '2023-10-03' },
    { id: 4, activity: 'Trip Started', driver: 'Charlie Black', vehicle: 'Chevrolet Silverado', date: '2023-10-04' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports and Analytics</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className={`p-6 rounded-lg shadow-md ${metric.color} text-white`}>
            <h3 className="text-lg font-semibold">{metric.title}</h3>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Driver Performance</h2>
          <Bar
            data={driverData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Trips Completed by Driver' },
              },
            }}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Vehicle Distribution</h2>
          <Pie
            data={vehicleData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Vehicles by Type' },
              },
            }}
          />
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Activity</th>
                <th className="px-4 py-2">Driver</th>
                <th className="px-4 py-2">Vehicle</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-4 py-2 border">{activity.activity}</td>
                  <td className="px-4 py-2 border">{activity.driver}</td>
                  <td className="px-4 py-2 border">{activity.vehicle}</td>
                  <td className="px-4 py-2 border">{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;