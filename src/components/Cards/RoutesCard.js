import React from 'react';

function RoutesCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {/* North Route Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-green-500 text-sm bg-green-100 rounded-lg px-1 mx-0 w-fit ">25 Trucks on the route</div>
        <h2 className="text-2xl font-bold">North Route</h2>
      </div>

      {/* South Route Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-green-500 text-sm bg-green-100 rounded-lg px-1 mx-0 w-fit " bg-green-100 rounded-lg px-1 mx-0 w-fit >16 Trucks on the route</div>
        <h2 className="text-2xl font-bold">South Route</h2>
      </div>

      {/* West Route Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-green-500 text-sm bg-green-100 rounded-lg px-1 mx-0 w-fit ">12 Trucks on the route</div>
        <h2 className="text-2xl font-bold">West Route</h2>
      </div>

      {/* East Route Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-green-500 text-sm bg-green-100 rounded-lg px-1 mx-0 w-fit ">18 Trucks on the route</div>
        <h2 className="text-2xl font-bold">East Route</h2>
      </div>
    </div>
  );
}

export default RoutesCard;
