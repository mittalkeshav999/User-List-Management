import React, { useEffect, useState } from "react";
import axios from "axios";
import EditUser from "./EditUser";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [user, setUser] = useState({ id: "", first_name: "", last_name: "", email: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Failed to delete user.");
    }
  };

  // **Filter users based on search input**
  let filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase())
  );

  if (sortOrder === "Ascending") {
    filteredUsers = filteredUsers.sort((a, b) =>
      (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name)
    );
  } else if (sortOrder === "Descending") {
    filteredUsers = filteredUsers.sort((a, b) =>
      (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name)
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-3">
        <h2>User List</h2>
        <div className="mx-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type Name to Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <select className="form-select" onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Select Order</option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </div>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>
                  <img src={u.avatar} alt="avatar" width="50" />
                </td>
                <td>
                  {u.first_name} {u.last_name}
                </td>
                <td>{u.email}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setUser({ ...u });
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isOpen && (
        <EditUser user={user} setUsers={setUsers} setIsOpen={setIsOpen} setUser={setUser} users={users} />
      )}

      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-primary" disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button className="btn btn-primary" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
