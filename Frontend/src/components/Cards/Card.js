import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faWrench, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

// Card Component
const Card = ({ title, icon, value, color }) => {
  return (
    <div className={`border rounded-lg p-4 bg-${color}-100 flex flex-col items-center`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl">{value}</p>
      <FontAwesomeIcon icon={icon} className="text-2xl" />
    </div>
  );
};

// VehicleDashboard Component
const VehicleDashboard = () => {
  const [products, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL; // Use the environment variable
        const response = await fetch(`${apiUrl}/vehicles`); // Adjust the path if necessary
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

  return (
    <div className="flex-row">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        <Card 
          title="Active Vehicles" 
          icon={faCar} 
          value={totalAvailable} 
          color="green" 
        />
        <Card 
          title="In Use Vehicles" 
          icon={faTicketAlt} 
          value={totalInUse} 
          color="yellow" 
        />
        <Card 
          title="Under Maintenance Vehicles" 
          icon={faWrench} 
          value={totalUnderMaintenance} 
          color="red" 
        />
      </div>
    </div>
  );
};

export default VehicleDashboard;