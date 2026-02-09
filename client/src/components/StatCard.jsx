import React from "react";

const StatCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-slate-600 text-xs sm:text-sm font-medium mb-2">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900">
            {value}
          </p>
        </div>
        {icon && (
          <div className="text-2xl sm:text-3xl ml-2">
            {icon}
          </div>
        )}
      </div>
      
      {trend && (
        <p className={`text-xs font-medium ${trend.positive ? 'text-success' : 'text-warning'}`}>
          {trend.positive ? '↑' : '↓'} {trend.value}% from last month
        </p>
      )}
    </div>
  );
};

export default StatCard;
