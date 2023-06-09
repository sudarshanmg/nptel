'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../Input';
import Button from '../Button';
import { databases } from '@/appwriteConfig';
import { v4 as uuid } from 'uuid';

const CourseForm = (props) => {
  const router = useRouter();
  const [newCourse, setNewCourse] = useState({
    courseTitle: '',
    weeks: '',
  });
  const submitHandler = (e) => {
    e.preventDefault();

    const promise = databases.createDocument(
      '6463a04b309c3d909e05',
      '64664f73235363179d0c',
      uuid(),
      newCourse
    );

    promise.then(
      (res) => {
        console.log(res);
        location.reload();
        setNewCourse({
          courseTitle: '',
          weeks: '',
        });
      },
      (err) => {
        console.log(err);
        setNewCourse({
          courseTitle: '',
          weeks: '',
        });
      }
    );
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
        <h1 className="font-semibold text-2xl text-center mb-4">
          {props.title}
        </h1>
        <form className="space-y-6" onSubmit={submitHandler}>
          <Input
            id="title"
            label="Course Title"
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
            type="text"
            onChange={(e) => {
              setNewCourse((prev) => {
                return { ...prev, weeks: e.target.value };
              });
            }}
          />
          <div>
            <Button fullWidth type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
