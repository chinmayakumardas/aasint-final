



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllServices, getServiceById, createService, updateService, deleteService } from "../../api/serviceApi";

// Fetch all services
export const fetchServices = createAsyncThunk("service/fetchAll", async () => {
  const response = await getAllServices();
  return response;
});

// Fetch single service by serviceId
export const fetchServiceById = createAsyncThunk("service/fetchById", async (serviceId) => {
  const response = await getServiceById(serviceId);
  return response;
});

// Add new service
export const addService = createAsyncThunk("service/add", async (serviceData) => {
  const response = await createService(serviceData);
  return response;
});

// Edit service
export const editService = createAsyncThunk("service/edit", async ({ serviceId, serviceData }) => {
  const response = await updateService(serviceId, serviceData);
  return response;
});

// Remove service
export const removeService = createAsyncThunk("service/remove", async (serviceId) => {
  await deleteService(serviceId);
  return serviceId;
});

// Slice definition
const serviceSlice = createSlice({
  name: "service",
  initialState: { services: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      .addCase(editService.fulfilled, (state, action) => {
        const index = state.services.findIndex((service) => service.serviceId === action.payload.serviceId);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(removeService.fulfilled, (state, action) => {
        state.services = state.services.filter((service) => service.serviceId !== action.payload);
      });
  },
});

export default serviceSlice.reducer;
