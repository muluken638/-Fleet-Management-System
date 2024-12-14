import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard'); // Default to 'Dashboard'

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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-dashboardbackground px-8 py-4 sticky top-0 z-10 flex items-center justify-between">
          {/* Left Section: Dynamic Title */}
          <h1 className="text-4xl font-bold text-black hidden md:block">{activeItem}</h1>

          {/* Center Section: Search Bar */}
          <div className="relative flex-1 md:flex-initial max-w-md pr-6">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 4a7 7 0 100 14 7 7 0 000-14zm10 10l-3.87-3.87"
              />
            </svg>
          </div>

          {/* Right Section: Hamburger Button */}
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
