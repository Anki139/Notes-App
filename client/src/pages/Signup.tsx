import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Google from "../assets/google.svg";
import User  from "../assets/user.png";
import logo from "../assets/icon.png";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    setError("");

    if (!email.includes("@") || username.trim() === "") {
      setError("Please enter a valid username and email.");
      return;
    }

    try {
      await axios.post(`${API}/api/auth/send-otp`, { email, username });
      navigate("/Login", { state: { email } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {/* Logo + Title */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <img src={logo} alt="HD" className="w-8 animate-spin" />
          <span className="text-2xl font-bold mt-[2px]">HD</span>
        </div>
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        {/* Google Sign Up */}
        <button className="flex items-center justify-center w-full bg-blue-50 text-gray-800 border border-gray-300 py-2 rounded-md hover:bg-blue-100 mb-6 transition">
          <img src={Google} alt=""  className="text-xl mr-2" />
          Sign Up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">Or sign up with e-mail</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          onClick={handleSendOTP}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md flex items-center justify-center transition"
        >
         <img src={User} alt="" className="mr-2" />
          GET OTP
        </button>

        {/* Already have an account */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-indigo-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
