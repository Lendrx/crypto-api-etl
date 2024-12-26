'use client'
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const CryptoDashboard = () => {
  const [data] = useState([
    {
      "Name": "Bitcoin",
      "Symbol": "BTC",
      "Preis (USD)": 66584.23,
      "Marktkapitalisierung (USD)": 1312547896541.25,
      "Volumen 24h (USD)": 28965412365.45,
      "Änderung 24h (%)": 2.34
    },
    {
      "Name": "Ethereum",
      "Symbol": "ETH",
      "Preis (USD)": 3456.78,
      "Marktkapitalisierung (USD)": 412547896541.25,
      "Volumen 24h (USD)": 15965412365.45,
      "Änderung 24h (%)": -1.23
    }
  ]);

  // Verbesserte Farbpalette für besseren Kontrast
  const COLORS = ['#2563eb', '#16a34a', '#ea580c', '#9333ea', '#0891b2'];

  const formatValue = (value) => {
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    return value.toFixed(2);
  };

  const marketCapData = data.map(item => ({
    name: item.Symbol,
    value: item['Marktkapitalisierung (USD)']
  }));

  const volumeData = data.map(item => ({
    name: item.Symbol,
    value: item['Volumen 24h (USD)']
  }));

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white">Crypto Market Dashboard</h1>
        <p className="text-blue-100 mt-2">Live Cryptocurrency Market Data</p>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Market Cap Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Market Capitalization
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketCapData}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#1f2937' }}
                  />
                  <YAxis 
                    tickFormatter={formatValue}
                    tick={{ fill: '#1f2937' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value) => formatValue(value)}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#2563eb"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Volume Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              24h Trading Volume
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={volumeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={(entry) => entry.name}
                  >
                    {volumeData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value) => formatValue(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Price Table */}
        <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Cryptocurrency Prices
          </h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Symbol</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price (USD)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">24h Change</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Market Cap</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Volume (24h)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((coin, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                    {coin.Name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {coin.Symbol}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    ${coin['Preis (USD)'].toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center">
                      {coin['Änderung 24h (%)'] > 0 ? (
                        <TrendingUp className="text-emerald-500 w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="text-red-500 w-4 h-4 mr-1" />
                      )}
                      <span className={coin['Änderung 24h (%)'] > 0 ? 'text-emerald-500' : 'text-red-500'}>
                        {coin['Änderung 24h (%)'].toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    ${formatValue(coin['Marktkapitalisierung (USD)'])}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    ${formatValue(coin['Volumen 24h (USD)'])}
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