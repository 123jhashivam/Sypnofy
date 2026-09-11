import axiosInstance from './axiosInstance'

export const getAllGuests = () => axiosInstance.get('/guests')

export const getForeignGuests = () => axiosInstance.get('/guests/foreign')

export const getGuestById = (id) => axiosInstance.get(`/guests/${id}`)

export const createGuest = (data) => axiosInstance.post('/guests', data)

export const updateGuest = (id, data) => axiosInstance.put(`/guests/${id}`, data)

export const deleteGuest = (id) => axiosInstance.delete(`/guests/${id}`)