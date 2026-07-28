import React, { useEffect, useMemo, useState } from "react";
import "./Expenses.css";

import BackgroundSlider from "../../../components/UserDashboard/BackgroundSlider/BackgroundSlider";
import UserNavbar from "../../../components/UserDashboard/UserNavbar/UserNavbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  FaWallet,
  FaMoneyBillWave,
  FaPiggyBank,
  FaCalendarDay,
  FaUtensils,
  FaBed,
  FaPlane,
  FaTaxi,
  FaShoppingBag,
  FaHiking,
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

import expenseService from "../../../services/expenseService";

const Expenses = () => {

  const tripId = 1; // Later replace with selected trip

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const [paymentFilter, setPaymentFilter] = useState("ALL");

  useEffect(() => {
    loadExpenses();
}, []);

const loadExpenses = async () => {

    try {

        setLoading(true);

        const response =
            await expenseService.getExpensesByTrip(tripId);

        setExpenses(response);

    } catch (error) {

        console.error(error);

        setError("Unable to load expenses.");

    } finally {

        setLoading(false);

    }

};
const totalExpense = useMemo(() => {

    return expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

}, [expenses]);

const totalTransactions = expenses.length;

const highestExpense = useMemo(() => {

    if (!expenses.length) return 0;

    return Math.max(
        ...expenses.map(expense => expense.amount)
    );

}, [expenses]);

const averageExpense = useMemo(() => {

    if (!expenses.length) return 0;

    return Math.round(totalExpense / expenses.length);

}, [expenses, totalExpense]);
const categoryData = useMemo(() => {

    const map = {};

    expenses.forEach(expense => {

        if (!map[expense.expenseCategory]) {

            map[expense.expenseCategory] = 0;

        }

        map[expense.expenseCategory] += expense.amount;

    });

    const colors = {

        ACCOMMODATION: "#3B82F6",

        HOTEL: "#3B82F6",

        FOOD: "#F59E0B",

        FLIGHT: "#8B5CF6",

        TRANSPORT: "#10B981",

        SHOPPING: "#EF4444",

        ACTIVITIES: "#14B8A6",

        OTHER: "#64748B",

    };

    return Object.entries(map).map(([name, value]) => ({

        name,

        value,

        color: colors[name] || "#64748B",

    }));

}, [expenses]);
const filteredExpenses = useMemo(() => {

    return expenses.filter(expense => {

        const matchesSearch =

            expense.expenseTitle
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesCategory =

            categoryFilter === "ALL" ||

            expense.expenseCategory === categoryFilter;

        const matchesPayment =

            paymentFilter === "ALL" ||

            expense.paymentMethod === paymentFilter;

        return (

            matchesSearch &&

            matchesCategory &&

            matchesPayment

        );

    });

}, [

    expenses,

    searchTerm,

    categoryFilter,

    paymentFilter,

]);
const categoryIcons = {

    FOOD: <FaUtensils />,

    HOTEL: <FaBed />,

    ACCOMMODATION: <FaBed />,

    FLIGHT: <FaPlane />,

    TRANSPORT: <FaTaxi />,

    SHOPPING: <FaShoppingBag />,

    ACTIVITIES: <FaHiking />,

};
const categoryColors = {

    FOOD: "#F59E0B",

    HOTEL: "#3B82F6",

    ACCOMMODATION: "#3B82F6",

    FLIGHT: "#8B5CF6",

    TRANSPORT: "#10B981",

    SHOPPING: "#EF4444",

    ACTIVITIES: "#14B8A6",

};
return (
  <div className="expenses-page">
    <BackgroundSlider />

    <div className="expenses-container">
      <UserNavbar />

      <h1 className="page-title">Trip Expense Dashboard</h1>

      {/* Loading */}
      {loading && (
        <div className="glass-panel loading-panel">
          <h2>Loading expenses...</h2>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="glass-panel error-panel">
          <h2>{error}</h2>
        </div>
      )}

      {!loading && !error && (
        <>

          {/* ================= SUMMARY ================= */}

          <div className="summary-grid">

            <div className="summary-card glass">

              <div
                className="summary-icon"
                style={{
                  background: "rgba(59,130,246,.15)",
                  color: "#3B82F6",
                }}
              >
                <FaWallet />
              </div>

              <div className="summary-content">
                <p>₹{totalExpense.toLocaleString("en-IN")}</p>
                <h3>Total Expense</h3>
              </div>

            </div>

            <div className="summary-card glass">

              <div
                className="summary-icon"
                style={{
                  background: "rgba(16,185,129,.15)",
                  color: "#10B981",
                }}
              >
                <FaMoneyBillWave />
              </div>

              <div className="summary-content">
                <p>{totalTransactions}</p>
                <h3>Total Transactions</h3>
              </div>

            </div>

            <div className="summary-card glass">

              <div
                className="summary-icon"
                style={{
                  background: "rgba(245,158,11,.15)",
                  color: "#F59E0B",
                }}
              >
                <FaPiggyBank />
              </div>

              <div className="summary-content">
                <p>₹{highestExpense.toLocaleString("en-IN")}</p>
                <h3>Highest Expense</h3>
              </div>

            </div>

            <div className="summary-card glass">

              <div
                className="summary-icon"
                style={{
                  background: "rgba(139,92,246,.15)",
                  color: "#8B5CF6",
                }}
              >
                <FaCalendarDay />
              </div>

              <div className="summary-content">
                <p>₹{averageExpense.toLocaleString("en-IN")}</p>
                <h3>Average Expense</h3>
              </div>

            </div>

          </div>

          {/* ================= TOOLBAR ================= */}

          <div className="glass-panel toolbar">

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search expense..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              <option value="FOOD">Food</option>
              <option value="HOTEL">Hotel</option>
              <option value="ACCOMMODATION">Accommodation</option>
              <option value="TRANSPORT">Transport</option>
              <option value="FLIGHT">Flight</option>
              <option value="SHOPPING">Shopping</option>
              <option value="ACTIVITIES">Activities</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="ALL">All Payment Methods</option>
              <option value="UPI">UPI</option>
              <option value="CASH">Cash</option>
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="DEBIT_CARD">Debit Card</option>
              <option value="NET_BANKING">Net Banking</option>
              <option value="WALLET">Wallet</option>
            </select>

            <button className="add-expense-btn">
              <FaPlus />
              <span>Add Expense</span>
            </button>

          </div>

          {/* ================= CHARTS ================= */}

          <div className="content-grid">

            <div className="glass-panel">

              <h2 className="panel-header">
                Expense Breakdown
              </h2>

              <div className="chart-container">

                <ResponsiveContainer width="100%" height={350}>

                  <PieChart>

                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={120}
                      paddingAngle={3}
                    >

                      {categoryData.map((item, index) => (

                        <Cell
                          key={index}
                          fill={item.color}
                        />

                      ))}

                    </Pie>

                    <Tooltip
                      formatter={(value) =>
                        `₹${Number(value).toLocaleString("en-IN")}`
                      }
                    />

                    <Legend />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* ================= STATISTICS ================= */}

            <div className="glass-panel">

              <h2 className="panel-header">
                Expense Statistics
              </h2>

              <div className="stats-list">

                <div className="stat-row">
                  <span>Total Expenses</span>
                  <strong>
                    ₹{totalExpense.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="stat-row">
                  <span>Total Transactions</span>
                  <strong>{totalTransactions}</strong>
                </div>

                <div className="stat-row">
                  <span>Highest Expense</span>
                  <strong>
                    ₹{highestExpense.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="stat-row">
                  <span>Average Expense</span>
                  <strong>
                    ₹{averageExpense.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="stat-row">
                  <span>Food Expenses</span>
                  <strong>
                    ₹
                    {expenses
                      .filter((e) => e.expenseCategory === "FOOD")
                      .reduce((sum, e) => sum + e.amount, 0)
                      .toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="stat-row">
                  <span>Hotel Expenses</span>
                  <strong>
                    ₹
                    {expenses
                      .filter(
                        (e) =>
                          e.expenseCategory === "HOTEL" ||
                          e.expenseCategory === "ACCOMMODATION"
                      )
                      .reduce((sum, e) => sum + e.amount, 0)
                      .toLocaleString("en-IN")}
                  </strong>
                </div>

              </div>

            </div>

          </div>

          {/* ================= EXPENSE TABLE STARTS HERE ================= */}

          <div className="glass-panel">

  <div className="table-header">

    <h2 className="panel-header">
      Expense Details
    </h2>

    <span className="expense-count">
      {filteredExpenses.length} Expenses Found
    </span>

  </div>

  {filteredExpenses.length === 0 ? (

    <div className="empty-state">

      <FaMoneyBillWave
        size={70}
        color="#64748B"
      />

      <h2>No Expenses Found</h2>

      <p>
        Add your first expense to start tracking your trip spending.
      </p>

      <button className="add-expense-btn">
        <FaPlus />
        Add Expense
      </button>

    </div>

  ) : (

    <div className="table-container">

      <table className="expense-table">

        <thead>

          <tr>

            <th>Expense</th>

            <th>Category</th>

            <th>Amount</th>

            <th>Payment</th>

            <th>Date</th>

            <th>Notes</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredExpenses.map((expense) => (

            <tr key={expense.expenseId}>

              <td>

                <div className="expense-title">

                  <div
                    className="expense-icon"
                    style={{
                      background:
                        `${categoryColors[expense.expenseCategory] || "#3B82F6"}20`,
                      color:
                        categoryColors[expense.expenseCategory] || "#3B82F6",
                    }}
                  >
                    {categoryIcons[expense.expenseCategory] || (
                      <FaMoneyBillWave />
                    )}
                  </div>

                  <div>

                    <strong>
                      {expense.expenseTitle}
                    </strong>

                    <p>
                      #{expense.expenseId}
                    </p>

                  </div>

                </div>

              </td>

              <td>

                <span
                  className="category-badge"
                  style={{
                    background:
                      `${categoryColors[expense.expenseCategory] || "#64748B"}20`,
                    color:
                      categoryColors[expense.expenseCategory] || "#64748B",
                  }}
                >
                  {expense.expenseCategory}
                </span>

              </td>

              <td>

                <strong className="amount">

                  ₹
                  {expense.amount.toLocaleString("en-IN")}

                </strong>

              </td>

              <td>

                <span className="payment-badge">

                  {expense.paymentMethod}

                </span>

              </td>

              <td>

                {new Date(
                  expense.expenseDate
                ).toLocaleDateString("en-IN")}

              </td>

              <td>

                {expense.notes
                  ? expense.notes
                  : "-"}

              </td>

              <td>

                <div className="table-actions">

                  <button
                    className="edit-btn"
                    title="Edit Expense"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete-btn"
                    title="Delete Expense"
                  >
                    <FaTrash />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

</div>

        </>
      )}

    </div>

  </div>
);
};
export default Expenses;