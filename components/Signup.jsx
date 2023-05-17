'use client';

import { useState } from 'react';
import { account } from '@/appwriteConfig';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';

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
    <form action="">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <label htmlFor="passw">Password</label>
      <input
        type="text"
        name="passw"
        id="passw"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <label htmlFor="email">email</label>
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <button onClick={signUpHandler}>
        {loading ? 'Loading...' : 'Create'}
      </button>
    </form>
  );
};

export default Signup;
