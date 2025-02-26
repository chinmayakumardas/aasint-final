

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'react-toastify';
import { loginApi, sendOtpApi, verifyOtpApi, resetPasswordApi } from '@/api/authApi';
 
export function LoginForm({ className, ...props }) {
  const [step, setStep] = useState("login"); // "login", "otp", "reset", "new-password"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 
  const router = useRouter();
 
  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginApi(email, password);
      localStorage.setItem('token', token);
      setStep("otp"); // Move to OTP step
      toast.success('OTP sent to your email');
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(error.message);
    }
  };
 
  // Handle OTP Verification
  const handleOtpValidate = async () => {
    try {
      await verifyOtpApi(email, otp);
      toast.success('OTP validated successfully');
      router.push('/dasboard'); // Redirect to dashboard
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(error.message);
    }
  };
 
  // Handle Forgot Password
  const handleResetPassword = async () => {
    try {
      await sendOtpApi(email);
     
      setStep("new-password");
      toast.success('OTP sent to your email');
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(error.message);
    }
  };
 
  // Handle New Password Submission
  const handleSubmitNewPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await resetPasswordApi( email,otp,newPassword );
      toast.success('Password reset successful');
      setStep("login");
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(error.message);
    }
  };
 
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {step === "login" ? "Welcome Back" : step === "otp" ? "Enter OTP" : "Reset Password"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Login Form */}
          {step === "login" && (
     
 
 
            <form onSubmit={handleLogin} className="py-10">
  <div className="grid gap-6">
    <div className="grid gap-4">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="m@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
       
      />
    </div>
    <div className="grid gap-4">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="h-12 text-lg"
      />
      <div className="text-right">
        <a
          href="#"
          className="text-sm underline text-black hover:text-black"
          onClick={() => setStep("reset")}
        >
          Forgot Password?
        </a>
      </div>
    </div>
    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    <Button type="submit" className="w-full">Login</Button>
  </div>
</form>
 
          )}
 
          {/* OTP Verification */}
          {step === "otp" && (
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6 digit OTP" required />
              </div>
              <Button type="button" onClick={handleOtpValidate} className="w-full">Validate OTP</Button>
            </div>
          )}
 
          {/* Forgot Password */}
          {step === "reset" && (
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="reset-email">Enter your email</Label>
                <Input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="button" onClick={handleResetPassword} className="w-full">Reset Password</Button>
            </div>
          )}
 
          {/* Set New Password */}
          {step === "new-password" && (
           
 
           
 
           
            <div className="grid gap-6">
 
<div className="grid gap-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6 digit OTP" required />
              </div>
 
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
 
             
 
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <Button type="button" onClick={handleSubmitNewPassword} className="w-full">Submit</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
 