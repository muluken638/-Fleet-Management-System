import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';

// Modal component for adding new vehicle data
const AddDataModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('active');
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString().split('T')[0]); // Format as YYYY-MM-DD

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the new product via the API
      const response = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          status,
          lastUpdated,  // Send the date as is, since it's already in the correct format
        }),
      });

      if (!response.ok) {
        throw new Error('Error adding product');
      }

      // Once the data is added, call onAdd to update the table data
      const newData = await response.json();
      onAdd(newData);
      onClose();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-4">Add New Vehicle</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Vehicle Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border px-2 py-1 w-full"
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
                <option value="maintenance">maintenance</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Updated:</label>
              <input
                type="date"
                value={lastUpdated}
                onChange={(e) => setLastUpdated(e.target.value)}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mr-2">
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Vehicle
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

// Modal component for updating vehicle data
const UpdateDataModal = ({ isOpen, onClose, data, onUpdate }) => {
  const [name, setName] = useState(data.name || '');
  const [status, setStatus] = useState(data.status || 'active');
  const [lastUpdated, setLastUpdated] = useState(data.lastUpdated || new Date().toISOString().split('T')[0]);

  const handleUpdate = () => {
    const updatedData = {
      name, // from state
      status, // from state
      lastUpdated, // from state
    };
  
    // Ensure that data contains an ID and log it for debugging
    console.log('Selected product ID:', data.id);  // This should print the ID of the selected data
  
    if (!data.id) {
      console.error('Product ID is missing');
      return;
    }
  
    fetch(`http://localhost:4000/api/products/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated product:', data);
        onUpdate(data);  // Update the table with the new data
        onClose();  // Close the modal
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };
  
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-4">Update Vehicle</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700">Vehicle Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border px-2 py-1 w-full"
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
                <option value="maintenance">maintenance</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Updated:</label>
              <input
                type="date"
                value={lastUpdated}
                onChange={(e) => setLastUpdated(e.target.value)}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mr-2">
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Update Vehicle
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

// JobTable component to display vehicle data in a table
// JobTable component to display vehicle data in a table
const JobTable = () => {
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({ status: '', date: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products'); // Updated API URL
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddData = (newData) => {
    setTableData((prevData) => [...prevData, newData]);
  };

  const handleUpdateData = (updatedData) => {
    setTableData((prevData) =>
      prevData.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
  };

  const handleDeleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting product');
      setTableData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // Get filtered data
  const filteredData = tableData.filter(row =>
    (!filters.status || row.status === filters.status) &&
    (!filters.date || new Date(row.lastUpdated).toISOString().split('T')[0] === filters.date)
  );

  // Paginated data for the current page
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle Page Change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(filteredData.length / rowsPerPage)) {
      setCurrentPage(page);
    }
  };

  // Reset Filters
  const resetFilters = () => {
    setFilters({ status: '', date: '' });
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Add New Vehicle
        </button>

        <div className="flex space-x-2">
          <select
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
            value={filters.status}
            className="border px-2 py-1"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <input
            type="date"
            onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))}
            value={filters.date}
            className="border px-2 py-1"
          />
          <button
            onClick={resetFilters}
            className="bg-gray-200 px-4 py-2 rounded">
            Reset
          </button>
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Select</th>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Created At</th>
            <th className="py-2 px-4">Last Updated</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={row.id} className="border-b hover:bg-gray-100">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={row.selected || false}
                  // Add Row Selection Handling if needed
                />
              </td>
              <td className="py-4 text-sm">{index + 1}</td>
              <td className="py-4 text-sm">{row.name}</td>
              <td className="py-4 text-sm">{row.status}</td>
              <td className="py-4 text-sm">{row.createdAt}</td>
              <td className="py-4 text-sm">{row.lastUpdated}</td>
              <td className="py-4 text-sm">
                <button
                  onClick={() => {
                    setSelectedData(row);
                    setIsUpdateModalOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-700">
                  Update
                </button>
                <button
                  onClick={() => handleDeleteData(row.id)}
                  className="text-red-500 hover:text-red-700 ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          className="px-3 py-2 bg-gray-200 text-sm text-gray-700 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          Prev
        </button>
        <span className="text-sm">
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </span>
        <button
          className="px-3 py-2 bg-gray-200 text-sm text-gray-700 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}>
          Next
        </button>
      </div>

      {/* Add Data Modal */}
      <AddDataModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddData}
      />

      {/* Update Data Modal - Only render if selectedData is not null */}
      {selectedData && (
        <UpdateDataModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          data={selectedData}
          onUpdate={handleUpdateData}
        />
      )}
    </div>
  );
};


export default JobTable;
