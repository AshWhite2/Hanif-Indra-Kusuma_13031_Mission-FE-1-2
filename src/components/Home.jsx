import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Home = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', phone: '', address: '' });
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = () => {
    if (newUser.username.trim() !== '' && newUser.phone.trim() !== '' && newUser.address.trim() !== '') {
      setUsers([...users, newUser]);
      setNewUser({ username: '', phone: '', address: '' });
    }
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setNewUser(users[index]);
  };

  const saveEdit = () => {
    const updatedUsers = [...users];
    updatedUsers[editIndex] = newUser;
    setUsers(updatedUsers);
    setEditIndex(null);
    setNewUser({ username: '', phone: '', address: '' });
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setNewUser({ username: '', phone: '', address: '' });
  };

  const handleRemove = () => {
    localStorage.removeItem('user'); 
    navigate('/Login');
  };

  return (
    <div className="home-container">
      
      <nav className="navbar">
        <h2>User Management System</h2>
        <button onClick={handleRemove} className="logout-button">Remove
        </button>
        <a href="/login">Logout</a> 
        
      </nav>

      
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="phone"
                    value={newUser.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="address"
                    value={newUser.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.address
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <>
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(index)}>Edit</button>
                    <button onClick={() => deleteUser(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div className="add-user-form">
        <h3>Add New User</h3>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newUser.phone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newUser.address}
          onChange={handleInputChange}
        />
        <button onClick={addUser}>Add User</button>
      </div>
    </div>
  );
};

export default Home;