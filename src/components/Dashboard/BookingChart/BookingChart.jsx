import "./BookingChart.css";

import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

const data = [
  { month: "Jan", bookings: 40 },
  { month: "Feb", bookings: 62 },
  { month: "Mar", bookings: 85 },
  { month: "Apr", bookings: 72 },
  { month: "May", bookings: 96 },
  { month: "Jun", bookings: 118 },
  { month: "Jul", bookings: 104 },
  { month: "Aug", bookings: 128 },
  { month: "Sep", bookings: 98 },
  { month: "Oct", bookings: 122 },
  { month: "Nov", bookings: 140 },
  { month: "Dec", bookings: 160 },
];

function BookingChart() {
  return (
    <div className="booking-chart glass">
      <div className="chart-header">
        <div>
          <h3>Monthly Booking Overview</h3>

          <p>Bookings made this year</p>
        </div>

        <button>This Year</button>
      </div>

      <div className="chart">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBooking" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />

                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" tick={{ fill: "#94A3B8" }} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="bookings"
              stroke="#3B82F6"
              strokeWidth={4}
              fill="url(#colorBooking)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BookingChart;
