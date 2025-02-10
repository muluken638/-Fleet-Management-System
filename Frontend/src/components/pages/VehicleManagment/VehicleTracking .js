import React, { useState } from 'react';

const VehicleTracking = () => {
  // Sample vehicle data
  const initialVehicles = [
    { id: 1, name: 'Toyota Camry', location: 'New York', status: 'Moving' },
    { id: 2, name: 'Ford Transit', location: 'Los Angeles', status: 'Idle' },
    { id: 3, name: 'Tesla Model 3', location: 'Chicago', status: 'Moving' },
    { id: 4, name: 'Chevrolet Silverado', location: 'Houston', status: 'Idle' },
    { id: 5, name: 'Honda Civic', location: 'Miami', status: 'Moving' },
  ];

  // State for vehicles, filters, search, and sorting
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [filters, setFilters] = useState({ status: '', location: '' });
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
      const matchesLocation = filters.location ? vehicle.location === filters.location : true;
      const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesLocation && matchesSearch;
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

  // Get unique locations for the location filter dropdown
  const uniqueLocations = [...new Set(vehicles.map((vehicle) => vehicle.location))];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vehicle Tracking</h1>

      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Status Filter */}
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg"
        >
          <option value="">All Statuses</option>
          <option value="Moving">Moving</option>
          <option value="Idle">Idle</option>
        </select>

        {/* Location Filter */}
        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg"
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by vehicle name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Tracking Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Vehicle Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('location')}
              >
                Location {sortConfig.key === 'location' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50 transition duration-200">
                <td className="px-4 py-2 border">{vehicle.name}</td>
                <td className="px-4 py-2 border">{vehicle.location}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      vehicle.status === 'Moving' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTracking;