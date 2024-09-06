import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const localUser = localUsers.find((u) => u.id.toString() === id);

      if (localUser) {
        setUser(localUser);
      } else {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(response.data);
      }
    } catch (err) {
      setError("Failed to fetch user details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);

      const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = localUsers.map((u) =>
        u.id.toString() === id ? { ...user, id: u.id } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      navigate("/"); // Navigate back to the user list
    } catch (err) {
      setError("Failed to update user. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (error) return <div className="text-red-600 text-center">{error}</div>;
  if (isLoading) return <LoadingSpinner />;
  if (!user) return null;

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-gray-800 text-white p-10 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-6 text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
