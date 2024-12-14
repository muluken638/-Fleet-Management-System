import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import Dashboard from './components/pages/Dashboard';
import JobTable from './components/Tables/JobTable';
import DumpRuns from './components/pages/DumpRuns';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="job" element={<JobTable />} />
          <Route path="dump-runs" element={<DumpRuns />} />
          {/* <Route path="trucks" element={<Trucks />} /> */}
          {/* <Route path="routes-report" element={<RoutesReport />} /> */}
          {/* <Route path="reconciliations" element={<Reconciliations />} /> */}
          {/* <Route path="admin" element={<Admin />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
          {/* <Route path="logout" element={<Logout />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
