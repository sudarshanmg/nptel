'use client';

import { useState } from 'react';
import { account } from '@/appwriteConfig';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Button from './Button';

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
        <form className="space-y-6" onSubmit={logInHandler}>
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
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
