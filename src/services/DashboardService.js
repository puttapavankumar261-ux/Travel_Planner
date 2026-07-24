import axiosInstance from "../utils/axiosInstance";

const getDashboardSummary = async () => {
  const response = await axiosInstance.get("/api/dashboard/summary");
  return response.data.data;
};

const getMonthlyExpenseAnalytics = async () => {
  const response = await axiosInstance.get("/api/dashboard/monthly-expenses");
  return response.data.data;
};

const dashboardService = {
  getDashboardSummary,
  getMonthlyExpenseAnalytics,
};

export default dashboardService;