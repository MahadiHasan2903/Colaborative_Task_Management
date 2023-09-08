import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useUser } from "../UserContext/UserContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { loginUser, logoutUser } = useUser();

  // Check if the user is already logged in on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      const userEmail = localStorage.getItem("loggedInUserEmail");
      if (userEmail) {
        // You can load user data based on userEmail from your storage
        // For simplicity, you can set a dummy user here
        const user = {
          email: userEmail,
          // Add other user data here
        };
        loginUser(user);
        navigate("/");
      }
    }
  }, [navigate, loginUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingUserData = JSON.parse(localStorage.getItem("users")) || [];

    const user = existingUserData.find((userData) => userData.email === email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        password,
        user.hashedPassword
      );

      if (isPasswordValid) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInUserEmail", email);

        loginUser(user);

        navigate("/");
        alert("Login successful!");
      } else {
        alert("Invalid password");
      }
    } else {
      alert("User not found");
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 mx-2 bg-gray-50 sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute text-black cursor-pointer right-2 top-2"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute text-black cursor-pointer right-2 top-2"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className="flex items-center w-full">
              <h4 className="text-black">Not have any account?</h4>
              <Link to="/register" className="pl-2 text-blue-600">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
