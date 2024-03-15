import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Admin.module.css'; // Import CSS module
import Navbar from './Nav';

function Home() {
  const [usn, setUsn] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setUsn(event.target.value);
  };

  const handleSubmit = async () => {
    if (!usn) {
      alert('Please enter USN');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/marks/${usn}`);
      setStudentData(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setStudentData([]); // Clear data when component mounts
  }, []);

  return (
    <div className={styles.container}>
      <Navbar/>
      <h2>Get Your Marks</h2>
      <div className={styles.searchAndButton}>
        <input
          type="text"
          placeholder="Enter USN"
          value={usn}
          onChange={handleChange}
          className={styles.searchInput}
        />
        <button onClick={handleSubmit} disabled={isLoading} className={styles.submitButton + " homeBtn"}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
      {studentData.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Name</th>
              <th>Batch</th>
              <th>Section</th>
              <th>IA 1</th>
              <th>IA 2</th>
              <th>IA 3</th>
              <th>Assignment 1</th>
              <th>Assignment 2</th>
              <th>CIE Component</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student) => (
              <tr key={student.sub_code}>
                <td>{student.sub_code}</td>
                <td>{student.Name}</td>
                <td>{student.batch}</td>
                <td>{student.section}</td>
                <td>{student.IA1}</td>
                <td>{student.IA2}</td>
                <td>{student.IA3}</td>
                <td>{student.Assignment1}</td>
                <td>{student.Assignment2}</td>
                <td>{student.CIE_Component}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
