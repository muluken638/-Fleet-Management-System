import React, { useState } from 'react';
import { FaFilter, FaSortDown } from 'react-icons/fa';

// Generate 200 rows of data
const generateTableData = () => {
  const routes = ['North', 'South', 'East', 'West'];
  const statuses = ['Completed', 'In Process', 'Scheduled'];
  const data = [];

  for (let i = 1; i <= 200; i++) {
    data.push({
      date: '10-05-2024',
      client: `Client ${i}`,
      address: `${i} Elm St, Springfield, 98765`,
      jobId: `J0${i}`,
      route: routes[i % routes.length],
      status: statuses[i % statuses.length],
      selected: false,
    });
  }

  return data;
};

const DumpRuns = () => {
  const [tableData, setTableData] = useState(generateTableData());
  const [filters, setFilters] = useState({
    date: '',
    route: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10; // Number of rows per page
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  // Determine the visible range of pages
  const maxPageButtons = 5; // Number of page numbers to show
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  // Get filtered data
  const filteredData = tableData.filter(
    (row) =>
      (!filters.date || row.date === filters.date) &&
      (!filters.route || row.route === filters.route),
  );

  // Paginated data for the current page
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

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

  // Reset Filters and Selection
  const resetFilters = () => {
    setFilters({ date: '', route: '' });
    setTableData((prevData) => prevData.map((row) => ({ ...row, selected: false })));
    setCurrentPage(1); // Reset to the first page
  };

  // Handle Page Change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg mx-4">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-4 ">
        <div>
          <input
            type="checkbox"
            id="select-all"
            className="mr-2"
            onChange={(e) => toggleSelectAll(e.target.checked)}
          />
          <label htmlFor="select-all" className="text-sm text-gray-600">
            Select All
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            className="px-3 py-3 bg-gray-100 text-sm text-gray-700 rounded"
            value={filters.date}
            onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))} />
          <select
            className="px-3 py-3 bg-gray-100 text-sm text-gray-700 rounded"
            value={filters.route}
            onChange={(e) => setFilters((prev) => ({ ...prev, route: e.target.value }))}>
            <option value="">All Routes</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
          <button
            className="px-3 py-3 bg-gray-100 text-sm text-gray-700 rounded flex  justify-center items-center gap-2"
            onClick={resetFilters}>
            <FaFilter /> Filters <FaSortDown />
          </button>
          <button
            className="px-3 py-3 bg-red-100 text-sm text-red-600 rounded"
            onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr className='rounded-lg'>
              <th className="p-2 text-left text-sm font-medium text-gray-600"></th>
              <th className="py-6 text-left text-sm font-bold text-gray-500">Date</th>
              <th className="py-6 text-left text-sm font-bold text-gray-500">Ticket Number</th>
              <th className="py-6 text-left text-sm font-bold text-gray-500">Dump Location</th>
              <th className="py-6 text-left text-sm font-bold text-gray-500">Weight/Yards</th>
              <th className="py-6 text-left text-sm font-bold text-gray-500">Truck Id</th>
              <th className="py-6 text-left text-sm font-bold text-gray-500">Status</th>
              <th className="py-6 text-left text-sm font-bold text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors odd:bg-gray-50 even:bg-white rounded-lg my-2 border border-gray-300"
              >
                <td className="p-2 text-sm">
                  <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={() => toggleRowSelection(index)} />
                </td>
                <td className="py-5 text-lg ">{row.date}</td>
                <td className="py-5 text-lg ">{row.client}</td>
                <td className="py-5 text-lg ">{row.address}</td>
                <td className="py-5 text-lg ">{row.jobId}</td>
                <td className="py-5 text-lg ">{row.route}</td>
                <td className="py-5 text-lg ">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm text-white ${
                      row.status === "Completed"
                        ? "bg-green-400"
                        : row.status === "In Process"
                        ? "bg-yellow-400"
                        : "bg-blue-400"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="text-4xl font-bold">
                  <button
                    className="text-gray-500 text-lg"
                    onClick={() => alert(`Action for Job ID: ${row.jobId}`)}>
                    :
                  </button>
                </td>
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
          className={`px-3 py-1 rounded ${
            currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-700'
          }`}
        >
          Previous
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const page = startPage + index;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DumpRuns;
