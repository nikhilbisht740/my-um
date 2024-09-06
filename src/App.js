import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import CreateUser from "./components/CreateUser";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetail />} />
            <Route path="/create" element={<CreateUser />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
