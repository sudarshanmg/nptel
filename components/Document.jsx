'use client';

import { useState } from 'react';
import Button from './Button';
import Input from './Input';

import { databases } from '@/appwriteConfig';

const Document = (props) => {
  const [editedCourse, setEditedCourse] = useState({
    courseTitle: props.course.courseTitle,
    weeks: props.course.week,
    examDate: props.course.examDate,
  });

  const [edit, setEdit] = useState(false);

  const deleteHandler = async (id) => {
    const promise = databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_COURSES_ID,
      id
    );

    promise.then(
      function (response) {
        alert('Deleted Successfully!');
        location.reload(); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const editHandler = (id) => {
    console.log(editedCourse);
    const promise = databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_COURSES_ID,
      id,
      editedCourse
    );

    promise
      .then(
        function (response) {
          location.reload();
          console.log(response); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      )
      .finally(() => {
        setEdit(false);
      });
  };
  return (
    <>
      {!edit && (
        <div className="flex flex-col justify-center my-2 w-5/6 p-4 shadow-md rounded-md text-2xl">
          <div className="text-2xl my-1 text-center font-semibold">
            {props.course.courseTitle}
          </div>
          <hr className="w-full h-[2px] my-1 bg-gray-500 border-none" />
          <div className="text-xl">
            <span className="text-xl font-light">No: </span>
            {props.index + 1}
          </div>
          <div className="text-xl">
            <span className="text-xl font-light">Weeks: </span>
            {props.course.weeks}
          </div>
          <div className="text-xl">
            <span className="text-xl font-light">Exam date: </span>
            {props.course.examDate}
          </div>
          {props.isAdmin && (
            <div className="flex my-2">
              <div className="mr-2 w-20">
                <Button onClick={() => setEdit(true)}>Edit</Button>
              </div>
              <div className="mr-2 w-20">
                <Button
                  danger
                  onClick={deleteHandler.bind(null, props.course.$id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {edit && (
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
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <Input
                id="title"
                label="Course Title"
                type="text"
                onChange={(e) => {
                  setEditedCourse((prev) => {
                    return { ...prev, courseTitle: e.target.value };
                  });
                }}
                placeholder={props.course.courseTitle}
              />

              <Input
                id="weeks"
                label="Duration in weeks"
                type="text"
                onChange={(e) => {
                  setEditedCourse((prev) => {
                    return { ...prev, weeks: e.target.value };
                  });
                }}
                placeholder={props.course.weeks}
              />

              <Input
                id="date"
                label="Exam date"
                type="date"
                onChange={(e) => {
                  setEditedCourse((prev) => {
                    return { ...prev, examDate: e.target.value };
                  });
                }}
                placeholder={props.course.examDate}
              />
              <div className="mb-1">
                <Button
                  fullWidth
                  onClick={editHandler.bind(null, props.course.$id)}
                >
                  Submit
                </Button>
              </div>
              <div>
                <Button onClick={() => setEdit(false)}>Close</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Document;
