'use client';

import { useState } from 'react';
import { account } from '@/appwriteConfig';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';

import classes from './Form.module.css';

const Signup = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const signUpHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const promise = account.create(
      uuid(),
      user.email,
      user.password,
      user.name
    );

    promise
      .then(
        (response) => {
          console.log(response);
          router.push('/profile');
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.form__container}>
      <h1 className={classes.title}>Sign Up</h1>
      <form action="" className={classes.form__}>
        <label htmlFor="name" className={classes.label}>
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className={classes.input}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <label htmlFor="passw" className={classes.label}>
          Password
        </label>
        <input
          type="text"
          name="passw"
          id="passw"
          className={classes.input}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          id="email"
          className={classes.input}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <button onClick={signUpHandler} className={classes.button}>
          {loading ? 'Loading...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
