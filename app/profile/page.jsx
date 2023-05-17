'use client';

import { account } from '@/appwriteConfig';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Profile = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    setLoading(true);
    const getAccount = async () => {
      const promise = account.get();
      promise.then(
        function (response) {
          setName(response.name);
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>
            Hi {name}! Ide nin profile, innu design maadilla. Log out aagu 😊
          </h2>
          <button
            onClick={signOutHandler}
            style={{ width: '5rem', height: '2rem' }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
