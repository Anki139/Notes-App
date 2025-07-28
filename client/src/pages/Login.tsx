import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import rightColumn from "../assets/right-column.png"; // replace with your logo

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEmail = (location.state as { email?: string })?.email || "";

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
console.log(otpSent);
  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter email.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/auth/send-otp", { email });
      setOtpSent(true);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOTP = async () => {
    if (!email || !otp) {
      setError("Email and OTP are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/auth/verify-otp", {
        email,
        otp,
      });

      const { token } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      navigate("/notes");
    } catch (err: any) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left - Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-6">Sign in</h2>
          <p className="text-gray-500 mb-4">Please login to continue to your account.</p>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="OTP"
              className="w-full p-3 border rounded-lg pr-24"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-blue-600 text-sm hover:underline"
            >
              Resend OTP
            </button>
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <label className="text-sm text-gray-700">Keep me logged in</label>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={handleVerifyOTP}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign in
          </button>

          <p className="mt-6 text-sm">
            Need an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              Create one
            </span>
          </p>
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100 p-8">
        <img
          src={rightColumn}
          alt="Login Graphic"
          className="rounded-xl max-h-[90%]"
        />
      </div>
    </div>
  );
};

export default Login;
