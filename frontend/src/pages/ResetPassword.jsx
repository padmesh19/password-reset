import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://password-reset-3i0a.onrender.com/api/auth/reset-password",
        {
          resetToken: token,
          newPassword,
        }
      );
      setMessage(response.data.message);
      setErrMessage("");
    } catch (err) {
      setMessage(err.response.data.error);
      setErrMessage(err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-800 to-slate-600 flex items-center justify-center">
      <form
        className="w-1/2 lg:w-1/3 bg-white p-4 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold mb-4">Reset Password</h1>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-black rounded p-2 w-full mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 rounded text-white p-2 w-full"
        >
          Reset Password
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

export default ResetPassword;
