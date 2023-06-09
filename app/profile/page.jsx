'use client';

import { account, databases } from '@/appwriteConfig';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@/components/Button';

const Profile = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getAccount = async () => {
      const promise = account.get();
      promise.then(
        function (response) {
          setName(response.name);
          if (response.prefs.admin === 'true') {
            router.replace('/admin');
          } else {
            setLoading(false);
            const promise = databases.listDocuments(
              '6463a04b309c3d909e05',
              '64664f73235363179d0c'
            );

            promise.then(
              function (response) {
                console.log(response); // Success
                setCourses(response.documents);
              },
              function (error) {
                console.log(error); // Failure
              }
            );
          }
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
        <div>
          <div className="flex flex-col items-center">
            <h1 className="text-center text-2xl font-semibold text-gray-600 m-2">
              Welcome {name}!
            </h1>
            <Button onClick={signOutHandler}>Logout</Button>
          </div>
          <hr className="w-full h-1 my-4" />
          <div>
            <h1 className="font-semibold text-2xl text-center my-8">
              Available Courses
            </h1>
            <div className="m-3 flex flex-col w-screen items-center">
              <div className="flex h-5 w-3/5 mb-4 items-center justify-around border-solid rounded-md border-black">
                <div>
                  <h1 className="text-lg font-semibold">Index</h1>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Course Title</h1>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Number of weeks</h1>
                </div>
              </div>
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="w-3/5 flex flex-col justify-center items-center"
                >
                  <div
                    className="flex h-5 w-full my-1 items-center justify-around border-solid rounded-md border-black"
                    key={index}
                  >
                    <div className="w-4">
                      <h1>{index + 1}</h1>
                    </div>
                    <div className="w-56">
                      <h1>{course.courseTitle}</h1>
                    </div>
                    <div className="w-4">
                      <h1>{course.weeks}</h1>
                    </div>
                  </div>
                  <hr className="h-1 w-4/5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
