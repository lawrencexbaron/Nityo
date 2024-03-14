import { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "./../common/TextInput";
import SelectInput from "../common/SelectInput";
import { Link, useParams } from "react-router-dom";

function EditUser() {
  const { id } = useParams();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  const RoleSelection = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "user",
      label: "User",
    },
  ];

  const fetchUser = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateUser = async (user: any) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/users/${id}`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setError([]);
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: "",
      });
      setSuccess("User updated successfully");
    } catch (err: any) {
      setSuccess("");
      setError(err.response.data.error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUser(user);
  };

  useEffect(() => {
    fetchUser(id ?? "");
  }, [id]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <div className="max-w-2xl w-full bg-white border px-3 py-2">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-2 border-b">
            <h1 className="text-xl font-bold mb-2">Edit User</h1>
            <Link to="/users" className="text-blue-500">
              View Users
            </Link>
          </div>
          {success && <div className="text-green-500">{success}</div>}

          {Array.isArray(error) ? (
            error.map((err, index) => (
              <div key={index} className="text-red-500">
                {err}
              </div>
            ))
          ) : (
            <div className="text-red-500">{error}</div>
          )}
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
          <SelectInput
            label="Role"
            value={user.role}
            name="role"
            options={RoleSelection.map((role) => role.value)}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
