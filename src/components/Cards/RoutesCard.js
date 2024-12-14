import React, { useEffect, useState } from 'react';

function RoutesCard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Data/Data.json'); // Adjust the path as necessary
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

  // Count trucks by status
  const totalTrucks = vehicles.length;
  const availableTrucks = vehicles.filter(vehicle => vehicle.status === 'Available').length;
  const inUseTrucks = vehicles.filter(vehicle => vehicle.status === 'In Use').length;
  const maintenanceTrucks = vehicles.filter(vehicle => vehicle.status === 'Under Maintenance').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {/* Total Trucks Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-blue-500 text-sm bg-blue-100 rounded-lg px-1 mx-0 w-fit">
          {totalTrucks} Trucks Total
        </div>
        <h2 className="text-2xl font-bold">Total Trucks</h2>
      </div>

      {/* Available Trucks Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-green-500 text-sm bg-green-100 rounded-lg px-1 mx-0 w-fit">
          {availableTrucks} Trucks Available
        </div>
        <h2 className="text-2xl font-bold">Available Trucks</h2>
      </div>

      {/* In Use Trucks Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-orange-500 text-sm bg-orange-100 rounded-lg px-1 mx-0 w-fit">
          {inUseTrucks} Trucks In Use
        </div>
        <h2 className="text-2xl font-bold">In Use Trucks</h2>
      </div>

      {/* Under Maintenance Trucks Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-red-500 text-sm bg-red-100 rounded-lg px-1 mx-0 w-fit">
          {maintenanceTrucks} Trucks Under Maintenance
        </div>
        <h2 className="text-2xl font-bold">Maintenance Trucks</h2>
      </div>
    </div>
  );
}

export default RoutesCard;