import axiosInstance from '@/utils/axiosInstance';

// Get all services
export const getAllServicesApi = async () => {
  try {
    const response = await axiosInstance.get('/services');
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Failed to fetch services');
  }
};

// Get a service by ID
export const getServiceByIdApi = async (serviceId) => {
  try {
    const response = await axiosInstance.get(`/services/${serviceId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Failed to fetch service');
  }
};

// Create a new service
export const createServiceApi = async (serviceData) => {
  try {
    const response = await axiosInstance.post('/services', serviceData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Failed to create service');
  }
};

// Update a service
export const updateServiceApi = async (serviceId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/services/${serviceId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Failed to update service');
  }
};

// Delete (soft delete) a service
export const deleteServiceApi = async (serviceId) => {
  try {
    const response = await axiosInstance.delete(`/services/${serviceId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Failed to delete service');
  }
};

// Update service image
export const updateServiceImageApi = async (serviceId, imageIndex, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axiosInstance.put(`/services/${serviceId}/update-image/${imageIndex}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Failed to update image');
  }
};
