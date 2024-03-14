import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: number) => {
    // add yes/no confirmation alert
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirm) {
      deleteUser(id);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-blue-50 flex justify-center items-center min-h-screen">
      <div className="max-w-3xl overflow-auto bg-white w-full px-3 border py-2">
        <div className="flex justify-between">
          <h1 className="my-1 text-xl font-bold">User List</h1>
          <Link to="/create-user" className="text-blue-500">
            Create Users
          </Link>
        </div>
        <table className="table-auto border w-full">
          <thead className="border">
            <th className="border py-0.5">First Name</th>
            <th className="border py-0.5">Last Name</th>
            <th className="border py-0.5">Email</th>
            <th className="border py-0.5">Role</th>
            <th className="border py-0 5">Action</th>
          </thead>
          <tbody className="text-center">
            {users.length > 0 ? (
              users.map((user: any) => (
                <tr className="" key={user._id}>
                  <td className="border px-2 py-1 capitalize">
                    {user.firstName}
                  </td>
                  <td className="border px-2 py-1 capitalize">
                    {user.lastName}
                  </td>
                  <td className="border px-2 py-1">{user.email}</td>
                  <td className="border px-2 py-1 capitalize">{user.role}</td>
                  <td className="border-b items-center my-auto justify-center px-2 py-2 flex space-x-1 whitespace-nowrap">
                    <AiFillDelete
                      onClick={() => handleDelete(user._id)}
                      className="cursor-pointer"
                    />
                    <Link to={`/edit-user/${user._id}`}>
                      <FaEdit className="cursor-pointer" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
