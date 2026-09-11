import axiosInstance from './axiosInstance'

export const getReportSummary = () => axiosInstance.get('/reports/summary')