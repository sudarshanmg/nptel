'use client';

import { account } from '@/appwriteConfig';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Profile = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getAccount = async () => {
      const promise = account.get();
      promise.then(
        function (response) {
          console.log(response);
          if (response.prefs.admin === 'true') {
            router.replace('/admin');
          } // Success
          setLoading(false);
        },
        function (error) {
          console.log(error);
          router.replace('/');
        }
      );
    };
    getAccount();
  }, []);

  const signOutHandler = async () => {
    const promise = account.deleteSession('current');

    promise.then(
      function (res) {
        router.replace('/');
      },
      function (err) {
        console.log(err);
      }
    );
  };

  return (
    <>
      {loading ? (
        <p> Loading.. </p>
      ) : (
        <button onClick={signOutHandler}>Logout</button>
      )}
    </>
  );
};

export default Profile;
