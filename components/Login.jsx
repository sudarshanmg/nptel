'use client';

import { useState } from 'react';
import { account } from '@/appwriteConfig';
import { useRouter } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

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
      <label htmlFor="email">email</label>
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="passw">Password</label>
      <input
        type="text"
        name="passw"
        id="passw"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button onClick={logInHandler}>
        {loading ? 'Loading...' : 'Log In'}
      </button>
    </form>
  );
};

export default Login;
