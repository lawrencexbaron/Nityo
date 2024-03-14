import { useState } from "react";
import TextInput from "./common/TextInput";

import "./App.css";

function App() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <div className="max-w-2xl w-full bg-white border px-3 py-2">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4 border-b">Create User</h1>
          <TextInput
            name="firstName"
            label="First Name"
            value={user.firstName}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextInput
            name="lastName"
            label="Last Name"
            value={user.lastName}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextInput
            name="email"
            label="Email"
            value={user.email}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextInput
            name="role"
            label="Role"
            value={user.role}
            onChange={handleInputChange}
            className="mb-3"
          />
          <TextInput
            name="password"
            label="Password"
            value={user.password}
            onChange={handleInputChange}
            className="mb-3"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
