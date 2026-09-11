import axiosInstance from './axiosInstance'

export const getAllBookings = () => axiosInstance.get('/bookings')

export const getBookingById = (id) => axiosInstance.get(`/bookings/${id}`)

export const createBooking = (data) => axiosInstance.post('/bookings', data)

export const updateBooking = (id, data) => axiosInstance.put(`/bookings/${id}`, data)

export const deleteBooking = (id) => axiosInstance.delete(`/bookings/${id}`)