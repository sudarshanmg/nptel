import Login from '@/components/Login';
import Signup from '@/components/Signup';
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>NPTEL Management System</h1>
      <Signup />
      <Login />
    </div>
  );
};

export default Home;
