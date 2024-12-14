import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';

// DumpRuns component to display vehicle data in a table
const DumpRuns = () => {
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({ status: '', date: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Data/Data.json'); // Adjust this path if necessary
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Get filtered data
  const filteredData = tableData.filter(row => 
    (!filters.status || row.status === filters.status) &&
    (!filters.date || row.lastUpdated.split('T')[0] === filters.date)
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
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
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
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={deleteSelectedRows}>
          Delete Selected
        </button>
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
              <th className="py-6 text-left text-sm font-bold text-gray-500">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-colors odd:bg-gray-50 even:bg-white">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={row.selected || false}
                    onChange={() => toggleRowSelection(index)}
                  />
                </td>
                <td className="py-5 text-lg">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className="py-5 text-lg">{row.vehicleName}</td>
                <td className="py-5 text-lg">
                  <span className={`inline-block px-2 py-1 rounded-full text-sm text-white ${
                    row.status === "Available" ? "bg-green-400" :
                    row.status === "In Use" ? "bg-yellow-400" :
                    "bg-blue-400"}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-5 text-lg">{new Date(row.lastUpdated).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center space-x-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-700'}`}
        >
          Previous
        </button>
        {Array.from({ length: Math.ceil(filteredData.length / rowsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
          className={`px-3 py-1 rounded ${currentPage === Math.ceil(filteredData.length / rowsPerPage) ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-700'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DumpRuns;