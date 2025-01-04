'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, RefreshCcw, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

const CryptoDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [loading, setLoading] = useState(true);
  
  const cryptoData = [
    { name: 'Bitcoin', symbol: 'BTC', price: 66584.23, change24h: 2.34, marketCap: 1310000000000, volume24h: 28970000000 },
    { name: 'Ethereum', symbol: 'ETH', price: 3456.78, change24h: -1.23, marketCap: 412550000000, volume24h: 15970000000 },
    { name: 'Binance Coin', symbol: 'BNB', price: 567.89, change24h: 1.45, marketCap: 87650000000, volume24h: 5970000000 },
    { name: 'Solana', symbol: 'SOL', price: 189.34, change24h: 3.67, marketCap: 82340000000, volume24h: 4570000000 },
    { name: 'Cardano', symbol: 'ADA', price: 0.89, change24h: -0.56, marketCap: 31240000000, volume24h: 1970000000 }
  ];

  // Moderne, helle Farben für die Charts
  const COLORS = ['#60A5FA', '#34D399', '#FBBF24', '#A78BFA', '#F87171'];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + ' Mrd. €';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + ' Mio. €';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + ' Tsd. €';
    return num.toLocaleString('de-DE') + ' €';
  };

  const generateTimeSeriesData = (crypto) => {
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      price: crypto.price * (1 + (Math.random() * 0.1 - 0.05))
    }));
  };

  const CryptoCard = ({ crypto, color }) => (
    <Card className="w-full transition-all duration-200 hover:shadow-lg bg-white border border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-black">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="font-bold">{crypto.name}</span>
            <span className="text-sm text-black">({crypto.symbol})</span>
          </div>
          <span className={`flex items-center font-bold ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {crypto.change24h >= 0 ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
            {Math.abs(crypto.change24h)}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-4 text-black">
          {formatNumber(crypto.price)}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-semibold text-black mb-1">Marktkapitalisierung</div>
            <div className="text-black">{formatNumber(crypto.marketCap)}</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-black mb-1">24h Volumen</div>
            <div className="text-black">{formatNumber(crypto.volume24h)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const MarketCapComparison = () => (
    <Card className="col-span-2 bg-white border border-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black">
          <BarChart3 className="w-5 h-5" />
          <span className="font-bold">Marktkapitalisierung im Vergleich</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cryptoData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#000000' }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <YAxis 
                tickFormatter={(value) => `${(value / 1e9).toFixed(0)} Mrd.`}
                tick={{ fill: '#000000' }}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <Tooltip 
                cursor={{fill: 'rgba(0, 0, 0, 0.1)'}}
                formatter={(value) => formatNumber(value)}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              />
              <Bar dataKey="marketCap" radius={[4, 4, 0, 0]}>
                {cryptoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  const VolumeDistribution = () => (
    <Card className="col-span-2 bg-white border border-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black">
          <DollarSign className="w-5 h-5" />
          <span className="font-bold">Handelsvolumen-Verteilung</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={cryptoData}
                dataKey="volume24h"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {cryptoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatNumber(value)}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-black">Krypto Dashboard</h1>
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-blue-600 font-medium"
            onClick={() => setLoading(true)}
          >
            <RefreshCcw className="w-4 h-4" />
            Aktualisieren
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cryptoData.map((crypto, index) => (
            <CryptoCard 
              key={crypto.symbol} 
              crypto={crypto} 
              color={COLORS[index % COLORS.length]}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarketCapComparison />
          <VolumeDistribution />
        </div>

        <Card className="bg-white border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <TrendingUp className="w-5 h-5" />
              <span className="font-bold">Kursentwicklung</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={cryptoData[0].symbol} className="w-full">
              <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <TabsList className="bg-gray-50 p-1 rounded-lg">
                  {cryptoData.map((crypto) => (
                    <TabsTrigger 
                      key={crypto.symbol} 
                      value={crypto.symbol}
                      className="text-black data-[state=active]:bg-white"
                    >
                      {crypto.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <div className="flex gap-2">
                  {['24h', '7d', '30d'].map((timeframe) => (
                    <button 
                      key={timeframe}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedTimeframe === timeframe 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-50 text-black hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedTimeframe(timeframe)}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>

              {cryptoData.map((crypto) => (
                <TabsContent key={crypto.symbol} value={crypto.symbol}>
                  <div className="h-96 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generateTimeSeriesData(crypto)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="time"
                          tick={{ fill: '#000000' }}
                          axisLine={{ stroke: '#e0e0e0' }}
                        />
                        <YAxis 
                          domain={['auto', 'auto']}
                          tickFormatter={(value) => formatNumber(value)}
                          tick={{ fill: '#000000' }}
                          axisLine={{ stroke: '#e0e0e0' }}
                        />
                        <Tooltip 
                          formatter={(value) => formatNumber(value)}
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #f0f0f0',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke={COLORS[cryptoData.indexOf(crypto) % COLORS.length]} 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoDashboard;