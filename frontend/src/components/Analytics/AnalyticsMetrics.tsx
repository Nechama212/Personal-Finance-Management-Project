import React from 'react';

const AnalyticsMetrics: React.FC<{ analytics: Array<any> }> = ({ analytics }) => {
  console.log("Analytics data:", analytics);

  return (
    <div className="analytics-metrics">
      <h2>Analytics Metrics</h2>
      <ul>
        {analytics.map(metric => (
          <li key={metric.AnalyticsID}>
            {metric.Metric}: {metric.Value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsMetrics;
