


##User Management Application
This React-based application allows users to create, edit, delete, and view a list of users. It interacts with a simulated API (via jsonplaceholder.typicode.com) and utilizes local storage for data persistence.

Table of Contents
Installation
Components
UserList
UserDetail
CreateUser
LoadingSpinner
Local Storage
API Usage
Error Handling
Routing
Contributing
Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/your-repository-url.git
cd user-management-app
Install Dependencies:

bash
Copy code
npm install
Run the Application:

bash
Copy code
npm start
The application will be available at http://localhost:3000.

Components
1. UserList
This component displays the list of users and provides functionality to delete or edit users.

Key Features:

Fetches user data from both a remote API and local storage.
Displays a table of users, showing their names, emails, and phone numbers.
Includes buttons for editing and deleting each user.
Uses the FaEdit and FaTrash icons from react-icons to represent the edit and delete actions.
File Location:

jsx
Copy code
src/components/UserList.js
Props:

No props required.
Key Functions:

fetchUsers: Fetches users from jsonplaceholder API and merges them with any users stored in local storage.
deleteUser: Deletes a user both from the local storage and the API, updating the displayed list of users.
2. UserDetail
This component handles the editing of a specific user.

Key Features:

Fetches user details either from local storage (if locally created) or from the API.
Allows the user to update details (name, email, phone) via a form.
Navigates back to the main user list upon successful update.
File Location:

jsx
Copy code
src/components/UserDetail.js
Props:

No props required. It uses URL parameters to identify the user ID (useParams).
Key Functions:

fetchUser: Fetches the user’s details from local storage or API.
handleSubmit: Updates the user’s details via API and updates local storage.
3. CreateUser
This component provides functionality to create a new user.

Key Features:

Presents a form for creating a new user (name, email, phone).
Sends a POST request to the API, simulating user creation.
Saves the new user to local storage, so it is persistently available.
Navigates back to the user list upon successful creation.
File Location:

jsx
Copy code
src/components/CreateUser.js
Props:

No props required.
Key Functions:

handleSubmit: Submits the form and sends user data to the API and local storage.
handleChange: Updates the form's input fields as the user types.
4. LoadingSpinner
A simple loading spinner component displayed during asynchronous operations (e.g., while fetching data or submitting forms).

File Location:

jsx
Copy code
src/components/LoadingSpinner.js
Props:

No props required.
Usage:

Displayed in UserList, UserDetail, and CreateUser components while data is being loaded or submitted.
Local Storage
The app uses localStorage to persist user data locally, allowing user data to be stored across page reloads.

Key Operations:
Storing Users: When users are created or edited, they are stored in localStorage as an array of user objects.
Fetching Users: When the app fetches user data, it combines data from the API with users from local storage.
API Usage
The app interacts with the JSONPlaceholder API to simulate CRUD operations. While the API doesn't persist data, the app mimics this functionality through local storage.

GET: Fetches users from the API and merges them with local users.
POST: Creates a new user in the simulated API and stores the result locally.
PUT: Updates user data and syncs it with the local storage.
DELETE: Deletes the user from both local storage and the API.
API URL:

bash
Copy code
https://jsonplaceholder.typicode.com/users
Error Handling
Each component includes basic error handling:

If an API request fails (fetching, creating, updating, or deleting users), the app displays an error message.
The error messages are displayed prominently in red, informing users of the failure and asking them to try again.
Example:

jsx
Copy code
{error && <div className="text-red-600 text-center">{error}</div>}
Routing
The app uses react-router-dom to handle navigation between different pages:

"/": Displays the UserList component.
"/user/
": Displays the UserDetail component for editing a user.
"/create": Displays the CreateUser component to add a new user.
jsx
Copy code
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

<Router>
  <Routes>
    <Route path="/" element={<UserList />} />
    <Route path="/user/:id" element={<UserDetail />} />
    <Route path="/create" element={<CreateUser />} />
  </Routes>
</Router>
Contributing
Feel free to submit a pull request or open an issue for any bugs or feature requests. Contributions are always welcome!

Author
Provide your name and contact information here if you'd like.
