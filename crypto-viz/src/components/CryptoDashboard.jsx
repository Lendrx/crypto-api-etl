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
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
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

  const COLORS = ['#2563EB', '#10B981', '#FACC15', '#4F46E5', '#EF4444'];

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Crypto Market Dashboard</h1>
        <div className="flex items-center gap-2 text-gray-700 bg-blue-50 p-2 rounded-md">
          <Clock className="w-6 h-6" />
          <span className="font-semibold">{currentTime.toLocaleString()}</span>
        </div>
      </div>

      {/* Market Capitalization Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800">Market Capitalization</h2>
          <p className="text-sm text-gray-600 mb-4">Total value in billions USD</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketCapData}>
                <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1e9).toFixed(0)}B`}
                  tick={{ fill: '#4B5563' }}
                />
                <Tooltip formatter={(value) => `$${(value / 1e9).toFixed(2)}B`} />
                <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trading Volume Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800">24h Trading Volume</h2>
          <p className="text-sm text-gray-600 mb-4">Distribution of trading volume</p>
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
                <Tooltip formatter={(value) => `$${(value / 1e9).toFixed(2)}B`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cryptocurrency Prices Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">Cryptocurrency Prices</h2>
        <p className="text-sm text-gray-600 mb-4">Live price updates and statistics</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-50 border-collapse">
            <thead className="border-b">
              <tr>
                <th className="p-4 text-left text-gray-700 font-bold">Name</th>
                <th className="p-4 text-left text-gray-700 font-bold">Symbol</th>
                <th className="p-4 text-right text-gray-700 font-bold">Price (USD)</th>
                <th className="p-4 text-right text-gray-700 font-bold">24h Change</th>
                <th className="p-4 text-right text-gray-700 font-bold">Market Cap</th>
                <th className="p-4 text-right text-gray-700 font-bold">Volume (24h)</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto) => (
                <tr key={crypto.symbol} className="hover:bg-gray-100">
                  <td className="p-4 text-gray-800">{crypto.name}</td>
                  <td className="p-4 text-gray-800">{crypto.symbol}</td>
                  <td className="p-4 text-right text-gray-800">${crypto.price.toLocaleString()}</td>
                  <td
                    className={`p-4 text-right ${
                      crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {crypto.change24h > 0 ? '+' : ''}
                    {crypto.change24h}%
                  </td>
                  <td className="p-4 text-right text-gray-800">${(crypto.marketCap / 1e9).toFixed(2)}B</td>
                  <td className="p-4 text-right text-gray-800">${(crypto.volume24h / 1e9).toFixed(2)}B</td>
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
