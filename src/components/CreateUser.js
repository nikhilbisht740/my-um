import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

function CreateUser() {
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // State to hold the new user's information
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  // State to track if an error occurs during the creation process
  const [error, setError] = useState(null);

  // State to manage whether the loading spinner is displayed
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      setIsLoading(true); // Show loading spinner while creating user

      // Make a POST request to create a new user (simulated via jsonplaceholder)
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        user
      );

      // Add a local ID for the new user (since jsonplaceholder doesn’t persist data)
      const newUser = { ...response.data, id: Date.now() };

      // Retrieve existing users from localStorage, or default to an empty array
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // Save the new user along with the existing users back to localStorage
      localStorage.setItem(
        "users",
        JSON.stringify([...existingUsers, newUser])
      );

      // Navigate back to the main user list after successful creation
      navigate("/");
    } catch (err) {
      // Set an error message if the user creation fails
      setError("Failed to create user. Please try again later.");
    } finally {
      // Stop showing the loading spinner once request completes
      setIsLoading(false);
    }
  };

  // Function to handle changes to form inputs and update the user state
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Display an error message if an error occurs
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  // Display a loading spinner while the user creation is in progress
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-gray-800 text-white p-10 rounded-md shadow-lg max-w-md w-full">
        {/* Title for the Create User form */}
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Create New User
        </h2>

        {/* Form for creating a new user */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input field for the user's name */}
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 bg-gray-700 text-white border-none rounded-md shadow-sm focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Input field for the user's email */}
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 bg-gray-700 text-white border-none rounded-md shadow-sm focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Input field for the user's phone number */}
          <div>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={user.phone}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 bg-gray-700 text-white border-none rounded-md shadow-sm focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Submit button to create the user */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-md font-medium"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
