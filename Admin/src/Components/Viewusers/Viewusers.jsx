import { useEffect, useState } from "react";
import "./Viewusers.css";

const Viewusers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => {
        if (data.success) setUsers(data.users);
      });
  }, []);

  return (
    <div className="view-users-container">
      <h2>Registered Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.plain_password}</td> {/* 👈 Show raw password */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Viewusers;
