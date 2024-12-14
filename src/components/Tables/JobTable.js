import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';

// Modal component for adding new vehicle data
const AddDataModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setname] = useState('');
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
                onChange={(e) => setname(e.target.value)}
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

// JobTable component to display vehicle data in a table
const JobTable = () => {
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({ status: '', date: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Select All Rows
  const toggleSelectAll = (checked) => {
    setTableData((prevData) => prevData.map((row) => ({ ...row, selected: checked })));
  };

  // Handle Individual Row Selection
  const toggleRowSelection = (index) => {
    setTableData((prevData) =>
      prevData.map((row, idx) => (idx === index ? { ...row, selected: !row.selected } : row)),
    );
  };

  // Delete Selected Rows
  const deleteSelectedRows = () => {
    setTableData((prevData) => prevData.filter((row) => !row.selected));
  };

  // Format the createdAt date to a readable format (YYYY-MM-DD)
  const formatDate = (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return 'Invalid Date'; // Return a fallback value if the date is invalid
    }
    return d.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  // Check if any rows are selected
  const isAnySelected = tableData.some(row => row.selected);

  return (
    <div className="p-4 bg-white rounded-lg mx-4">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-600">Filter by Status:</label>
          <select
            className="px-3 py-2 bg-gray-100 text-sm text-gray-700 rounded"
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}>
            <option value="">All Statuses</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
            <option value="maintenance">maintenance</option>
          </select>
          <input
            type="date"
            className="px-3 py-2 bg-gray-100 text-sm text-gray-700 rounded"
            value={filters.date}
            onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))} />
          <button
            className="px-3 py-2 bg-gray-100 text-sm text-gray-700 rounded"
            onClick={resetFilters}>
            <FaFilter /> Reset Filters
          </button>
        </div>
        <div className="flex items-center">
          {isAnySelected && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-4"
              onClick={deleteSelectedRows}>
              Delete Selected
            </button>
          )}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)}>
            Add New Data
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </th>
              <th className="py-6 text-left text-sm font-bold text-gray-500">No.</th>
              <th className="py-6 text-left text-sm font-bold text-gray-500">Vehicle Name</th>
              <th className="py-6 text-left text-sm font-bold text-gray-500">Status</th>
              <th className="py-6 text-left text-sm font-bold text-gray-500">Created At</th>
              <th className="py-6 text-left text-sm font-bold text-gray-500">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={row._id}>
                <td className="py-6 px-4 text-sm">
                  <input
                    type="checkbox"
                    checked={row.selected || false}
                    onChange={() => toggleRowSelection(index)}
                  />
                </td>
                <td className="py-6 px-4 text-sm">{index + 1}</td>
                <td className="py-6 px-4 text-sm">{row.name}</td>
                <td className="py-6 px-4 text-sm">{row.status}</td>
                <td className="py-6 px-4 text-sm">{formatDate(row.createdAt)}</td>
                <td className="py-6 px-4 text-sm">{formatDate(row.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-gray-200 rounded-md">
          Prev
        </button>
        <span className="text-sm">{`Page ${currentPage} of ${Math.ceil(filteredData.length / rowsPerPage)}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
          className="px-3 py-2 bg-gray-200 rounded-md">
          Next
        </button>
      </div>

      {/* Add Data Modal */}
      <AddDataModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddData} />
    </div>
  );
};


export default JobTable;
