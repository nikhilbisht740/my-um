import React from "react";

function Footer() {
  return (
    <footer className="bg-[#333] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-10 text-center md:text-left">
          {/* Column 1: App Information */}
          <div>
            <h3 className="font-bold text-xl mb-2">UserManagementApp</h3>
            <p className="text-gray-400">
              Manage your users efficiently and effectively.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  User List
                </a>
              </li>
              <li>
                <a href="/create" className="text-gray-400 hover:text-white">
                  Create User
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="font-bold text-xl mb-2">Contact Us</h3>
            <p className="text-gray-400">
              Email: support@usermanagementapp.com
            </p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
