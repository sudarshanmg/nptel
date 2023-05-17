'use client';

import { useState } from 'react';
import { account } from '@/appwriteConfig';
import { useRouter } from 'next/navigation';
import classes from './Form.module.css';

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const logInHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const promise = account.createEmailSession(user.email, user.password);

    promise
      .then(
        (response) => {
          router.push('/profile');
        },
        (error) => {
          alert(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.form__container}>
      <h1 className={classes.title}>Login</h1>

      <form action="" className={classes.form__}>
        <label htmlFor="email" className={classes.label}>
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className={classes.input}
        />
        <label htmlFor="passw" className={classes.label}>
          Password
        </label>
        <input
          type="text"
          name="passw"
          id="passw"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className={classes.input}
        />

        <button onClick={logInHandler} className={classes.button}>
          {loading ? 'Loading...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default Login;
