import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    setError(""); // clear previous errors

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/auth/send-otp", { email });
      navigate("/login", { state: { email } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl text-center">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="HD" className="w-8 animate-spin mr-2" />
          <span className="text-2xl font-semibold mt-[1px] mb-3">HD</span>
        </div>
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full px-4 py-3 border rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSendOTP}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send OTP
        </button>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
