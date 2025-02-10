import React from 'react';
import ChartData from '../Cards/ChartData';
import SatisfactionCard from '../Cards/SatisfactionCard';
import RoutesCard from '../Cards/RoutesCard';
import VehicleDashboard from '../Cards/Card';
function Dashboard() {
   // Sample data for recent activities
   const recentActivities = [
    { id: 1, activity: 'Trip Completed', driver: 'John Doe', vehicle: 'Toyota Camry', date: '2023-10-01' },
    { id: 2, activity: 'Maintenance Performed', driver: 'Jane Smith', vehicle: 'Ford Transit', date: '2023-10-02' },
    { id: 3, activity: 'New Driver Assigned', driver: 'Alice Brown', vehicle: 'Tesla Model 3', date: '2023-10-03' },
    { id: 4, activity: 'Trip Started', driver: 'Charlie Black', vehicle: 'Chevrolet Silverado', date: '2023-10-04' },
  ];
  return (
    
    <div>
        <VehicleDashboard/>
      
      {/* ChartData and SatisfactionCard Row */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-4 p-6 w-full">
      <div className="col-span-4">
          <ChartData />/
        </div>
        <div className="col-span-1">
          <SatisfactionCard />
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
}

export default Dashboard;
