import { useState } from "react";
import axios from "axios";

function CreateUser({onClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://password-reset-3i0a.onrender.com/api/auth/register`,
        { email, password }
      );
      setMessage(response.data.message);
      setErrMessage("");
    } catch (err) {
      setMessage(err.response.data.error);
      setErrMessage(err.response.data.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-25 p-4 flex justify-center items-center">
      <div className="bg-white w-1/2 lg:w-1/3 rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-bold ">Register User</h2>
          <button className="text-red-500 float-right" onClick={onClose}>
            Close
          </button>
        </div>
        <form
          className="px-4 bg-white rounded-lg flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black rounded p-2 w-full"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-black rounded p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 rounded font-semibold text-white p-2 w-full"
          >
            Create User
          </button>
          {message && errMessage ? (
            <p className="text-red-600 pb-4 font-semibold text-center">{message}</p>
          ) : (
            <p className="text-green-600 pb-4 font-semibold text-center">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
