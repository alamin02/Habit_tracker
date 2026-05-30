import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import '../styles/DailyDashboard.css';

const DailyDashboard = () => {
  const { token } = useContext(AuthContext);
  const [dailyData, setDailyData] = useState(null);
  const [efficiencyScore, setEfficiencyScore] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchDailyData();
    calculateEfficiency();
  }, [selectedDate]);

  const fetchDailyData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/analytics/daily/${selectedDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDailyData(response.data);
    } catch (error) {
      console.error('Error fetching daily data:', error);
    }
  };

  const calculateEfficiency = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/analytics/efficiency/calculate/${selectedDate}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEfficiencyScore(response.data);
    } catch (error) {
      console.error('Error calculating efficiency:', error);
    }
  };

  const COLORS = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384',
    '#36A2EB', '#FFCE56', '#FF9F40', '#C9CBCF', '#4BC0C0', '#9966FF'
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#8BC34A';
    if (score >= 40) return '#FFC107';
    return '#F44336';
  };

  return (
    <div className="daily-dashboard">
      <h2>Daily 24-Hour Breakdown</h2>

      <div className="date-selector">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {efficiencyScore && (
        <div className="efficiency-card">
          <h3>Daily Efficiency Score</h3>
          <div
            className="efficiency-score"
            style={{ backgroundColor: getScoreColor(efficiencyScore.efficiencyScore) }}
          >
            {efficiencyScore.efficiencyScore}/100
          </div>
          <p className="efficiency-level">{efficiencyScore.efficiencyLevel}</p>
          <div className="metrics">
            <div className="metric">
              <span>Study Hours:</span>
              <strong>{efficiencyScore.metrics.studyHours}h</strong>
            </div>
            <div className="metric">
              <span>Sleep Hours:</span>
              <strong>{efficiencyScore.metrics.sleepHours}h</strong>
            </div>
            <div className="metric">
              <span>Phone Usage:</span>
              <strong>{efficiencyScore.metrics.phoneUsageHours}h</strong>
            </div>
            <div className="metric">
              <span>Avg Productivity:</span>
              <strong>{efficiencyScore.metrics.avgProductivity}/5</strong>
            </div>
          </div>
        </div>
      )}

      {dailyData && Object.keys(dailyData.categoryBreakdown).length > 0 && (
        <div className="chart-container">
          <h3>Activity Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(dailyData.categoryBreakdown).map(([name, value]) => ({
                  name,
                  value: parseFloat(value.toFixed(1))
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}h`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.entries(dailyData.categoryBreakdown).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <div className="category-breakdown">
            <h4>Category Breakdown</h4>
            {Object.entries(dailyData.categoryBreakdown).map(([category, hours]) => (
              <div key={category} className="breakdown-item">
                <span>{category}</span>
                <strong>{hours.toFixed(1)} hours</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {dailyData && dailyData.totalHours === 0 && (
        <p className="no-data">No activities logged for this day</p>
      )}
    </div>
  );
};

export default DailyDashboard;
