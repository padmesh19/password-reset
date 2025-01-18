import { useState } from "react";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://password-reset-3i0a.onrender.com/api/auth/forget-password`,
        { email }
      );
      setMessage(response.data.message);
      setErrMessage("");
    } catch (err) {
      setMessage(err.response.data.error);
      setErrMessage(err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-500 flex items-center justify-center ">
      <form
        className="w-1/2 lg:w-1/3 p-4 bg-white rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold mb-4">Forget Password</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-black rounded p-2 w-full mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 rounded text-white p-2 w-full"
        >
          Send Reset Link
        </button>
        {message && errMessage ? (
          <p className="mt-4 text-red-600 font-semibold text-center">
            {message}
          </p>
        ) : (
          <p className="mt-4 text-green-600 font-semibold text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ForgetPassword;
