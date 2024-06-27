"use client";
import React, { useState } from "react";

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number | string;
}

export default function GPACalc() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Course #1", grade: "", credits: "" },
    { id: 2, name: "Course #2", grade: "", credits: "" },
    { id: 3, name: "Course #3", grade: "", credits: "" },
    { id: 4, name: "Course #4", grade: "", credits: "" },
  ]);

  const handleAddCourse = () => {
    setCourses([
      ...courses,
      {
        id: courses.length + 1,
        name: `Course #${courses.length + 1}`,
        grade: "",
        credits: "",
      },
    ]);
  };

  const handleRemoveCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleChange = (id: number, field: keyof Course, value: string) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    const gradePoints: { [key: string]: number } = {
      A: 4,
      "A-": 3.7,
      "B+": 3.3,
      B: 3,
      "B-": 2.7,
      "C+": 2.3,
      C: 2,
      "C-": 1.7,
      "D+": 1.3,
      D: 1,
      F: 0,
    };

    courses.forEach((course) => {
      if (
        course.grade in gradePoints &&
        parseFloat(course.credits.toString()) > 0
      ) {
        totalCredits += parseFloat(course.credits.toString());
        totalPoints +=
          gradePoints[course.grade] * parseFloat(course.credits.toString());
      }
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  const handleReset = () => {
    setCourses(
      courses.map((course) => ({ ...course, grade: "", credits: "" }))
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">GPA Calculator</h1>

        <div className="mt-6 w-full max-w-xl">
          <div className="grid grid-cols-4 gap-4">
            <div>Course (optional)</div>
            <div>Grade</div>
            <div>Credits</div>
            <div></div>
          </div>
          {courses.map((course) => (
            <div key={course.id} className="flex items-center space-x-4 mt-4">
              <input
                type="text"
                value={course.name}
                onChange={(e) =>
                  handleChange(course.id, "name", e.target.value)
                }
                className="border p-2 w-1/3 text-black"
                placeholder="Course (optional)"
              />
              <input
                type="text"
                value={course.grade}
                onChange={(e) =>
                  handleChange(course.id, "grade", e.target.value)
                }
                className="border p-2 w-1/3 text-black"
                placeholder="Grade"
              />
              <input
                type="number"
                value={course.credits}
                onChange={(e) =>
                  handleChange(course.id, "credits", e.target.value)
                }
                className="border p-2 w-1/3 text-black"
                placeholder="Credits"
              />
              <button
                onClick={() => handleRemoveCourse(course.id)}
                className="text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={handleAddCourse}
            className="mt-4 p-2 bg-blue-600 text-white rounded"
          >
            + Add row
          </button>

          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleReset}
              className="p-2 bg-gray-600 text-white rounded"
            >
              ✖ Reset
            </button>
            <button
              onClick={calculateGPA}
              className="p-2 bg-green-600 text-white rounded"
            >
              = Calculate
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-lg">GPA</label>
            <input
              type="text"
              value={calculateGPA()}
              readOnly
              className="border p-2 w-full text-black"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
