'use client';
import { account } from '@/appwriteConfig';
import { useRouter } from 'next/navigation';

const Admin = () => {
  const router = useRouter();
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
    <div>
      <button onClick={signOutHandler}>Logout</button>
    </div>
  );
};

export default Admin;
