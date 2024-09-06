import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { FaEdit, FaTrash } from "react-icons/fa";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();

    // Refetch users when local storage changes (e.g., after editing)
    window.addEventListener("storage", fetchUsers);

    return () => {
      window.removeEventListener("storage", fetchUsers);
    };
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
      setUsers([...response.data, ...localUsers]);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedLocalUsers = localUsers.filter((user) => user.id !== id);
      localStorage.setItem("users", JSON.stringify(updatedLocalUsers));
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user. Please try again later.");
    }
  };

  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="p-20 bg-black">
      <h2 className="text-4xl font-semibold mb-6 text-center italic text-white">
        User List
      </h2>
      <div className="overflow-x-auto">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <table className="min-w-full table-auto bg-[#1e1e1e] shadow-lg text-white rounded-lg">
            <thead>
              <tr className="bg-[#3a3a3a]">
                <th className="px-6 py-4 text-left font-semibold">Name</th>

                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Phone</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700 hover:bg-[#2a2a2a]"
                >
                  <td className="px-6 py-4">{user.name}</td>

                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <Link
                      to={`/user/${user.id}`}
                      className="flex items-center justify-center w-10 h-10"
                    >
                      <FaEdit size={18} color="#ff5757" />
                    </Link>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="flex items-center justify-center w-10 h-10"
                    >
                      <FaTrash size={18} color="#ff5757" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserList;
