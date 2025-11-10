import React, { useState } from "react";
import './App.css'
function GPACalculator() 
{
  const [courses, setCourses] = useState([{name: "",creditHours: "",grade: "" }]);
  const gradeToGPA = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 };

  const addCourse = () => 
    {
    if (courses.length < 10) {
      setCourses([...courses, {name: "",creditHours: "",grade: "" }]);
    } 
    else {
      alert("Maximum 10 courses allowed!");
    }
  };

  const removeCourse = (index) => 
    {
    if (courses.length > 1) {
      const updatedCourses = courses.filter((_, i) => i !== index);
      setCourses(updatedCourses);
    } 
    else {
      alert("At least one course must remain!");
    }
  };

  const handleInputChange = (index, field, value) => 
    {
    const updatedCourses=[...courses];
    updatedCourses[index][field]=value;
    setCourses(updatedCourses);
  };
  const calculateGPA = () => 
    {
    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach((course) => 
      {
      const credit = parseFloat(course.creditHours);
      const gpa = gradeToGPA[course.grade];
      if (!isNaN(credit) && gpa !== undefined) 
        {
        totalCredits += credit;
        totalPoints += credit * gpa;
      }
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };
  return (
    <div className="gpa-calculator">
      <h2>GPA Calculator</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Remove Course</th>
            <th>Course Name</th>
            <th>Credit Hour</th>
            <th>Grade Selection</th>
            <th>Add Course</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>
                <button onClick={() => removeCourse(index)}>-</button>
              </td>
              <td>
                <input type="text" value={course.name} onChange={(e) => handleInputChange(index, "name", e.target.value)}placeholder="Course Name"required/>
              </td>
              <td>
                <input type="number" value={course.creditHours} onChange={(e) => handleInputChange(index, "creditHours", e.target.value)} min="1" max="3" required/>
              </td>
              <td>
                <select value={course.grade} onChange={(e) => handleInputChange(index, "grade", e.target.value)} required>
                  <option value="">Select Grade</option>
                  <option value="A">A (4.0)</option>
                  <option value="B">B (3.0)</option>
                  <option value="C">C (2.0)</option>
                  <option value="D">D (1.0)</option>
                  <option value="F">F (0.0)</option>
                </select>
              </td>
              {index === courses.length - 1 && (
                <td>
                  <button onClick={addCourse}>+</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <h3>GPA: {calculateGPA()}</h3>
    </div>
  );
}

export default GPACalculator;
