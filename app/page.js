'use client';

import Login from '@/components/Login';
import Signup from '@/components/Signup';
import { useState } from 'react';
import classes from './page.module.css';

const Home = () => {
  const [showSignup, setShowSignup] = useState(false);
  return (
    <div className={classes.main_layout}>
      <h1 className={classes.title}>NPTEL Management System</h1>
      {showSignup ? <Signup /> : <Login />}
      <button
        onClick={() => setShowSignup((prev) => !prev)}
        className={classes.button}
      >
        {!showSignup ? 'Sign Up' : 'Log In'}
      </button>
    </div>
  );
};

export default Home;
