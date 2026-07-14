import React from 'react';
import "./Expenses.css";
import BackgroundSlider from "../../../components/UserDashboard/BackgroundSlider/BackgroundSlider";
import UserNavbar from "../../../components/UserDashboard/UserNavbar/UserNavbar";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FaWallet, 
  FaMoneyBillWave, 
  FaPiggyBank, 
  FaCalendarDay,
  FaUtensils,
  FaBed,
  FaPlane,
  FaTaxi
} from 'react-icons/fa';

const EXPENSE_DATA = {
  totalBudget: 50000,
  totalSpent: 30000,
  tripDays: 5,
};

const CATEGORY_DATA = [
  { name: 'Accommodation', value: 12000, color: '#3B82F6', icon: <FaBed /> },
  { name: 'Flights', value: 8000, color: '#8B5CF6', icon: <FaPlane /> },
  { name: 'Food', value: 6000, color: '#F59E0B', icon: <FaUtensils /> },
  { name: 'Transport', value: 4000, color: '#10B981', icon: <FaTaxi /> },
];

const RECENT_TRANSACTIONS = [
  { id: 1, title: 'Dinner at Beach Cafe', amount: 1500, date: '15 Jul 2026', category: 'Food', paidBy: 'Pavan' },
  { id: 2, title: 'Hotel Booking', amount: 12000, date: '12 Jul 2026', category: 'Accommodation', paidBy: 'Pavan' },
  { id: 3, title: 'Flight Tickets', amount: 8000, date: '10 Jul 2026', category: 'Flights', paidBy: 'Amit' },
  { id: 4, title: 'Airport Taxi', amount: 1200, date: '15 Jul 2026', category: 'Transport', paidBy: 'Rahul' },
  { id: 5, title: 'Lunch at Shack', amount: 800, date: '16 Jul 2026', category: 'Food', paidBy: 'Pavan' },
];

// Automated Split Logic
const GROUP_MEMBERS = [
  { name: 'Pavan', avatarBg: 'linear-gradient(135deg, #3B82F6, #2563EB)' },
  { name: 'Amit', avatarBg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' },
  { name: 'Rahul', avatarBg: 'linear-gradient(135deg, #10B981, #059669)' }
];

const calculateSplit = () => {
  const total = EXPENSE_DATA.totalSpent;
  const perPerson = total / GROUP_MEMBERS.length;
  
  // Calculate who paid what
  const paidAmounts = { Pavan: 0, Amit: 0, Rahul: 0 };
  RECENT_TRANSACTIONS.forEach(t => {
    if(paidAmounts[t.paidBy] !== undefined) {
      paidAmounts[t.paidBy] += t.amount;
    }
  });

  // Calculate balances
  return GROUP_MEMBERS.map(member => {
    const paid = paidAmounts[member.name];
    const balance = paid - perPerson;
    return {
      ...member,
      paid,
      share: perPerson,
      balance, // positive means they get back, negative means they owe
    };
  });
};

const Expenses = () => {
  const remainingBudget = EXPENSE_DATA.totalBudget - EXPENSE_DATA.totalSpent;
  const dailyAverage = Math.round(EXPENSE_DATA.totalSpent / EXPENSE_DATA.tripDays);
  
  const splitDetails = calculateSplit();

  const getIconForCategory = (catName) => {
    const category = CATEGORY_DATA.find(c => c.name === catName);
    return category ? category.icon : <FaMoneyBillWave />;
  };
  
  const getColorForCategory = (catName) => {
    const category = CATEGORY_DATA.find(c => c.name === catName);
    return category ? category.color : '#fff';
  };

  return (
    <div className="expenses-page">
      <BackgroundSlider />
      
      <div className="expenses-container">
        <UserNavbar />
        
        <h1 className="page-title">Trip Expenses</h1>

        {/* Summary Grid */}
        <div className="summary-grid">
          <div className="summary-card glass">
            <div className="summary-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6' }}>
              <FaWallet />
            </div>
            <div className="summary-content">
              <p>₹{EXPENSE_DATA.totalBudget.toLocaleString()}</p>
              <h3>Total Budget</h3>
            </div>
          </div>
          
          <div className="summary-card glass">
            <div className="summary-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6' }}>
              <FaMoneyBillWave />
            </div>
            <div className="summary-content">
              <p>₹{EXPENSE_DATA.totalSpent.toLocaleString()}</p>
              <h3>Total Spent</h3>
            </div>
          </div>
          
          <div className="summary-card glass">
            <div className="summary-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6' }}>
              <FaPiggyBank />
            </div>
            <div className="summary-content">
              <p>₹{remainingBudget.toLocaleString()}</p>
              <h3>Remaining</h3>
            </div>
          </div>
          
          <div className="summary-card glass">
            <div className="summary-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6' }}>
              <FaCalendarDay />
            </div>
            <div className="summary-content">
              <p>₹{dailyAverage.toLocaleString()}</p>
              <h3>Daily Average</h3>
            </div>
          </div>
        </div>

        {/* Charts & History */}
        <div className="content-grid">
          <div className="glass-panel">
            <h2 className="panel-header">Expense Breakdown</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `₹${value.toLocaleString()}`}
                    contentStyle={{ background: '#171F2E', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel">
            <h2 className="panel-header">Recent Transactions</h2>
            <div className="history-list">
              {RECENT_TRANSACTIONS.map(tx => (
                <div key={tx.id} className="history-item">
                  <div className="history-left">
                    <div className="history-icon" style={{ background: `${getColorForCategory(tx.category)}20`, color: getColorForCategory(tx.category) }}>
                      {getIconForCategory(tx.category)}
                    </div>
                    <div className="history-details">
                      <h4>{tx.title}</h4>
                      <p>{tx.date} • Paid by {tx.paidBy}</p>
                    </div>
                  </div>
                  <div className="history-amount">
                    -₹{tx.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Group Split Section */}
        <div className="glass-panel" style={{ marginBottom: '40px' }}>
          <h2 className="panel-header">Group Split (Equal Division)</h2>
          <div className="group-split-grid">
            {splitDetails.map((member, idx) => (
              <div key={idx} className="split-card">
                <div className="member-avatar" style={{ background: member.avatarBg }}>
                  {member.name.charAt(0)}
                </div>
                <div className="split-details">
                  <h4>{member.name}</h4>
                  <p>Paid: <span>₹{member.paid.toLocaleString()}</span></p>
                  <p>Share: <span>₹{member.share.toLocaleString()}</span></p>
                  
                  {member.balance > 0 && (
                    <span className="status-badge gets-back">Gets back ₹{member.balance.toLocaleString()}</span>
                  )}
                  {member.balance < 0 && (
                    <span className="status-badge owes">Owes ₹{Math.abs(member.balance).toLocaleString()}</span>
                  )}
                  {member.balance === 0 && (
                    <span className="status-badge settled">Settled Up</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Expenses;
