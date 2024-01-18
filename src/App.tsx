import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Accounts } from './components/Accounts';
import { Profiles } from './components/Profiles';
import { Campaigns } from './components/Campaigns';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accounts />} />
        <Route path="/profiles/:accountId" element={<Profiles />} />
        <Route path="/campaigns/:profileId" element={<Campaigns />} />
      </Routes>
    </Router>
  );
}

export default App;
