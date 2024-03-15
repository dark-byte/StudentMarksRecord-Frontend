import React, { useState } from 'react';
import styles from './StudentForm.module.css'; // Import CSS module
import Navbar from './Nav';

const AddStudent = ()=> {
  const [subCode, setSubCode] = useState('');
  const [usn, setUsn] = useState('');
  const [ia1, setIa1] = useState(0);
  const [ia2, setIa2] = useState(0);
  const [ia3, setIa3] = useState(0);
  const [assignment1, setAssignment1] = useState(0);
  const [assignment2, setAssignment2] = useState(0);
  const [cie, setCie] = useState(0);
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'usn':
        setUsn(value.toUpperCase()); // Convert USN to uppercase
        break;
      case 'subCode':
        setSubCode(value)
      case 'ia1':
      case 'ia2':
      case 'ia3':
        setIa(name, value); // Helper function for IA fields
        break;
      case 'assignment1':
      case 'assignment2':
        setAssignment(name, value); // Helper function for assignment fields
        break;
      case 'cie':
        setCie(value);
        break;
      default:
        break;
    }
  };

  const setIa = (fieldName, value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 20) {
      switch (fieldName) {
        case 'ia1':
          setIa1(parsedValue);
          break;
        case 'ia2':
          setIa2(parsedValue);
          break;
        case 'ia3':
          setIa3(parsedValue);
          break;
        default:
          break;
      }
    }
  };

  const setAssignment = (fieldName, value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 10) {
      switch (fieldName) {
        case 'assignment1':
          setAssignment1(parsedValue);
          break;
        case 'assignment2':
          setAssignment2(parsedValue);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation logic
    let isValid = true;
    let errorMessage = '';

    if (usn === '') {
      isValid = false;
      errorMessage += 'USN cannot be empty\n';
    }

    // You can add similar checks for other numeric fields

    if (!isValid) {
      alert('Please fill in the following fields:\n' + errorMessage);
      return; // Prevent further form submission
    }
  // Prepare the data object to send to the server
  const data = {
    subCode, // Use state values directly
    usn,
    ia1,
    ia2,
    ia3,
    assignment1,
    assignment2,
    cie,
  };

  // Make the POST request using fetch API
  try {
    const response = await fetch('http://localhost:3000/marks', {
      method: 'POST', // Set the HTTP method to POST
      headers: { 'Content-Type': 'application/json' }, // Set content type as JSON
      body: JSON.stringify(data), // Convert data object to JSON string for body
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Handle successful response (optional)
    console.log('Marks submitted successfully!');
    alert("Data Added Successfully!")

  } catch (error) {
    console.error('Error submitting marks:', error);
    // Handle errors appropriately (e.g., show an error message to the user)
  }
};

  return (<div className={styles.formContainer}>
    <Navbar/>
        <h1>Enter Student Details</h1>
    <form onSubmit={handleSubmit} className={styles.form}>
        <div className="formColumn">
            <div className={styles.formGroup}>
                <label htmlFor="usn">USN </label>
                <input type="text" id="usn" name="usn" value={usn} placeholder='Enter USN' onChange={handleChange} maxLength={10} required pattern="[A-Z0-9]+" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="subCode">Subject Code</label>
                <input type="text" id="subCode" name="subCode" value={subCode} placeholder='Subject Code' onChange={handleChange} required pattern='[A-Z0-9]+'/>
            </div>
                <div className={styles.formGroup}>
                    <label htmlFor="ia1">IA 1 </label>
                    <input type="number" id="ia1" name="ia1" value={ia1} onChange={handleChange} min={0} max={20} required />
                </div>

        </div>
            <div className="formColumn">
                <div className={styles.formGroup}>
                    <label htmlFor="ia2">IA 2 </label>
                    <input type="number" id="ia2" name="ia2" value={ia2} onChange={handleChange} min={0} max={20} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="ia3">IA 3 </label>
                    <input type="number" id="ia3" name="ia3" value={ia3} onChange={handleChange} min={0} max={20} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="assignment1">Assignment 1 </label>
                    <input type="number" id="assignment1" name="assignment1" value={assignment1} onChange={handleChange} min={0} max={10} required />
                </div>
            </div>
        <div className="formColumn">
            <div className={styles.formGroup}>
                <label htmlFor="assignment2">Assignment 2 </label>
                <input type="number" id="assignment2" name="assignment2" value={assignment2} onChange={handleChange} min={0} max={10} required />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="cie">CIE Component </label>
                <input type="number" id="cie" name="cie" value={cie} onChange={handleChange} min={0} max={20} required />
            </div>
        </div>
      
    </form>
      <div className="submitButtonContainer">
        <button type="submit" onClick={handleSubmit} className={styles.submitButton}>Add Student</button>
      </div>

    </div>
  )
}

export default AddStudent;