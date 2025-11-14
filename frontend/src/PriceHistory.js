import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PriceHistory.css';
const PriceHistory = ({ platformData }) => {
  const priceHistory = [
    { date: 'Jan 1', amazon: 25999, flipkart: 26499, croma: 27999 },
    { date: 'Jan 8', amazon: 25499, flipkart: 25999, croma: 27499 },
    { date: 'Jan 15', amazon: 24999, flipkart: 24499, croma: 26999 },
    { date: 'Jan 22', amazon: 24999, flipkart: 23499, croma: 25999 },
    { date: 'Jan 29', amazon: 24999, flipkart: 23499, croma: 25999 },
    { date: 'Feb 5', amazon: 24999, flipkart: 23499, croma: 25999 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Price History</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amazon" stroke="#FF9900" name="Amazon" />
            <Line type="monotone" dataKey="flipkart" stroke="#2874F0" name="Flipkart" />
            <Line type="monotone" dataKey="croma" stroke="#0D0C22" name="Croma" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex items-center mx-2">
          <div className="w-3 h-3 rounded-full bg-[#FF9900] mr-1"></div>
          <span className="text-xs">Amazon</span>
        </div>
        <div className="flex items-center mx-2">
          <div className="w-3 h-3 rounded-full bg-[#2874F0] mr-1"></div>
          <span className="text-xs">Flipkart</span>
        </div>
        <div className="flex items-center mx-2">
          <div className="w-3 h-3 rounded-full bg-[#0D0C22] mr-1"></div>
          <span className="text-xs">Croma</span>
        </div>
      </div>
    </div>
  );
};

export default PriceHistory;
