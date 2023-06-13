'use client';

import { account, databases } from '@/appwriteConfig';
import { Query } from 'appwrite';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import CourseBox from '@/components/CourseBox';
import { getCourses } from '../actions/getCourses';
import Document from '@/components/Document';

const Profile = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [addCourse, setAddCourse] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [courses, setCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [displayAvailableCourses, setDisplayAvailableCourses] = useState([]);
  const [appliedCourses, setAppliedCourses] = useState([]);

  const [displayCourses, setDisplayCourses] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    usn: '',
    courseTitle: '',
    weeks: '',
    obtainedMarks: '',
    maxMarks: '',
    user_id: '',
    examDate: '',
    link: '',
  });

  useEffect(() => {
    setLoading(true);
    const getAccount = async () => {
      const promise = account.get();
      promise.then(
        function (response) {
          setName(response.name);
          setId(response.$id);
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

  const getAvailableCourses = async () => {
    const promise = getCourses();
    setDisplayCourses(false);
    promise.then(
      function (response) {
        setAvailableCourses(response.documents);
        setDisplayAvailableCourses(true);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const submitHandler = async () => {
    const promise = databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPLIED_COURSES_ID,
      uuid(),
      newCourse
    );

    promise.then(
      (res) => {
        console.log(res);
        location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const getAppliedCoursesHandler = async () => {
    setDisplayAvailableCourses(false);
    const promise = databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPLIED_COURSES_ID,
      [Query.equal('user_id', id)]
    );

    promise.then(
      (response) => {
        setAppliedCourses(response.documents);
        console.log(response.documents);
        setDisplayCourses(true);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  return (
    <>
      {loading ? (
        <p> Loading.. </p>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-center text-2xl font-semibold text-gray-600 m-2">
              Welcome {name}!
            </h1>
            <div>
              <Button onClick={signOutHandler}>Logout</Button>
            </div>
          </div>
          <hr className="w-full h-1 my-4" />
          <div className="flex justify-around w-full">
            {!addCourse && (
              <div>
                <Button
                  onClick={() => {
                    setAddCourse(true);
                  }}
                >
                  Add a registered course
                </Button>
              </div>
            )}
            <div>
              <Button onClick={getAppliedCoursesHandler}>
                Show Applied Courses
              </Button>
            </div>
            <div>
              <Button onClick={getAvailableCourses}>
                Show Available Courses
              </Button>
            </div>
          </div>
          {addCourse && (
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
                <h1 className="font-semibold text-2xl text-center mb-4">
                  {'Add a Course'}
                </h1>
                <form
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Input
                    id="title"
                    label="Your Name"
                    type="text"
                    onChange={(e) => {
                      setNewCourse((prev) => {
                        return { ...prev, name: e.target.value, user_id: id };
                      });
                    }}
                  />
                  <Input
                    id="usn"
                    label="USN"
                    type="text"
                    onChange={(e) => {
                      setNewCourse((prev) => {
                        return { ...prev, usn: e.target.value.toLowerCase() };
                      });
                    }}
                  />
                  <Input
                    id="title"
                    label="Course title"
                    type="text"
                    onChange={(e) => {
                      setNewCourse((prev) => {
                        return { ...prev, courseTitle: e.target.value };
                      });
                    }}
                  />
                  <Input
                    id="weeks"
                    label="Duration in weeks"
                    type="number"
                    onChange={(e) => {
                      setNewCourse((prev) => {
                        return { ...prev, weeks: e.target.value };
                      });
                    }}
                  />
                  <Input
                    id="date"
                    label="Exam date"
                    type="date"
                    onChange={(e) => {
                      setNewCourse((prev) => {
                        return { ...prev, examDate: e.target.value };
                      });
                    }}
                  />
                  <Input
                    id="maxMarks"
                    label="Max. marks"
                    type="number"
                    onChange={(e) => {
                      setNewCourse((prev) => {
                        return { ...prev, maxMarks: e.target.value };
                      });
                    }}
                  />
                  <Input
                    id="obtainedMarks"
                    label="Obtained marks"
                    type="number"
                    onChange={(e) => {
                      setNewCourse((prev) => {
                        return { ...prev, obtainedMarks: e.target.value };
                      });
                    }}
                  />
                  <Input
                    id="link"
                    label="Certificate link"
                    type="text"
                    onChange={(e) => {
                      setNewCourse((prev) => {
                        return { ...prev, link: e.target.value };
                      });
                    }}
                  />

                  <div className="mb-1">
                    <Button fullWidth onClick={submitHandler}>
                      Submit
                    </Button>
                  </div>
                  <div>
                    <Button onClick={() => setAddCourse(false)}>Close</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {displayCourses &&
            appliedCourses.map((course, index) => (
              <CourseBox
                course={course}
                index={index}
                key={index}
                isUser={true}
              />
            ))}
          {displayAvailableCourses &&
            availableCourses.map((course, index) => (
              <Document
                course={course}
                index={index}
                key={index}
                isAdmin={false}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default Profile;
