import { useEffect, useState } from "react";
import "./BookingChart.css";

import dashboardService from "../../../services/dashboardService";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  YAxis,
  CartesianGrid,
} from "recharts";

const MONTHS = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function BookingChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadMonthlyExpenses();
  }, []);

  const loadMonthlyExpenses = async () => {
    try {
      const data = await dashboardService.getMonthlyExpenseAnalytics();

      const formattedData = data.map((item) => ({
        month: MONTHS[item.month],
        amount: item.totalAmount,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error("Failed to load monthly expense analytics", error);
    }
  };

  return (
    <div className="booking-chart glass">
      <div className="chart-header">
        <div>
          <h3>Monthly Expense Overview</h3>

          <p>Total expenses this year</p>
        </div>

        <button>This Year</button>
      </div>

      <div className="chart">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" tick={{ fill: "#94A3B8" }} />

            <YAxis tick={{ fill: "#94A3B8" }} />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Expense",
              ]}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#3B82F6"
              strokeWidth={4}
              fill="url(#colorExpense)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BookingChart;
