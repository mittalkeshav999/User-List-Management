import React from "react";
import axios from "axios";

const EditUser = (props) => {
  const { setUsers, user, users, setIsOpen, setUser } = props

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, user);
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      alert("User updated successfully!");
      setIsOpen(false);
    } catch (error) {
      alert("Failed to update user.");
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content p-4">
          <h2>Edit User</h2>
          <form onSubmit={handleUpdate}>
            <input type="text" className="form-control mb-2" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} required />
            <input type="text" className="form-control mb-2" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} required />
            <input type="email" className="form-control mb-2" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
            <button type="submit" className="btn btn-success">Update</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsOpen(false)}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
