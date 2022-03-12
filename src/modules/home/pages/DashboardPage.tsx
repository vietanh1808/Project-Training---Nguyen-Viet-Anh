import React, { useState } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import '../scss/dashboard.css';

const Dashboard = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div>
      <Header onClick={handleSideBar} />
      <SideBar show={showSideBar} onClick={handleSideBar} />
    </div>
  );
};

export default Dashboard;
