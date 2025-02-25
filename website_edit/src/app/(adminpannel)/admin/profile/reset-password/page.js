


"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, verifyOtp, resetPassword } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { loading, otpSent, otpValidated, resetSuccess, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOtp = async () => {
    if (!email) return toast.error("Please enter your email.");
    dispatch(sendOtp(email))
      .unwrap()
      .then(() => toast.success("OTP sent successfully!"))
      .catch((err) => toast.error(err));
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Please enter the OTP.");
    dispatch(verifyOtp({ email, otp }))
      .unwrap()
      .then(() => toast.success("OTP verified successfully!"))
      .catch((err) => toast.error(err));
  };

  const handleResetPassword = async () => {
    if (!newPassword) return toast.error("Please enter a new password.");
    dispatch(resetPassword({ email, otp, newPassword }))
      .unwrap()
      .then(() => toast.success("Password reset successfully!"))
      .catch((err) => toast.error(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Email Input */}
          <div className="mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={otpSent}
            />
          </div>

          {!otpSent && (
            <Button onClick={handleSendOtp} disabled={loading} className="w-full">
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          )}

          {otpSent && !otpValidated && (
            <div className="mt-4">
              <Label>OTP</Label>
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              <Button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="mt-2 w-full"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
          )}

          {otpValidated && (
            <div className="mt-4">
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <Button
                onClick={handleResetPassword}
                disabled={loading}
                className="mt-2 w-full"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          )}

          {resetSuccess && (
            <p className="mt-4 text-green-600">Password reset successfully!</p>
          )}

          {error && <p className="mt-2 text-red-600">Error: {error}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;