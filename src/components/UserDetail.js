import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

function UserDetail() {
  // Extract the user ID from the URL parameters
  const { id } = useParams();
  // Hook for navigation after updating the user
  const navigate = useNavigate();

  // State to hold the user details
  const [user, setUser] = useState(null);

  // State to handle errors during data fetching or submission
  const [error, setError] = useState(null);

  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to fetch user details when the component is mounted or the ID changes
  useEffect(() => {
    fetchUser(); // Fetch user data based on ID
  }, [id]);

  // Function to fetch the user details either from local storage or the API
  const fetchUser = async () => {
    try {
      setIsLoading(true); // Set loading state to true while fetching data

      // Fetch users from local storage
      const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
      // Try to find the user in local storage by matching the ID
      const localUser = localUsers.find((u) => u.id.toString() === id);

      // If the user exists in local storage, use that data
      if (localUser) {
        setUser(localUser);
      } else {
        // Otherwise, fetch user details from the API
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(response.data);
      }
    } catch (err) {
      // If an error occurs during fetch, show error message
      setError("Failed to fetch user details. Please try again later.");
    } finally {
      // Stop showing the loading spinner after fetching completes
      setIsLoading(false);
    }
  };

  // Function to handle form submission when updating the user details
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      setIsLoading(true); // Set loading to true during the update request

      // Update the user details via API call (simulation with a placeholder)
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);

      // Update the user in local storage if they exist there
      const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = localUsers.map((u) =>
        u.id.toString() === id ? { ...user, id: u.id } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Navigate back to the user list page after updating
      navigate("/");
    } catch (err) {
      // Set an error message if the update fails
      setError("Failed to update user. Please try again later.");
    } finally {
      // Stop the loading spinner after the request completes
      setIsLoading(false);
    }
  };

  // Function to handle changes in the form inputs and update user state
  const handleChange = (e) => {
    // Dynamically update the user field based on the input name and value
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Render an error message if one exists
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  // Show the loading spinner while the data is being fetched
  if (isLoading) return <LoadingSpinner />;

  // If no user data is available, return null (this avoids rendering issues)
  if (!user) return null;

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-gray-800 text-white p-10 rounded-md shadow-lg max-w-md w-full">
        {/* Header for the Edit User form */}
        <h2 className="text-3xl font-semibold mb-6 text-center">Edit User</h2>

        {/* Form for editing user details */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input field for user name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 bg-gray-700 text-white border-none rounded-md shadow-sm focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Input field for user email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 bg-gray-700 text-white border-none rounded-md shadow-sm focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Input field for user phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-white"
            >
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 bg-gray-700 text-white border-none rounded-md shadow-sm focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Submit button to update the user details */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-md font-medium"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserDetail;
