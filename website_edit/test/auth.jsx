

// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from 'react-toastify';
// import { loginApi, sendOtpApi, verifyOtpApi, resetPasswordApi } from '@/api/authApi';
 
// export function LoginForm({ className, ...props }) {
//   const [step, setStep] = useState("login"); // "login", "otp", "reset", "new-password"
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
 
//   const router = useRouter();
 
//   // Handle Login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { token } = await loginApi(email, password);
//       localStorage.setItem('token', token);
//       setStep("otp"); // Move to OTP step
//       toast.success('OTP sent to your email');
//     } catch (error) {
//       setErrorMessage(error.message);
//       toast.error(error.message);
//     }
//   };
 
//   // Handle OTP Verification
//   const handleOtpValidate = async () => {
//     try {
//       await verifyOtpApi(email, otp);
//       toast.success('OTP validated successfully');
//       router.push('/dasboard'); // Redirect to dashboard
//     } catch (error) {
//       setErrorMessage(error.message);
//       toast.error(error.message);
//     }
//   };
 
//   // Handle Forgot Password
//   const handleResetPassword = async () => {
//     try {
//       await sendOtpApi(email);
     
//       setStep("new-password");
//       toast.success('OTP sent to your email');
//     } catch (error) {
//       setErrorMessage(error.message);
//       toast.error(error.message);
//     }
//   };
 
//   // Handle New Password Submission
//   const handleSubmitNewPassword = async () => {
//     if (newPassword !== confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }
//     try {
//       await resetPasswordApi( email,otp,newPassword );
//       toast.success('Password reset successful');
//       setStep("login");
//     } catch (error) {
//       setErrorMessage(error.message);
//       toast.error(error.message);
//     }
//   };
 
//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader className="text-center">
//           <CardTitle className="text-xl">
//             {step === "login" ? "Welcome Back" : step === "otp" ? "Enter OTP" : "Reset Password"}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {/* Login Form */}
//           {step === "login" && (
     
 
 
//             <form onSubmit={handleLogin} className="py-10">
//   <div className="grid gap-6">
//     <div className="grid gap-4">
//       <Label htmlFor="email">Email</Label>
//       <Input
//         id="email"
//         type="email"
//         placeholder="m@example.com"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
       
//       />
//     </div>
//     <div className="grid gap-4">
//       <Label htmlFor="password">Password</Label>
//       <Input
//         id="password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         className="h-12 text-lg"
//       />
//       <div className="text-right">
//         <a
//           href="#"
//           className="text-sm underline text-black hover:text-black"
//           onClick={() => setStep("reset")}
//         >
//           Forgot Password?
//         </a>
//       </div>
//     </div>
//     {errorMessage && <div className="text-red-500">{errorMessage}</div>}
//     <Button type="submit" className="w-full">Login</Button>
//   </div>
// </form>
 
//           )}
 
//           {/* OTP Verification */}
//           {step === "otp" && (
//             <div className="grid gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="otp">Enter OTP</Label>
//                 <Input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6 digit OTP" required />
//               </div>
//               <Button type="button" onClick={handleOtpValidate} className="w-full">Validate OTP</Button>
//             </div>
//           )}
 
//           {/* Forgot Password */}
//           {step === "reset" && (
//             <div className="grid gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="reset-email">Enter your email</Label>
//                 <Input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//               </div>
//               <Button type="button" onClick={handleResetPassword} className="w-full">Reset Password</Button>
//             </div>
//           )}
 
//           {/* Set New Password */}
//           {step === "new-password" && (
           
 
           
 
           
//             <div className="grid gap-6">
 
// <div className="grid gap-2">
//                 <Label htmlFor="otp">Enter OTP</Label>
//                 <Input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6 digit OTP" required />
//               </div>
 
//               <div className="grid gap-2">
//                 <Label htmlFor="new-password">New Password</Label>
//                 <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
//               </div>
 
             
 
//               <div className="grid gap-2">
//                 <Label htmlFor="confirm-password">Confirm Password</Label>
//                 <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//               </div>
//               <Button type="button" onClick={handleSubmitNewPassword} className="w-full">Submit</Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
 'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'react-toastify'; // Import only the toast function

export function LoginForm({ className, ...props }) {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpValidated, setIsOtpValidated] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState(''); // To store password input for login
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login success, send OTP after credentials validation
    if (email && password) {
      setIsOtpSent(true); // Simulate OTP sent
      toast.success('OTP sent to your email');
    } else {
      setErrorMessage("Invalid credentials.");
      toast.error('Invalid credentials');
    }
  };

  const handleResetPassword = () => {
    setIsOtpSent(true); // Simulate OTP sent to email
    toast.success('OTP sent to your email');
  };

  const handleOtpValidate = () => {
    // Simulate OTP validation
    if (otp === "123456") {
      setIsOtpValidated(true);
      toast.success('OTP validated successfully');
      
      if (!isForgotPassword) {
        // If it's login flow, redirect to dashboard after OTP validation
        router.push('/admin');
        toast.success('Login successful');
      }
    } else {
      setErrorMessage("Invalid OTP.");
      toast.error('Invalid OTP');
    }
  };

  const handleSubmitNewPassword = () => {
    if (newPassword === confirmPassword) {
      // Simulate successful password reset
      toast.success('Password reset successfully');
      setTimeout(() => {
        // After success, go back to login form and show toast for success
        setIsForgotPassword(false); // Reset form state to login after success
        setIsOtpSent(false); // Reset OTP sent state
        setIsOtpValidated(false); // Reset OTP validated state
        setEmail('');
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
        toast.success('You can now log in with your new password!');
      }, 2000); // Delay to allow toast to show
    } else {
      setErrorMessage('Passwords do not match.');
      toast.error('Passwords do not match');
    }
  };

  const handleSubmit = () => {
    if (email && password) {
      // Simulate successful login and redirect
      toast.success('Login successful');
      router.push('/admin'); // Redirect to dashboard after login
    } else {
      setErrorMessage("Invalid credentials.");
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              {/* Google Login Button */}
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>

              {/* Continue with Email */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              {/* Login Form (Email + Password) */}
              {!isForgotPassword && !isOtpSent && !isOtpValidated && (
                <>
                  <div className="grid gap-2">
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
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                        onClick={handleForgotPasswordClick}
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </>
              )}

              {/* Forgot Password Flow */}
              {isForgotPassword && !isOtpSent && !isOtpValidated && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="forgot-email">Enter your email</Label>
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="button" onClick={handleResetPassword} className="w-full">
                    Reset Password
                  </Button>
                </>
              )}

              {/* OTP Validation Flow */}
              {isOtpSent && !isOtpValidated && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6 digit OTP"
                      required
                    />
                  </div>
                  <Button type="button" onClick={handleOtpValidate} className="w-full">
                    Validate OTP
                  </Button>
                </>
              )}

              {/* New Password and Confirm Password Flow (Only for Forgot Password) */}
              {isOtpValidated && isForgotPassword && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                  <Button type="button" onClick={handleSubmitNewPassword} className="w-full">
                    Submit New Password
                  </Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Footer Text */}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}




