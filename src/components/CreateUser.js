import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

function CreateUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        user
      );
      const newUser = { ...response.data, id: Date.now() };
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      localStorage.setItem(
        "users",
        JSON.stringify([...existingUsers, newUser])
      );
      navigate("/");
    } catch (err) {
      setError("Failed to create user. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (error) return <div className="text-red-600 text-center">{error}</div>;
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-gray-800 text-white p-10 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Create New User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
