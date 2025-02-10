import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VehicleList = () => {
  // Sample vehicle data
  const initialVehicles = [
    { id: 1, name: 'Toyota Camry', type: 'Sedan', status: 'Active', mileage: 12000 },
    { id: 2, name: 'Ford Transit', type: 'Van', status: 'Inactive', mileage: 45000 },
    { id: 3, name: 'Tesla Model 3', type: 'Electric', status: 'Active', mileage: 8000 },
    { id: 4, name: 'Chevrolet Silverado', type: 'Truck', status: 'Active', mileage: 30000 },
    { id: 5, name: 'Honda Civic', type: 'Sedan', status: 'Inactive', mileage: 25000 },
  ];

  // State for vehicles, filters, search, and sorting
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [filters, setFilters] = useState({ status: '', type: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply filters, search, and sorting
  const filteredVehicles = vehicles
    .filter((vehicle) => {
      const matchesStatus = filters.status ? vehicle.status === filters.status : true;
      const matchesType = filters.type ? vehicle.type === filters.type : true;
      const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (sortConfig.key) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });

  return (
    <div className="p-6">
      {/* Page Header */}
      
      <div className='flex justify-between items-center mb-6 flex-wrap gap-4'>
      {/* Filters and Search */}
      <div className="flex gap-4">
        {/* Status Filter */}
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Type Filter */}
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg"
        >
          <option value="">All Types</option>
          <option value="Sedan">Sedan</option>
          <option value="Van">Van</option>
          <option value="Electric">Electric</option>
          <option value="Truck">Truck</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded-lg "
        />
      </div>
      <div>
        <Link
          to="/vehicles/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add New Vehicle
        </Link>
      </div>

      </div>

      
      {/* Vehicle Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('type')}
              >
                Type {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('mileage')}
              >
                Mileage {sortConfig.key === 'mileage' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50 transition duration-200">
                <td className="px-4 py-2 border">{vehicle.name}</td>
                <td className="px-4 py-2 border">{vehicle.type}</td>
                <td className="px-4 py-2 border">{vehicle.status}</td>
                <td className="px-4 py-2 border">{vehicle.mileage.toLocaleString()} miles</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleList;