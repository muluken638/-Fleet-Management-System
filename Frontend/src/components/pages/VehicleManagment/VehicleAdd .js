import React, { useState } from 'react';

const VehicleAdd = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'Active',
    mileage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Vehicle Added:', formData);
    // Add logic to save the vehicle (e.g., API call)
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Vehicle</h1>

      {/* Add Vehicle Form */}
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Vehicle Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Vehicle Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Type</option>
            <option value="Sedan">Sedan</option>
            <option value="Van">Van</option>
            <option value="Truck">Truck</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Mileage</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default VehicleAdd;