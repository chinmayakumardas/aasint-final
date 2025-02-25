import axiosInstance from '@/utils/axiosInstance';
 
// Login API call
export const loginApi = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    return { token: response.data.token, role: response.data.role };  // Return both token and role
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Login failed');
  }
};
 
// Send OTP API call
export const sendOtpApi = async (email) => {
  try {
    const response = await axiosInstance.post('/forgot-password', { email });
    return response.data.message;  // OTP sent message
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to send OTP');
  }
};
 
// Verify OTP API call
export const verifyOtpApi = async (email, otp) => {
  try {
    const response = await axiosInstance.post('/verify-otp', { email, otp });
    return response.data.message;  // OTP verification success message
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Invalid OTP');
  }
};
 
// Reset Password API call
export const resetPasswordApi = async (email,otp,newPassword ) => {
  try {
    const response = await axiosInstance.post('/reset-password', { email,otp,newPassword  });
    return response.data.message;  // Password reset success message
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to reset password');
  }
};