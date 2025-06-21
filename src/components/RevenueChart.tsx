import React from 'react';

interface RevenueChartProps {
  data: number[];
  title: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  // Normalize data points to fit in chart area
  const normalizedData = data.map(point => 
    range === 0 ? 50 : ((point - minValue) / range) * 80 + 10
  );

  // Create smooth curve path
  const createPath = (points: number[]) => {
    const width = 400;
    const height = 200;
    const stepX = width / (points.length - 1);
    
    let path = `M 0,${height - points[0]}`;
    
    for (let i = 1; i < points.length; i++) {
      const x = i * stepX;
      const y = height - points[i];
      
      // Create smooth curves using quadratic bezier
      const prevX = (i - 1) * stepX;
      const prevY = height - points[i - 1];
      const cpX = prevX + stepX / 2;
      const cpY = (prevY + y) / 2;
      
      path += ` Q ${cpX},${prevY} ${x},${y}`;
    }
    
    return path;
  };

  const createAreaPath = (points: number[]) => {
    const width = 400;
    const height = 200;
    const stepX = width / (points.length - 1);
    
    let path = `M 0,${height - points[0]}`;
    
    for (let i = 1; i < points.length; i++) {
      const x = i * stepX;
      const y = height - points[i];
      
      const prevX = (i - 1) * stepX;
      const prevY = height - points[i - 1];
      const cpX = prevX + stepX / 2;
      const cpY = (prevY + y) / 2;
      
      path += ` Q ${cpX},${prevY} ${x},${y}`;
    }
    
    // Close the path to create filled area
    path += ` L ${width},${height} L 0,${height} Z`;
    
    return path;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Receita</span>
        </div>
      </div>
      
      <div className="relative h-64 mb-4">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 200"
          className="absolute inset-0"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 50}
              x2="400"
              y2={i * 50}
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
          
          {/* Filled area */}
          <path
            d={createAreaPath(normalizedData)}
            fill="url(#revenueGradient)"
          />
          
          {/* Line */}
          <path
            d={createPath(normalizedData)}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          
          {/* Data points */}
          {normalizedData.map((point, index) => (
            <circle
              key={index}
              cx={(index * 400) / (normalizedData.length - 1)}
              cy={200 - point}
              r="4"
              fill="#3b82f6"
              className="opacity-0 hover:opacity-100 transition-opacity duration-200"
            />
          ))}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Jan</span>
        <span>Fev</span>
        <span>Mar</span>
        <span>Abr</span>
        <span>Mai</span>
        <span>Jun</span>
      </div>
      
      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Maior Valor</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(maxValue)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Menor Valor</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(minValue)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Média</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(data.reduce((a, b) => a + b, 0) / data.length)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;