'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Clock } from 'lucide-react';

const CryptoDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const cryptoData = [
    { name: 'Bitcoin', symbol: 'BTC', price: 66584.23, change24h: 2.34, marketCap: 1310000000000, volume24h: 28970000000 },
    { name: 'Ethereum', symbol: 'ETH', price: 3456.78, change24h: -1.23, marketCap: 412550000000, volume24h: 15970000000 },
    { name: 'Binance Coin', symbol: 'BNB', price: 567.89, change24h: 1.45, marketCap: 87650000000, volume24h: 5970000000 },
    { name: 'Solana', symbol: 'SOL', price: 189.34, change24h: 3.67, marketCap: 82340000000, volume24h: 4570000000 },
    { name: 'Cardano', symbol: 'ADA', price: 0.89, change24h: -0.56, marketCap: 31240000000, volume24h: 1970000000 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const marketCapData = cryptoData.map(crypto => ({
    name: crypto.symbol,
    value: crypto.marketCap
  }));

  const volumeData = cryptoData.map(crypto => ({
    name: crypto.symbol,
    value: crypto.volume24h
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EC4899'];

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Crypto Market Dashboard</h1>
        <div className="flex items-center gap-2 text-gray-700 bg-blue-50 p-2 rounded-md">
          <Clock className="w-5 h-5" />
          <span className="font-medium">{currentTime.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">Market Capitalization</h2>
            <p className="text-sm text-gray-600 mt-1">Total value in billions USD</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketCapData} margin={{ top: 20, right: 30, left: 40, bottom: 10 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#374151', fontSize: 12 }}
                  tickLine={{ stroke: '#374151' }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1e9)}B`}
                  domain={[0, Math.ceil(Math.max(...marketCapData.map(d => d.value)) / 1e11) * 1e11]}
                  ticks={[0, 200e9, 400e9, 600e9, 800e9, 1000e9, 1200e9, 1400e9]}
                  tick={{ fill: '#374151', fontSize: 12 }}
                  tickLine={{ stroke: '#374151' }}
                />
                <Tooltip 
                  formatter={(value) => [`$${(value / 1e9).toFixed(2)}B`, "Market Cap"]}
                  labelFormatter={(label) => `${label}`}
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    padding: '8px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#3B82F6" 
                  name="Market Cap"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">24h Trading Volume</h2>
            <p className="text-sm text-gray-600 mt-1">Distribution of trading volume</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={volumeData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {volumeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `$${(value / 1e9).toFixed(2)}B`}
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    padding: '8px'
                  }}
                />
                <Legend 
                  align="right"
                  verticalAlign="middle"
                  layout="vertical"
                  formatter={(value, entry) => {
                    const { payload } = entry;
                    return `${value} - $${(payload.value / 1e9).toFixed(2)}B`;
                  }}
                  wrapperStyle={{
                    fontSize: '12px',
                    color: '#374151',
                    padding: '8px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">Cryptocurrency Prices</h2>
          <p className="text-sm text-gray-600 mt-1">Live price updates and statistics</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 text-gray-700 font-bold">Name</th>
                <th className="text-left p-4 text-gray-700 font-bold">Symbol</th>
                <th className="text-right p-4 text-gray-700 font-bold">Price (USD)</th>
                <th className="text-right p-4 text-gray-700 font-bold">24h Change</th>
                <th className="text-right p-4 text-gray-700 font-bold">Market Cap</th>
                <th className="text-right p-4 text-gray-700 font-bold">Volume (24h)</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto) => (
                <tr key={crypto.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-gray-800">{crypto.name}</td>
                  <td className="p-4 text-gray-800 font-medium">{crypto.symbol}</td>
                  <td className="text-right p-4 text-gray-800 font-medium">
                    ${crypto.price.toLocaleString()}
                  </td>
                  <td className={`text-right p-4 font-medium ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {crypto.change24h > 0 ? '+' : ''}{crypto.change24h}%
                  </td>
                  <td className="text-right p-4 text-gray-800">
                    ${(crypto.marketCap / 1e9).toFixed(2)}B
                  </td>
                  <td className="text-right p-4 text-gray-800">
                    ${(crypto.volume24h / 1e9).toFixed(2)}B
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CryptoDashboard;