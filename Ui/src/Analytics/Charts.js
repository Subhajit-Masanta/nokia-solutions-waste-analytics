import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, Typography, CircularProgress, Alert, Box } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Line, Area, AreaChart,
  Cell, PieChart, Pie, Sector, Legend
} from 'recharts';
import { API } from '../services/api.js';

// Custom Tooltip for Bar Chart
const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{label}</p>
        <p style={{ margin: '4px 0 0', color: '#0066b3', fontSize: '18px', fontWeight: '600' }}>
          {payload[0].value.toFixed(2)} kg
        </p>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Line Chart
const CustomLineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid #0066b3',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(0,102,179,0.2)'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{label}</p>
        <p style={{ margin: '4px 0 0', color: '#0066b3', fontSize: '18px', fontWeight: '600' }}>
          {payload[0].value.toFixed(2)} kg
        </p>
      </div>
    );
  }
  return null;
};

// Gradient colors for bars
const barColors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

// Chart container style
const chartContainerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

// Weekly Line Chart (7 Days)
export function Chart_7_days() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        setLoading(true);
        const response = await API.getWeeklyData();
        if (response.data.success) {
          // Transform data for Recharts
          const chartData = response.data.data.dates.map((date, index) => ({
            date,
            weight: response.data.data.quantities[index] || 0,
            count: response.data.data.counts?.[index] || 0
          }));
          setData(chartData);
        } else {
          setError('Failed to load weekly data');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch weekly data');
        console.error('Weekly data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
    const interval = setInterval(fetchWeeklyData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={chartContainerStyle}>
        <CircularProgress />
        <Typography variant="body2" style={{ marginTop: '10px' }}>Loading weekly data...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={chartContainerStyle}>
        <Alert variant="filled" severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 600 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0066b3" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#0066b3" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#333', fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: '#ccc' }}
          />
          <YAxis
            tick={{ fill: '#333', fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: '#ccc' }}
            label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', fill: '#333', fontWeight: 600 }}
          />
          <Tooltip content={<CustomLineTooltip />} />
          <Area
            type="monotone"
            dataKey="weight"
            stroke="#0066b3"
            strokeWidth={3}
            fill="url(#colorWeight)"
            animationDuration={1500}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#0066b3"
            strokeWidth={3}
            dot={{ fill: '#0066b3', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 8, fill: '#004080', stroke: '#fff', strokeWidth: 2 }}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Monthly Bar Chart (4 Weeks)
export function Chart_4_weeks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        setLoading(true);
        const response = await API.getMonthlyData();
        if (response.data.success) {
          // Transform data for Recharts
          const chartData = response.data.data.weeks.map((week, index) => ({
            week,
            weight: response.data.data.quantities[index] || 0,
            count: response.data.data.counts?.[index] || 0
          }));
          setData(chartData);
        } else {
          setError('Failed to load monthly data');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch monthly data');
        console.error('Monthly data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
    const interval = setInterval(fetchMonthlyData, 100000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={chartContainerStyle}>
        <CircularProgress />
        <Typography variant="body2" style={{ marginTop: '10px' }}>Loading monthly data...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={chartContainerStyle}>
        <Alert variant="outlined" severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 600 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            {barColors.map((color, index) => (
              <linearGradient key={index} id={`barGrad${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.7} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fill: '#333', fontSize: 14, fontWeight: 600 }}
            axisLine={{ stroke: '#ccc' }}
          />
          <YAxis
            tick={{ fill: '#333', fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: '#ccc' }}
            label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', fill: '#333', fontWeight: 600 }}
          />
          <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
          <Bar
            dataKey="weight"
            radius={[8, 8, 0, 0]}
            animationDuration={1200}
            animationEasing="ease-out"
            label={{ position: 'top', fill: '#333', fontWeight: 600, fontSize: 14 }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#barGrad${index})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Meal colors for Donut chart
const MEAL_COLORS = {
  breakfast: '#FF6B6B',
  lunch: '#4ECDC4',
  snacks_tea: '#45B7D1',
  dinner: '#96CEB4',
  midnight_snacks: '#9B59B6',
  supper: '#F39C12'
};

// Interactive Active Shape for Donut
const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;

  return (
    <g>
      {/* Center text */}
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" fill="#666" fontSize="14">
        {(value / 1000).toFixed(2)} kg
      </text>
      <text x={cx} y={cy + 35} textAnchor="middle" fill="#999" fontSize="12">
        ({(percent * 100).toFixed(1)}%)
      </text>

      {/* Expanded sector */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
      />

      {/* Inner ring */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={innerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

// Interactive Donut Chart for Meal Distribution
export function MealDistributionChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setLoading(true);
        const response = await API.getSessionWeights();
        if (response.data.success) {
          const sessionData = response.data.data;
          const chartData = [
            { name: 'Breakfast', value: sessionData.breakfast || 0, color: MEAL_COLORS.breakfast },
            { name: 'Lunch', value: sessionData.lunch || 0, color: MEAL_COLORS.lunch },
            { name: 'Snacks & Tea', value: sessionData.snacks_tea || 0, color: MEAL_COLORS.snacks_tea },
            { name: 'Dinner', value: sessionData.dinner || 0, color: MEAL_COLORS.dinner },
            { name: 'Midnight', value: sessionData.midnight_snacks || 0, color: MEAL_COLORS.midnight_snacks },
            { name: 'Supper', value: sessionData.supper || 0, color: MEAL_COLORS.supper }
          ].filter(item => item.value > 0); // Only show meals with data
          setData(chartData);
        } else {
          setError('Failed to load session data');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch session data');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
    const interval = setInterval(fetchSessionData, 30000);
    return () => clearInterval(interval);
  }, []);

  const onPieEnter = useCallback((_, index) => {
    setActiveIndex(index);
  }, []);

  if (loading) {
    return (
      <div style={chartContainerStyle}>
        <CircularProgress />
        <Typography variant="body2" style={{ marginTop: '10px' }}>Loading meal data...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={chartContainerStyle}>
        <Alert variant="outlined" severity="error">{error}</Alert>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={chartContainerStyle}>
        <Typography variant="body2" color="textSecondary">No meal data available</Typography>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
            onMouseEnter={onPieEnter}
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                style={{ cursor: 'pointer', outline: 'none' }}
              />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: '#333', fontWeight: 500 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Main Charts Component with Tabs
export default function Charts() {
  const [activeTab, setActiveTab] = useState(0);
  const [mealData, setMealData] = useState([]);

  // Fetch meal data when tab 1 is active
  useEffect(() => {
    if (activeTab === 1) {
      const fetchMealData = async () => {
        try {
          const response = await API.getSessionWeights();
          if (response.data.success) {
            const sessionData = response.data.data;
            const chartData = [
              { name: 'Breakfast', value: sessionData.breakfast || 0, color: MEAL_COLORS.breakfast },
              { name: 'Lunch', value: sessionData.lunch || 0, color: MEAL_COLORS.lunch },
              { name: 'Snacks & Tea', value: sessionData.snacks_tea || 0, color: MEAL_COLORS.snacks_tea },
              { name: 'Dinner', value: sessionData.dinner || 0, color: MEAL_COLORS.dinner },
              { name: 'Midnight', value: sessionData.midnight_snacks || 0, color: MEAL_COLORS.midnight_snacks },
              { name: 'Supper', value: sessionData.supper || 0, color: MEAL_COLORS.supper }
            ].filter(item => item.value > 0);
            setMealData(chartData);
          }
        } catch (err) {
          console.error('Error fetching meal data:', err);
        }
      };
      fetchMealData();
      const interval = setInterval(fetchMealData, 30000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', padding: '16px' }}>
      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Box sx={{
          display: 'flex',
          gap: 1,
          '& button': {
            minHeight: '48px',
            fontSize: '0.95rem',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '8px 8px 0 0',
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
              background: 'linear-gradient(145deg, #0066b3 0%, #004d87 100%)',
              color: '#fff !important'
            },
            '&:hover': {
              background: 'rgba(0, 102, 179, 0.08)'
            }
          }
        }}>
          <button
            onClick={() => setActiveTab(0)}
            style={{
              padding: '12px 24px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 0 ? 'linear-gradient(145deg, #0066b3 0%, #004d87 100%)' : 'transparent',
              color: activeTab === 0 ? '#fff' : '#666',
              borderRadius: '8px 8px 0 0',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
          >
            📊 Charts Overview
          </button>
          <button
            onClick={() => setActiveTab(1)}
            style={{
              padding: '12px 24px',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 1 ? 'linear-gradient(145deg, #0066b3 0%, #004d87 100%)' : 'transparent',
              color: activeTab === 1 ? '#fff' : '#666',
              borderRadius: '8px 8px 0 0',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
          >
            🍩 Meal Distribution
          </button>
        </Box>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box sx={{ display: 'flex', gap: 2, minHeight: '700px' }}>
          {/* LEFT - Weekly Overview (Bar Chart) */}
          <Box sx={{ flex: 1 }}>
            <Card elevation={3} sx={{
              height: '100%',
              borderRadius: '16px',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }
            }}>
              <CardContent sx={{ padding: '20px !important' }}>
                <Typography variant="h6" sx={{
                  fontWeight: 700,
                  color: '#1e293b',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '1rem'
                }}>
                  📊 Weekly Overview (Last 4 Weeks)
                </Typography>
                <Chart_4_weeks />
              </CardContent>
            </Card>
          </Box>

          {/* RIGHT - Daily Tracking (Line Chart) */}
          <Box sx={{ flex: 1 }}>
            <Card elevation={3} sx={{
              height: '100%',
              borderRadius: '16px',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }
            }}>
              <CardContent sx={{ padding: '20px !important' }}>
                <Typography variant="h6" sx={{
                  fontWeight: 700,
                  color: '#1e293b',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '1rem'
                }}>
                  📈 Daily Tracking (Last 7 Days)
                </Typography>
                <Chart_7_days />
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ minHeight: '700px' }}>
          {/* Statistics Cards Row */}
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
            {/* Total Waste Card */}
            <Card elevation={2} sx={{ flex: 1, borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <CardContent sx={{ padding: '20px !important', color: '#fff' }}>
                <Typography variant="body2" sx={{ opacity: 0.9, marginBottom: '4px' }}>Total Waste Today</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {(mealData.reduce((acc, item) => acc + item.value, 0) / 1000).toFixed(2)} kg
                </Typography>
              </CardContent>
            </Card>

            {/* Top Contributor Card */}
            <Card elevation={2} sx={{ flex: 1, borderRadius: '12px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <CardContent sx={{ padding: '20px !important', color: '#fff' }}>
                <Typography variant="body2" sx={{ opacity: 0.9, marginBottom: '4px' }}>Top Contributor</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {mealData.length > 0 ? mealData.reduce((max, item) => item.value > max.value ? item : max, mealData[0]).name : 'N/A'}
                </Typography>
              </CardContent>
            </Card>

            {/* Meal Sessions Card */}
            <Card elevation={2} sx={{ flex: 1, borderRadius: '12px', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <CardContent sx={{ padding: '20px !important', color: '#fff' }}>
                <Typography variant="body2" sx={{ opacity: 0.9, marginBottom: '4px' }}>Active Meals</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {mealData.length}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Main Content Row */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Donut Chart */}
            <Card elevation={3} sx={{
              flex: 1.5,
              borderRadius: '16px',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }
            }}>
              <CardContent sx={{ padding: '32px !important' }}>
                <Typography variant="h6" sx={{
                  fontWeight: 700,
                  color: '#1e293b',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '1.1rem'
                }}>
                  🍩 Meal Distribution
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', marginBottom: '24px' }}>
                  Hover over slices to see details
                </Typography>
                <MealDistributionChart />
              </CardContent>
            </Card>

            {/* Detailed Breakdown Table */}
            <Card elevation={3} sx={{
              flex: 1,
              borderRadius: '16px',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }
            }}>
              <CardContent sx={{ padding: '24px !important' }}>
                <Typography variant="h6" sx={{
                  fontWeight: 700,
                  color: '#1e293b',
                  marginBottom: '16px',
                  fontSize: '1.1rem'
                }}>
                  📋 Detailed Breakdown
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {mealData.map((item, index) => (
                    <Box key={index} sx={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: '#edf2f7',
                        transform: 'translateX(4px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                      }
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: item.color
                          }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>
                            {item.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#0066b3' }}>
                          {(item.value / 1000).toFixed(2)} kg
                        </Typography>
                      </Box>
                      <Box sx={{ marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          {((item.value / mealData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}% of total
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </Box>
  );
}

