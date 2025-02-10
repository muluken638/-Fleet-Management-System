import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { FaBell } from 'react-icons/fa';

const notifications = [
  { id: 1, sender: 'John Doe', message: 'Your report is ready.', avatar: '/path/to/avatar1.jpg' },
  { id: 2, sender: 'Jane Smith', message: 'Meeting at 3 PM tomorrow.', avatar: '/path/to/avatar2.jpg' },
  { id: 3, sender: 'Alice Brown', message: 'Updated the project plan.', avatar: '/path/to/avatar3.jpg' },
  { id: 4, sender: 'Charlie Black', message: 'Can you review the document?', avatar: '/path/to/avatar4.jpg' },
  { id: 5, sender: 'David White', message: 'Reminder: Submit your report by Friday.', avatar: '/path/to/avatar5.jpg' },
  { id: 6, sender: 'Emma Green', message: 'Follow-up on the last email.', avatar: '/path/to/avatar6.jpg' },
];

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notificationsRef = useRef(null);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-blue-600 text-white transform transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:flex-none`}
      >
        <Sidebar setActiveItem={setActiveItem} />
      </aside>

      {/* Backdrop for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col container">
        {/* Header */}
        <header className="bg-dashboardbackground px-4 py-1 sticky top-0 z-10 flex items-center justify-between border-b-2">
          {/* Left Section: Hamburger Button */}
          <button
            className="md:hidden text-blue-600"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Right Section: Notifications and User Avatar */}
          <div className="flex items-center space-x-6 ml-auto">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                className="flex items-center space-x-2"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <span className="relative">
                  {/* Notification Badge */}
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications.length > 5 ? '5+' : notifications.length}
                  </span>
                  <FaBell  className="w-8 h-8 text-gray-700"/>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-700"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4zm0-6h-4V6h8v10h-4z" />
                  </svg> */}
                </span>
              </button>

              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 transition-all duration-300 ease-in-out transform opacity-100 max-h-96 overflow-y-auto">
                  <h3 className="font-semibold text-lg mb-4">Notifications</h3>
                  <div className="space-y-4">
                    {notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start space-x-3 p-2 hover:bg-gray-100 rounded-lg transition duration-200"
                      >
                        <img
                          src={notification.avatar}
                          alt={notification.sender}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{notification.sender}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="text-blue-600 mt-3 w-full text-center py-2 rounded-lg hover:bg-blue-100 transition duration-200">
                    See All
                  </button>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div className="flex items-center flex-col gap-2">
              <img
                src="https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium text-gray-700">Username</span>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 overflow-y-auto px-1 main-bg">
          <Outlet /> {/* Dynamic content will render here */}
        </main>
      </div>
    </div>
  );
}

export default Layout;