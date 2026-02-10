import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ title, value, icon: IconComponent, trend }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 transition-all duration-300 hover:border-indigo-200 hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-slate-600 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2">
            {title}
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-slate-900">
            {value}
          </p>
        </div>
        {IconComponent && (
          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 ml-3">
            <IconComponent size={24} />
          </div>
        )}
      </div>
      
      {trend && (
        <div className="flex items-center gap-2">
          {trend.positive ? (
            <TrendingUp size={16} className="text-green-600" />
          ) : (
            <TrendingDown size={16} className="text-red-600" />
          )}
          <p className={`text-xs font-semibold ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.value}% from last month
          </p>
        </div>
      )}
    </div>
  );
};

export default StatCard;
