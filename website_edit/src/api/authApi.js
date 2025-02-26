import axiosInstance from '@/utils/axiosInstance';

// Register API call
export const registerApi = async (username, email, password, role) => {
  try {
    const response = await axiosInstance.post('/register', { username, email, password, role });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Registration failed');
  }
};

// Login API call
export const loginApi = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    return { token: response.data.token, role: response.data.role };
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Login failed');
  }
};

// Send OTP API call
export const sendOtpApi = async (email) => {
  try {
    const response = await axiosInstance.post('/forgot-password', { email });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to send OTP');
  }
};

// Verify OTP API call
export const verifyOtpApi = async (email, otp) => {
  try {
    const response = await axiosInstance.post('/verify-otp', { email, otp });
    return { message: response.data.message, token: response.data.token, refreshToken: response.data.refreshToken, role: response.data.role };
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Invalid OTP');
  }
};


// Reset Password API call
export const resetPasswordApi = async (email, otp, newPassword) => {
  try {
    const response = await axiosInstance.post('/reset-password', { email, otp, newPassword });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to reset password');
  }
};

// Edit Profile API call
export const editProfileApi = async (firstName, lastName, bio) => {
  try {
    const response = await axiosInstance.put('/edit-profile', { firstName, lastName, bio });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to update profile');
  }
};

// Get All Users API call
export const getAllUsersApi = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch users');
  }
};
