import React, { useEffect, useState } from 'react';
import api from '../api';
import { Pie } from 'react-chartjs-2';
import '../styles/SalesStat.css';

// ✅ Register Chart.js elements
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SalesStat() {
  const [data, setData] = useState({ allsales: [], allsalesforpie: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/api/stat');
      setData(res.data);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.allsalesforpie.map(i => i.item_name),
    datasets: [
      {
        label: 'Sales ₹',
        data: data.allsalesforpie.map(i => i.total),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  return (
    <div className="sales-stat-container">
      <h2 className="sales-stat-title">Sales Statistics</h2>

      <div className="sales-stat-chart">
        <Pie data={chartData} />
      </div>

      <h3 className="sales-log-heading">Sales Log</h3>
      <ul className="sales-log-list">
        {data.allsales.map((s, i) => (
          <li key={i} className="sales-log-item">
            {s.date?.substring(0, 10)} | {s.item_name} | Qty: {s.quantity} | ₹{s.unit_price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalesStat;
