import React from 'react';
import Card from '../Cards/Card';
import { faDollarSign, faTicketAlt, faTruck } from '@fortawesome/free-solid-svg-icons';
import ChartData from '../Cards/ChartData';
import SatisfactionCard from '../Cards/SatisfactionCard';
import RoutesCard from '../Cards/RoutesCard';
import VehicleDashboard from '../Cards/Card';
function Dashboard() {
  return (
    
    <div>
        <VehicleDashboard/>
      
      {/* ChartData and SatisfactionCard Row */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-4 p-6 w-full">
      <div className="col-span-4">
          <ChartData />
        </div>
        <div className="col-span-1">
          <SatisfactionCard />
        </div>
      </div>

      {/* RoutesCard */}
      <RoutesCard />
    </div>
  );
}

export default Dashboard;
