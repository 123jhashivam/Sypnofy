import axiosInstance from './axiosInstance'

export const getAllIntegrations = () => axiosInstance.get('/integrations')

export const createIntegration = (data) => axiosInstance.post('/integrations', data)

export const updateIntegration = (id, data) => axiosInstance.put(`/integrations/${id}`, data)

export const toggleIntegrationStatus = (id) => axiosInstance.put(`/integrations/${id}/toggle`)

export const deleteIntegration = (id) => axiosInstance.delete(`/integrations/${id}`)