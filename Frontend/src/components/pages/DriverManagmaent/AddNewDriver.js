import React, { useState } from 'react';

const AddNewDriver = () => {
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    status: 'Active',
    assignedVehicle: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Driver Added:', formData);
    // Add logic to save the driver (e.g., API call)
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Driver</h1>

      {/* Add Driver Form */}
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Driver Name</label>
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
          <label className="block text-sm font-medium mb-1">License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
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
          <label className="block text-sm font-medium mb-1">Assigned Vehicle</label>
          <select
            name="assignedVehicle"
            value={formData.assignedVehicle}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Vehicle</option>
            <option value="Toyota Camry">Toyota Camry</option>
            <option value="Ford Transit">Ford Transit</option>
            <option value="Tesla Model 3">Tesla Model 3</option>
            <option value="Chevrolet Silverado">Chevrolet Silverado</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Driver
        </button>
      </form>
    </div>
  );
};

export default AddNewDriver;