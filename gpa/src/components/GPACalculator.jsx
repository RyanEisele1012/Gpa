import React, { useState } from 'react';

const GPACalculator = () => {
  const [grades, setGrades] = useState([]);
  const [gpa, setGPA] = useState(null);

  const handleAddGrade = () => {
    const newGrade = parseFloat(prompt('Enter your grade (0-100):'));
    if (!isNaN(newGrade) && newGrade >= 0 && newGrade <= 100) {
      const newWeight = parseFloat(prompt('Enter the weight of this grade (percentage):'));
      if (!isNaN(newWeight) && newWeight >= 0 && newWeight <= 100) {
        setGrades([...grades, { grade: newGrade, weight: newWeight }]);
      } else {
        alert('Invalid weight entered. Please enter a number between 0 and 100.');
      }
    } else {
      alert('Invalid grade entered. Please enter a number between 0 and 100.');
    }
  };

  const calculateGPA = () => {
    const totalCredits = grades.length;
    if (totalCredits === 0) {
      alert('Please add at least one grade to calculate GPA.');
      return;
    }

    const totalWeightedGrade = grades.reduce((acc, gradeObj) => acc + (gradeObj.grade * gradeObj.weight / 100), 0);
    const totalWeight = grades.reduce((acc, gradeObj) => acc + gradeObj.weight, 0);
    const gpa = (totalWeightedGrade / totalWeight) * 100; // Convert GPA to percentage
    setGPA(gpa.toFixed(2));
  };

  const resetCalculator = () => {
    setGrades([]);
    setGPA(null);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>GPA Calculator</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <button className="button" onClick={handleAddGrade}>Add Grade</button>
          <button className="button" onClick={calculateGPA}>Calculate GPA</button>
          <button className="button" onClick={resetCalculator}>Reset</button>
        </div>
        <ul>
          {grades.map((gradeObj, index) => (
            <li key={index}>Grade: {gradeObj.grade}%, Weight: {gradeObj.weight}%</li>
          ))}
        </ul>
        {gpa !== null && <p className="result">Your GPA: {gpa}%</p>}
      </div>
    </div>
  );
};

export default GPACalculator;
