import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import Dashboard from './components/pages/Dashboard';
import JobTable from './components/Tables/JobTable';
import DumpRuns from './components/pages/DumpRuns';
import VehicleList from './components/pages/VehicleManagment/VehicleList';
import VehicleAdd from './components/pages/VehicleManagment/VehicleAdd ';
import VehicleCategories from './components/pages/VehicleManagment/VehicleCategories';
import VehicleTracking from './components/pages/VehicleManagment/VehicleTracking ';
import DriverList from './components/pages/DriverManagmaent/DriverList ';
import AddNewDriver from './components/pages/DriverManagmaent/AddNewDriver';
import ReportsAndAnalytics from './components/pages/Reports/ReportsAndAnalytics';
import DriverAssignment from './components/pages/DriverManagmaent/DriverAssignment ';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="job" element={<JobTable />} />
          <Route path="/vehicles/list" element={<VehicleList />} />
          <Route path="/vehicles/add" element={<VehicleAdd />} />
          <Route path="/vehicles/categories" element={<VehicleCategories />} />
          <Route path="/vehicles/tracking" element={<VehicleTracking />} />
          <Route path="/drivers/list" element={<DriverList />} />
          <Route path="/drivers/add" element={<AddNewDriver />} />
          <Route path="/drivers/assignments" element={<DriverAssignment />} />

          
          <Route path="/reports" element={<ReportsAndAnalytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
