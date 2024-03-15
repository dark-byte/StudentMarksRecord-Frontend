import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Admin.module.css'; // Import CSS module
import Navbar from './Nav';

function Admin() {
  const [batch, setBatch] = useState('');
  const [section, setSection] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(false);
  const [subCode, setSubCode] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'batch':
        setBatch(value);
        break;
      case 'section':
        setSection(value);
        break;
      case 'subCode':
        setSubCode(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (!batch || !section) {
      alert('Please select Batch and Section');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/students/${batch}/${subCode}/${section}`);
      setData(response.data);
      setWarning(true)
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Clear data and error when selection changes
    setData([]);
    setError(null);
    setWarning(false)
  }, [batch, section]);

  const calculateTotal = (studentData) => {
    const iaTotal = studentData['IA1'] + studentData['IA2'] + studentData['IA3'];
    const assignmentTotal = studentData['Assignment1'] + studentData['Assignment2'];
    return iaTotal + assignmentTotal + studentData['CIE_Component'];
  };

  const calculateReducedTotal = (total) => {
    return Math.floor(total * 0.5); // Reduce to 50%
  };

  return (
    <div className={styles.container}>
      <Navbar/>
      <h1>Student Data</h1>
      <div className={styles.dropdownAndButton}>
        <select value={batch} onChange={handleChange} name="batch" className={styles.dropdown}>
          <option value="">Select Batch</option>
          {/* Replace with options for available batches */}
          <option value="24">24</option>
          <option value="25">25</option>
        </select>
        <select value={section} onChange={handleChange} name="section" className={styles.dropdown}>
          <option value="">Select Section</option>
          {/* Replace with options for available sections */}
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>
        <select value={subCode} onChange={handleChange} name="subCode" className={styles.dropdown}>
          <option value="">Subject Code</option>
          {/* Replace with options for available sections */}
          <option value="21CS51">21CS51</option>
          <option value="21CS52">21CS52</option>
          <option value="21CS53">21CS53</option>
          <option value="21CS54">21CS54</option>
          <option value="21CS55">21CS55</option>
        </select>
        <button onClick={handleSubmit} disabled={isLoading} className={styles.submitButton}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
      {warning && data.length === 0 && <p className={styles.errorMessage}>No Record Found!</p>}
      {data.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>USN</th>
              <th>IA 1</th>
              <th>IA 2</th>
              <th>IA 3</th>
              <th>Assignment 1</th>
              <th>Assignment 2</th>
              <th>CIE Component</th>
              <th>Total</th>
              <th>Reduced to 50</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student['USN']} className={styles.tableRow}>
                <td>{student['Name']}</td>
                <td>{student['USN']}</td>
                <td>{student['IA1']}</td>
                <td>{student['IA2']}</td>
                <td>{student['IA3']}</td>
                <td>{student['Assignment1']}</td>
                <td>{student['Assignment2']}</td>
                <td>{student['CIE_Component']}</td>
                <td>{calculateTotal(student)}</td>
                <td>{calculateReducedTotal(calculateTotal(student))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;