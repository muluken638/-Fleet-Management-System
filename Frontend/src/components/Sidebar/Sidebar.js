import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const navigate = useNavigate();

  // Function to toggle submenus
  const toggleSubmenu = (menu) => {
    if (openSubmenu === menu) {
      setOpenSubmenu(null); // Close the submenu if it's already open
    } else {
      setOpenSubmenu(menu); // Open the submenu
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions (e.g., clear session, remove tokens, etc.)
    localStorage.removeItem('authToken'); // Example: Remove auth token
    navigate('/login'); // Redirect to login page
  };

  return (
    <aside className="w-64 bg-blue-600 text-white p-4 flex flex-col h-screen">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-6">Fleet Management</h2>
        <nav>
          <ul className="space-y-2">
            {/* Dashboard */}
            <li>
              <Link to="/" className="flex items-center p-2 hover:bg-blue-700 rounded">
                📊 Dashboard
              </Link>
            </li>

            {/* Vehicle Management */}
            <li>
              <div
                className="flex items-center justify-between p-2 hover:bg-blue-700 rounded cursor-pointer"
                onClick={() => toggleSubmenu('vehicles')}
              >
                <span>🚗 Vehicle Management</span>
                <span>{openSubmenu === 'vehicles' ? '▲' : '▼'}</span>
              </div>
              {openSubmenu === 'vehicles' && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <Link to="/vehicles/list" className="flex items-center p-2 hover:bg-blue-700 rounded">
                      Vehicle List
                    </Link>
                  </li>
                  <li>
                    <Link to="/vehicles/add" className="flex items-center p-2 hover:bg-blue-700 rounded">
                      Add New Vehicle
                    </Link>
                  </li>
                  <li>
                    <Link to="/vehicles/categories" className="flex items-center p-2 hover:bg-blue-700 rounded">
                      Vehicle Categories
                    </Link>
                  </li>
                  <li>
                    <Link to="/vehicles/tracking" className="flex items-center p-2 hover:bg-blue-700 rounded">
                      Vehicle Tracking
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Driver Management */}
            <li>
              <div
                className="flex items-center justify-between p-2 hover:bg-blue-700 rounded cursor-pointer"
                onClick={() => toggleSubmenu('drivers')}
              >
                <span>👤 Driver Management</span>
                <span>{openSubmenu === 'drivers' ? '▲' : '▼'}</span>
              </div>
              {openSubmenu === 'drivers' && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <Link to="/drivers/list" className="flex items-center p-2 hover:bg-blue-700 rounded">
                      Driver List
                    </Link>
                  </li>
                  <li>
                    <Link to="/drivers/add" className="flex items-center p-2 hover:bg-blue-700 rounded">
                      Add New Driver
                    </Link>
                  </li>
                  <li>
                    <Link to="/drivers/assignments" className="flex items-center p-2 hover:bg-blue-700 rounded">
                      Driver Assignments
                    </Link>
                  </li>
                  <li>
                    <Link to="/drivers/performance" className="flex items-center p-2 hover:bg-blue-700 rounded">
                      Driver Performance
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Trip Management */}
            <li>
              <div
                className="flex items-center justify-between p-2 hover:bg-blue-700 rounded cursor-pointer"
                onClick={() => toggleSubmenu('trips')}
              >
                <span>🗺️ Trip Management</span>
                <span>{openSubmenu === 'trips' ? '▲' : '▼'}</span>
              </div>
              {openSubmenu === 'trips' && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <Link to="/trips/list" className="flex items-center p-2 hover:bg-blue-700 rounded">
                      Trip List
                    </Link>
                  </li>
                  <li>
                    <Link to="/trips/create" className="flex items-center p-2 hover:bg-blue-700 rounded">
                      Create New Trip
                    </Link>
                  </li>
                  <li>
                    <Link to="/trips/history" className="flex items-center p-2 hover:bg-blue-700 rounded">
                      Trip History
                    </Link>
                  </li>
                  <li>
                    <Link to="/trips/analytics" className="flex items-center p-2 hover:bg-blue-700 rounded">
                      Trip Analytics
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Reports & Analytics */}
            <li>
              <Link to="/reports" className="flex items-center p-2 hover:bg-blue-700 rounded">
                📈 Reports & Analytics
              </Link>
            </li>

            {/* Settings */}
            <li>
              <Link to="/settings" className="flex items-center p-2 hover:bg-blue-700 rounded">
                ⚙️ Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;