'use client';

import Button from '@/components/Button';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import { useState } from 'react';
import classes from './page.module.css';

const Home = () => {
  const [showSignup, setShowSignup] = useState(false);
  return (
    <div className="m-2 flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">NPTEL Management System</h1>
      {showSignup ? <Signup /> : <Login />}
      <div className="mt-2">
        <Button
          onClick={() => setShowSignup((prev) => !prev)}
          className={classes.button}
        >
          {!showSignup ? 'New user?' : 'Log In'}
        </Button>
      </div>
    </div>
  );
};

export default Home;
