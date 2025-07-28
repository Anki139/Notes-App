import { Request, Response } from "express";
import { db } from "../config/db";
import { generateOTP } from "../utils/generateOTP";
import { sendOTPEmail } from "../utils/sendEmail";

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Valid email required." });
  }

  const otp = generateOTP();
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min from now

  try {
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length > 0) {
      await db.query("UPDATE users SET otp = ?, otp_expiry = ? WHERE email = ?", [
        otp,
        expiry,
        email,
      ]);
    } else {
      await db.query("INSERT INTO users (email, otp, otp_expiry) VALUES (?, ?, ?)", [
        email,
        otp,
        expiry,
      ]);
    }

    await sendOTPEmail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
import jwt from "jsonwebtoken";

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  try {
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = rows[0];

    const now = new Date();
    const otpExpiry = new Date(user.otp_expiry);

    if (user.otp !== otp || otpExpiry < now) {
      return res.status(401).json({ message: "Invalid or expired OTP." });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // Clear OTP after successful login
    await db.query("UPDATE users SET otp = NULL, otp_expiry = NULL WHERE email = ?", [email]);

    return res.status(200).json({ message: "OTP verified", token });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({ message: "Server error during OTP verification." });
  }
};
