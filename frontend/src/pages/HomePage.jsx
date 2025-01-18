import React, { useState } from "react";
import CreateUser from "./CreateUser";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-center items-center p-4 min-h-screen w-full bg-gradient-to-tr from-slate-800 to-slate-600">
        <div className="bg-white w-1/2 lg:w-1/3 flex flex-col gap-4 p-6 rounded-lg">
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="bg-blue-500 rounded text-center text-white p-2 w-full"
          >
            Create User
          </button>
          <Link to="/forget-password" className="bg-blue-500 rounded text-center text-white p-2 w-full">
            Forget password
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <CreateUser
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
