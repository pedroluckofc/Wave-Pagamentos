import React from 'react';

interface ChartProps {
  data: number[];
  title: string;
  value: string;
  growth: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

const Chart: React.FC<ChartProps> = ({ 
  data, 
  title, 
  value, 
  growth, 
  color, 
  gradientFrom, 
  gradientTo 
}) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  // Normalize data points to fit in chart area (0-100)
  const normalizedData = data.map(point => 
    range === 0 ? 50 : ((point - minValue) / range) * 60 + 20
  );

  // Create SVG path for mountain chart
  const createPath = (points: number[]) => {
    const width = 300;
    const height = 120;
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
    
    // Close the path to create filled area
    path += ` L ${width},${height} L 0,${height} Z`;
    
    return path;
  };

  const createStrokePath = (points: number[]) => {
    const width = 300;
    const stepX = width / (points.length - 1);
    
    let path = `M 0,${120 - points[0]}`;
    
    for (let i = 1; i < points.length; i++) {
      const x = i * stepX;
      const y = 120 - points[i];
      
      const prevX = (i - 1) * stepX;
      const prevY = 120 - points[i - 1];
      const cpX = prevX + stepX / 2;
      const cpY = (prevY + y) / 2;
      
      path += ` Q ${cpX},${prevY} ${x},${y}`;
    }
    
    return path;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`flex items-center text-sm font-medium ${
          growth >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          <span className={`inline-block w-0 h-0 mr-1 ${
            growth >= 0 
              ? 'border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-green-600'
              : 'border-l-2 border-r-2 border-t-3 border-l-transparent border-r-transparent border-t-red-600'
          }`}></span>
          {Math.abs(growth)}%
        </div>
      </div>
      
      <div className="relative h-32 overflow-hidden rounded-lg">
        <svg
          width="100%"
          height="120"
          viewBox="0 0 300 120"
          className="absolute inset-0"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={gradientFrom} stopOpacity="0.8" />
              <stop offset="50%" stopColor={gradientTo} stopOpacity="0.4" />
              <stop offset="100%" stopColor={gradientTo} stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id={`stroke-${title}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="50%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.8" />
            </linearGradient>
            <filter id={`glow-${title}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Filled area */}
          <path
            d={createPath(normalizedData)}
            fill={`url(#gradient-${title})`}
            className="animate-pulse"
          />
          
          {/* Stroke line */}
          <path
            d={createStrokePath(normalizedData)}
            fill="none"
            stroke={`url(#stroke-${title})`}
            strokeWidth="2"
            filter={`url(#glow-${title})`}
            className="drop-shadow-sm"
          />
          
          {/* Data points */}
          {normalizedData.map((point, index) => (
            <circle
              key={index}
              cx={(index * 300) / (normalizedData.length - 1)}
              cy={120 - point}
              r="3"
              fill={color}
              className="opacity-0 hover:opacity-100 transition-opacity duration-200"
              filter={`url(#glow-${title})`}
            />
          ))}
        </svg>
        
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-20 animate-pulse"
          style={{
            background: `linear-gradient(45deg, ${gradientFrom}20, ${gradientTo}10, transparent)`
          }}
        ></div>
      </div>
      
      {/* Time indicators */}
      <div className="flex justify-between mt-3 text-xs text-gray-400">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>
    </div>
  );
};

export default Chart;