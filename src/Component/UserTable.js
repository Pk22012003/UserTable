import React, { useState, useEffect } from 'react';
import './UserTable.css'; // Import the CSS file

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://dummyjson.com/users');
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data); // Debug output

          let usersData = [];

          // Handle different response structures
          if (Array.isArray(data)) {
            usersData = data;
          } else if (data.users && Array.isArray(data.users)) {
            usersData = data.users;
          } else {
            console.error('Data structure is not as expected.');
          }

          setUsers(usersData);
        } else {
          console.error('Failed to fetch data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <center>
      <h2>User Table</h2>
      </center>
      <table className="user-table">
        <thead>
          <tr>
            <th>S No.</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Domain</th>
            <th>IP</th>
            <th>Email</th>
            <th>University</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td className="cell">{user.id}</td>
                <td className="cell">{user.name || user.username}</td>
                <td className="cell">{user.gender}</td>
                <td className="cell">{user.domain}</td>
                <td className="cell">{user.ip}</td>
                <td className="cell">{user.email}</td>
                <td className="cell">{user.university}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
