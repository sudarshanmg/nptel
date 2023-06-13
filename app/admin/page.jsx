'use client';

import CourseForm from '@/components/admin/CourseForm';
import CourseBox from '@/components/CourseBox';
import Button from '@/components/Button';
import { account, databases } from '@/appwriteConfig';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Query } from 'appwrite';
import { getCourses } from '../actions/getCourses';
import Document from '@/components/Document';

const Admin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showAddNewCourse, setShowAddNewCourse] = useState(false);
  const [appliedCourses, setAppliedCourses] = useState([]);
  const [showAppliedCourses, setShowAppliedCourses] = useState(false);
  const [showAvailableCourses, setShowAvailableCourses] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getAccount = async () => {
      const promise = account.get();
      promise.then(
        async function (response) {
          if (response.prefs.admin === 'true') {
            setLoading(false);
            const promise = getCourses();

            promise.then(
              function (response) {
                console.log(response); // Success
                setCourses(response.documents);
              },
              function (error) {
                console.log(error); // Failure
              }
            );
          } else {
            router.replace('/');
          }
        },
        function (error) {
          console.log(error);
          router.replace('/');
        }
      );
    };
    getAccount();
  }, [account, databases]);

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

  const getAppliedCourses = async () => {
    setShowAvailableCourses(false);
    const usn = prompt('Enter USN:').toLowerCase();
    const promise = databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPLIED_COURSES_ID,
      [Query.equal('usn', usn)]
    );

    promise.then(
      (response) => {
        setAppliedCourses(response.documents);
        console.log(response.documents);
        setShowAppliedCourses(true);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  return (
    <>
      {loading && <h2>loading...</h2>}
      {!loading && (
        <div>
          <div className="text-center my-3 text-gray-500">
            <h1 className="font-bold text-4xl text-center mb-4">Admin</h1>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-around w-full">
              <div>
                <Button onClick={() => setShowAddNewCourse((prev) => !prev)}>
                  Add new course
                </Button>
              </div>
              <div>
                <Button onClick={getAppliedCourses}>
                  Show student registered courses
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setShowAvailableCourses((prev) => !prev);
                    setShowAppliedCourses(false);
                  }}
                >
                  Show Available Courses
                </Button>
              </div>
            </div>
            {showAddNewCourse && <CourseForm title={'Enter new Course'} />}
            <div className="my-2">
              <Button onClick={signOutHandler}>Logout</Button>
            </div>
            <hr className="h-1 w-full" />
            {showAvailableCourses && (
              <div className="w-full">
                <h1 className="font-semibold text-2xl text-center my-8">
                  Available Courses
                </h1>
                <div className="my-3 flex flex-col w-full items-center">
                  {courses.map((course, index) => (
                    <Document
                      course={course}
                      index={index}
                      key={index}
                      isAdmin={true}
                    />
                  ))}
                </div>
              </div>
            )}
            {showAppliedCourses &&
              appliedCourses.map((course, index) => (
                <CourseBox course={course} index={index} key={index} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
