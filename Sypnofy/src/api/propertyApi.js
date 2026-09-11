import axiosInstance from './axiosInstance'

export const getAllProperties = () => axiosInstance.get('/properties')

export const getPropertyById = (id) => axiosInstance.get(`/properties/${id}`)

export const createProperty = (data) => axiosInstance.post('/properties', data)

export const updateProperty = (id, data) => axiosInstance.put(`/properties/${id}`, data)

export const deleteProperty = (id) => axiosInstance.delete(`/properties/${id}`)