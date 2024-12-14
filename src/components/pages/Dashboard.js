import React from 'react';
import Card from '../Cards/Card';
import { faDollarSign, faTicketAlt, faTruck } from '@fortawesome/free-solid-svg-icons';
import ChartData from '../Cards/ChartData';
import SatisfactionCard from '../Cards/SatisfactionCard';
import RoutesCard from '../Cards/RoutesCard';

function Dashboard() {
  return (
    <div className="flex-row">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        <Card title="Truck in Use" icon={faTruck} value="2500" percentage={80} color="green" />
        <Card title="Dump Tickets" icon={faTicketAlt} value="200" percentage={50} color="yellow" />
        <Card
          title="Revenue Today's"
          icon={faDollarSign}
          value="$1,500"
          percentage={30}
          color="red"
        />
      </div>
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
