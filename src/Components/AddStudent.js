import React, { useState } from 'react';
import styles from './StudentForm.module.css'; // Import CSS module

const AddStudent = ()=> {
  const [name, setName] = useState('');
  const [usn, setUsn] = useState('');
  const [ia1, setIa1] = useState(0);
  const [ia2, setIa2] = useState(0);
  const [ia3, setIa3] = useState(0);
  const [assignment1, setAssignment1] = useState(0);
  const [assignment2, setAssignment2] = useState(0);
  const [cie, setCie] = useState(0);
  const [section, setSection] = useState('');
  const [batch, setBatch] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'usn':
        setUsn(value.toUpperCase()); // Convert USN to uppercase
        break;
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
      case 'section':
        setSection(value);
        break;
      case 'batch':
        setBatch(value);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation logic
    let isValid = true;
    let errorMessage = '';

    if (name === '') {
      isValid = false;
      errorMessage += 'Name cannot be empty\n';
    }
    if (usn === '') {
      isValid = false;
      errorMessage += 'USN cannot be empty\n';
    }
    if (section === '') {
      isValid = false;
      errorMessage += 'Section cannot be empty\n';
    }
    // You can add similar checks for other numeric fields

    if (!isValid) {
      alert('Please fill in the following fields:\n' + errorMessage);
      return; // Prevent further form submission
    }
    console.log({
      name,
      usn,
      ia1,
      ia2,
      ia3,
      assignment1,
      assignment2,
      cie,
    });
    // You can clear the form or perform other actions here
  };

  return (<div className={styles.formContainer}>
        <h1>Enter Student Details</h1>
    <form onSubmit={handleSubmit} className={styles.form}>
        <div className="formColumn">
            <div className={styles.formGroup}>
                <label htmlFor="name">Name </label>
                <input type="text" id="name" name="name" placeholder='Enter Name' value={name} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="usn">USN </label>
                <input type="text" id="usn" name="usn" value={usn} placeholder='Enter USN' onChange={handleChange} maxLength={10} required pattern="[A-Z0-9]+" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="section">Section</label>
                <input type="text" id="section" name="section" value={section} placeholder='Section' onChange={handleChange} required pattern='^[AB]$'/>
            </div>

        </div>
            <div className="formColumn">
                <div className={styles.formGroup}>
                    <label htmlFor="ia1">IA 1 </label>
                    <input type="number" id="ia1" name="ia1" value={ia1} onChange={handleChange} min={0} max={20} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="ia2">IA 2 </label>
                    <input type="number" id="ia2" name="ia2" value={ia2} onChange={handleChange} min={0} max={20} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="ia3">IA 3 </label>
                    <input type="number" id="ia3" name="ia3" value={ia3} onChange={handleChange} min={0} max={20} required />
                </div>
            </div>
        <div className="formColumn">
            <div className={styles.formGroup}>
                <label htmlFor="assignment1">Assignment 1 </label>
                <input type="number" id="assignment1" name="assignment1" value={assignment1} onChange={handleChange} min={0} max={10} required />
            </div>
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