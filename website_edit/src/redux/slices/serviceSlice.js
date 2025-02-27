import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllServicesApi,
  getServiceByIdApi,
  createServiceApi,
  updateServiceApi,
  deleteServiceApi,
  updateServiceImageApi,downloadServiceImageApi
} from '@/api/serviceApi';

// Async thunks
export const fetchServices = createAsyncThunk('services/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await getAllServicesApi();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchServiceById = createAsyncThunk('services/fetchById', async (serviceId, { rejectWithValue }) => {
  try {
    return await getServiceByIdApi(serviceId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createService = createAsyncThunk('services/create', async (serviceData, { rejectWithValue }) => {
  try {
    return await createServiceApi(serviceData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateService = createAsyncThunk('services/update', async ({ serviceId, updatedData }, { rejectWithValue }) => {
  try {
    return await updateServiceApi(serviceId, updatedData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteService = createAsyncThunk('services/delete', async (serviceId, { rejectWithValue }) => {
  try {
    return await deleteServiceApi(serviceId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateServiceImage = createAsyncThunk('services/updateImage', async ({ serviceId, imageIndex, imageFile }, { rejectWithValue }) => {
  try {
    return await updateServiceImageApi(serviceId, imageIndex, imageFile);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
// Async thunk to download the image
export const downloadServiceImage = createAsyncThunk(
  'services/downloadImage',
  async ({ serviceId, imageIndex }, { rejectWithValue }) => {
    try {
      const imageData = await downloadServiceImageApi(serviceId, imageIndex);
      return imageData; // Return the image data (could be used to trigger the download)
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Slice
const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    services: [],
    selectedService: null,
    status: 'idle',
    error: null,
    downloadedImage: null, // Store the downloaded image here if needed

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.selectedService = action.payload;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.services = state.services.map(service =>
          service.serviceId === action.payload.serviceId ? action.payload : service
        );
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(service => service.serviceId !== action.meta.arg);
      })
      .addCase(updateServiceImage.fulfilled, (state, action) => {
        const index = state.services.findIndex(service => service.serviceId === action.payload.serviceId);
        if (index !== -1) {
          state.services[index].images = action.payload.images;
        }
      })
      // Other cases...
    .addCase(downloadServiceImage.pending, (state) => {
      state.status = 'loading'; // Set loading state
    })
    .addCase(downloadServiceImage.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // Optionally, store the downloaded image data in the state if needed
      // state.downloadedImage = action.payload;
    })
    .addCase(downloadServiceImage.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  }
});

export default serviceSlice.reducer;
