import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './ReviewAnalysis.css';



const ReviewAnalysis = ({ platforms }) => {
  const COLORS = ['#4ade80', '#93c5fd', '#f87171'];

  const prepareChartData = (platform) => {
    return [
      { name: 'Positive', value: platform.reviews.positive },
      { name: 'Neutral', value: platform.reviews.neutral },
      { name: 'Negative', value: platform.reviews.negative }
    ];
  };

  return (
    <div className="review-analysis-container-show">
      <h3 className="review-analysis-title">Sentiment Analysis Across Platforms</h3>
      <div className="review-grid">
        {platforms.map(platform => (
          <div key={platform.name} className="platform-card">
            <h4 className="platform-title">
              {platform.name} Reviews ({platform.currency || '$'}{platform.price || 'N/A'})
            </h4>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareChartData(platform)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {prepareChartData(platform).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="summary-text">{platform.reviews.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewAnalysis;
