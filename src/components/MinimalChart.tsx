import React from 'react';

interface MinimalChartProps {
  data: number[];
  title: string;
  value: string;
  growth: number;
  color: string;
}

const MinimalChart: React.FC<MinimalChartProps> = ({ 
  data, 
  title, 
  value, 
  growth, 
  color 
}) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  // Normalize data points to fit in chart area (0-40)
  const normalizedData = data.map(point => 
    range === 0 ? 20 : ((point - minValue) / range) * 30 + 5
  );

  // Create simple line path
  const createPath = (points: number[]) => {
    const width = 120;
    const height = 40;
    const stepX = width / (points.length - 1);
    
    let path = `M 0,${height - points[0]}`;
    
    for (let i = 1; i < points.length; i++) {
      const x = i * stepX;
      const y = height - points[i];
      path += ` L ${x},${y}`;
    }
    
    return path;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
          growth >= 0 
            ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30' 
            : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
        }`}>
          <span className={`inline-block w-0 h-0 mr-1 ${
            growth >= 0 
              ? 'border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-green-600 dark:border-b-green-400'
              : 'border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-red-600 dark:border-t-red-400'
          }`}></span>
          {Math.abs(growth)}%
        </div>
      </div>
      
      <div className="relative h-10 overflow-hidden">
        <svg
          width="120"
          height="40"
          viewBox="0 0 120 40"
          className="w-full h-full"
        >
          <path
            d={createPath(normalizedData)}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />
          
          {/* Last point indicator */}
          <circle
            cx={120 * (normalizedData.length - 1) / (normalizedData.length - 1)}
            cy={40 - normalizedData[normalizedData.length - 1]}
            r="2"
            fill={color}
            className="drop-shadow-sm"
          />
        </svg>
      </div>
    </div>
  );
};

export default MinimalChart;