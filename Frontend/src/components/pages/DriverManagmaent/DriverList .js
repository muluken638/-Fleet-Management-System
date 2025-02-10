import React, { useState } from 'react';
const DriverList = () => {
const [drivers, setDrivers] = useState([
    { id: 1, name: 'John Doe', licenseNumber: 'D12345', status: 'Active', assignedVehicle: 'Toyota Camry' },
    { id: 2, name: 'Jane Smith', licenseNumber: 'D67890', status: 'Inactive', assignedVehicle: 'Ford Transit' },
    { id: 3, name: 'Alice Brown', licenseNumber: 'D11223', status: 'Active', assignedVehicle: 'Tesla Model 3' },
  ]);
  const [editingDriver, setEditingDriver] = useState(null);
  const [editDriverData, setEditDriverData] = useState({ name: '', licenseNumber: '', status: 'Active' });

  const handleAddDriver = (newDriver) => {
    setDrivers([...drivers, { id: drivers.length + 1, ...newDriver, assignedVehicle: '' }]);
  };

  const handleDeleteDriver = (id) => {
    setDrivers(drivers.filter((driver) => driver.id !== id));
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setEditDriverData({ name: driver.name, licenseNumber: driver.licenseNumber, status: driver.status });
  };

  const handleSaveEdit = () => {
    if (editDriverData.name.trim() && editDriverData.licenseNumber.trim()) {
      const updatedDrivers = drivers.map((driver) =>
        driver.id === editingDriver.id ? { ...driver, ...editDriverData } : driver
      );
      setDrivers(updatedDrivers);
      setEditingDriver(null);
      setEditDriverData({ name: '', licenseNumber: '', status: 'Active' });
    }
  };

  const handleCancelEdit = () => {
    setEditingDriver(null);
    setEditDriverData({ name: '', licenseNumber: '', status: 'Active' });
  }; 
    return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Driver List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">License Number</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Assigned Vehicle</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-gray-50 transition duration-200">
                <td className="px-4 py-2 border">{driver.id}</td>
                <td className="px-4 py-2 border">
                  {editingDriver?.id === driver.id ? (
                    <input
                      type="text"
                      value={editDriverData.name}
                      onChange={(e) => setEditDriverData({ ...editDriverData, name: e.target.value })}
                      className="p-2 border rounded-lg"
                    />
                  ) : (
                    driver.name
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editingDriver?.id === driver.id ? (
                    <input
                      type="text"
                      value={editDriverData.licenseNumber}
                      onChange={(e) => setEditDriverData({ ...editDriverData, licenseNumber: e.target.value })}
                      className="p-2 border rounded-lg"
                    />
                  ) : (
                    driver.licenseNumber
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editingDriver?.id === driver.id ? (
                    <select
                      value={editDriverData.status}
                      onChange={(e) => setEditDriverData({ ...editDriverData, status: e.target.value })}
                      className="p-2 border rounded-lg"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  ) : (
                    driver.status
                  )}
                </td>
                <td className="px-4 py-2 border">{driver.assignedVehicle || 'Unassigned'}</td>
                <td className="px-4 py-2 border flex gap-2">
                  {editingDriver?.id === driver.id ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(driver)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleCancelEdit(driver)}
                        className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition duration-200"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditDriver(driver)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDriver(driver.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverList;