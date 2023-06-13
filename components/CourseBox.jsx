import React from 'react';
import Button from './Button';
import { databases } from '@/appwriteConfig';

const CourseBox = (props) => {
  const deleteHandler = async (id) => {
    const promise = databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPLIED_COURSES_ID,
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
  return (
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
        <span className="text-xl font-light">Name: </span>
        {props.course.name}
      </div>
      <div className="text-xl">
        <span className="text-xl font-light">USN: </span>
        {props.course.usn}
      </div>
      <div className="text-xl">
        <span className="text-xl font-light">Weeks: </span>
        {props.course.weeks}
      </div>
      <div className="text-xl">
        <span className="text-xl font-light">Exam date: </span>
        {props.course.examDate}
      </div>
      <div className="text-xl">
        <span className="text-xl font-light">Max. marks: </span>
        {props.course.maxMarks}
      </div>
      <div className="text-xl">
        <span className="text-xl font-light">Obtained marks: </span>
        {props.course.obtainedMarks}
      </div>
      <div className="text-xl">
        <span className="text-xl font-light">Link: </span>
        <a href={props.course.link} className="underline" target="_blank">
          {props.course.link}
        </a>
      </div>
      {props.isUser && (
        <div className="flex my-2">
          <div className="mr-2 w-20">
            <Button>Edit</Button>
          </div>
          <div className="mr-2 w-20">
            <Button danger onClick={deleteHandler.bind(null, props.course.$id)}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseBox;
