import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { FaEdit, FaTrash } from "react-icons/fa";

function UserList() {
  // State to hold fetched users and local storage users
  const [users, setUsers] = useState([]);

  // State to handle any errors during fetching or deleting users
  const [error, setError] = useState(null);

  // State to manage the loading status
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to fetch users when the component is mounted
  useEffect(() => {
    fetchUsers(); // Fetch users from API and local storage

    // Event listener to refetch users when localStorage is updated (e.g., on user edit)
    window.addEventListener("storage", fetchUsers);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", fetchUsers);
    };
  }, []);

  // Function to fetch users from an external API and localStorage
  const fetchUsers = async () => {
    try {
      setIsLoading(true); // Set loading state to true during the API call

      // Fetch users from a mock API
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      // Get locally stored users from localStorage
      const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // Combine API users with locally stored users
      setUsers([...response.data, ...localUsers]);
    } catch (err) {
      // Set an error message if the fetch fails
      setError("Failed to fetch users. Please try again later.");
    } finally {
      // Set loading to false once the fetch is completed
      setIsLoading(false);
    }
  };

  // Function to delete a user from both the API and localStorage
  const deleteUser = async (id) => {
    try {
      // Delete the user from the mock API (only simulates deletion)
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

      // Fetch users from localStorage
      const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // Remove the deleted user from localStorage
      const updatedLocalUsers = localUsers.filter((user) => user.id !== id);
      localStorage.setItem("users", JSON.stringify(updatedLocalUsers));

      // Update the state to reflect the user deletion
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      // Set an error message if the delete fails
      setError("Failed to delete user. Please try again later.");
    }
  };

  // If there is an error, display the error message
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="p-20 bg-black">
      {/* Heading for the User List */}
      <h2 className="text-4xl font-semibold mb-6 text-center italic text-white">
        User List
      </h2>

      <div className="overflow-x-auto">
        {/* Display loading spinner if the data is still being fetched */}
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
              {/* Map through the list of users and display each one in a row */}
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700 hover:bg-[#2a2a2a]"
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    {/* Edit user button */}
                    <Link
                      to={`/user/${user.id}`}
                      className="flex items-center justify-center w-10 h-10"
                    >
                      <FaEdit size={18} color="#ff5757" />
                    </Link>

                    {/* Delete user button */}
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
