import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.105:8003/api",  // Use environment variable for base URL

});





// Get all services
export const getAllServices = async () => {
    const response = await axiosInstance.get("/getAllServices");
    return response.data;
};

// Get service by ID
export const getServiceById = async (serviceId) => {
    const response = await axiosInstance.get(`/getservicesbyid/${serviceId}`);
    return response.data;
};

// Create a new service
export const createService = async (serviceData) => {
    const response = await axiosInstance.post("/services", serviceData);
    return response.data;
};

// Update a service
export const updateService = async (serviceId, serviceData) => {
    const response = await axiosInstance.put(`/updateservices/${serviceId}`, serviceData);
    return response.data;
};

// Soft delete a service
export const deleteService = async (serviceId) => {
    const response = await axiosInstance.delete(`/deleteservices/${serviceId}`);
    return response.data;
};

// Update a service image
export const updateServiceImage = async (serviceId, imageIndex, formData) => {
    const response = await axiosInstance.put(`/${serviceId}/updateimage/${imageIndex}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
};