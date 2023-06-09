'use client';

import { useState } from 'react';
import { account } from '@/appwriteConfig';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';

import Input from './Input';
import Button from './Button';

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
    <div
      className="
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md
        "
    >
      <div
        className="
            bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
        "
      >
        <form className="space-y-6" onSubmit={signUpHandler}>
          <Input
            id="name"
            label="Username"
            type="text"
            onChange={(e) => {
              setUser((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
          <Input
            id="email"
            label="Email adress"
            type="email"
            onChange={(e) => {
              setUser((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            onChange={(e) => {
              setUser((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
          />
          <div>
            <Button fullWidth type="submit" disabled={loading}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
