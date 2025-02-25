import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, sendOtpApi, verifyOtpApi, resetPasswordApi } from '@/api/authApi';
 
// Login action
export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { token, role } = await loginApi(email, password);
    localStorage.setItem('token', token); // Store JWT token
    return { token, role };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
 
// Send OTP action
export const sendOtp = createAsyncThunk('auth/sendOtp', async (email, { rejectWithValue }) => {
  try {
    return await sendOtpApi(email);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
 
// Verify OTP action
export const verifyOtp = createAsyncThunk('auth/verifyOtp', async ({ email, otp }, { rejectWithValue }) => {
  try {
    return await verifyOtpApi(email, otp);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
 
// Reset Password action
export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ email,otp,newPassword  }, { rejectWithValue }) => {
  try {
    return await resetPasswordApi(email,otp,newPassword );
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
 
// Initial state
const initialState = {
  token: null,
  role: null,
  loading: false,
  error: null,
  otpSent: false,
  otpValidated: false,
  resetSuccess: false,
};
 
// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      // Send OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpValidated = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
 
// Export actions & reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
 