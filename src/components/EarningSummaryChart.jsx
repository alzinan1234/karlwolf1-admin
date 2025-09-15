"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { DollarSign, TrendingUp, Activity, Users } from "lucide-react";

const EarningSummaryChart = () => {
  const [timeRange, setTimeRange] = useState("Monthly");

  // Generate fake data for the chart
  const monthlyData = [
    { month: "Jan", new: 320, old: 280 },
    { month: "Feb", new: 350, old: 320 },
    { month: "Mar", new: 380, old: 340 },
    { month: "Apr", new: 420, old: 380 },
    { month: "May", new: 450, old: 400 },
    { month: "Jun", new: 480, old: 420 },
    { month: "Jul", new: 460, old: 430 },
    { month: "Aug", new: 490, old: 450 },
    { month: "Sep", new: 480, old: 440 },
    { month: "Oct", new: 510, old: 460 },
    { month: "Nov", new: 495, old: 470 },
    { month: "Dec", new: 520, old: 480 },
  ];

  const dailyData = Array.from({ length: 30 }, (_, i) => ({
    month: `D${i + 1}`,
    new: Math.floor(Math.random() * 100) + 400,
    old: Math.floor(Math.random() * 100) + 350,
  }));

  const weeklyData = Array.from({ length: 12 }, (_, i) => ({
    month: `W${i + 1}`,
    new: Math.floor(Math.random() * 100) + 400,
    old: Math.floor(Math.random() * 100) + 350,
  }));

  const yearlyData = Array.from({ length: 12 }, (_, i) => ({
    month: 2013 + i,
    new: Math.floor(Math.random() * 2000) + 3000,
    old: Math.floor(Math.random() * 2000) + 2500,
  }));

  const getChartData = () => {
    switch (timeRange) {
      case "Daily":
        return dailyData;
      case "Weekly":
        return weeklyData;
      case "Yearly":
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 p-3 rounded-lg border border-purple-500/30">
          <p className="text-white text-sm font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className=" w-full  ">
        {/* Main Dashboard Card */}
        <div className=" flex w-full">
          <div className="bg-[#312B36] w-full rounded-2xl p-4">
            <div className="flex gap-24">
              {/* Left Section */}
              <div className="flex flex-col justify-between ">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-white text-lg font-semibold">
                    Dashboard
                  </h2>
                  <p className="text-gray-400 text-xs">
                    Overview of Latest Month
                  </p>
                </div>

                {/* User Growth */}
                <div className="mb-6">
                  <p className="text-gray-400 text-xs mb-1">User Growth</p>
                  <p className="text-[#2BA849] text-2xl font-semibold">+15%</p>
                </div>

                {/* Plays vs. Bangs */}
                <div className="mb-6">
                  <p className="text-white text-2xl font-semibold">12,345</p>
                  <p className="text-gray-400 text-xs">Plays vs. Bangs</p>
                </div>

                {/* Summary Button */}
                <button className="px-4 py-3 border border-[#896E9C] rounded-full text-white text-xs hover:bg-[#896E9C]/20 transition-colors">
                  Last Month Summary
                </button>
              </div>

              {/* Right Section - Chart */}
              <div className="flex-1 w-full">
                {/* Chart Controls */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-6">
                    {["Daily", "Weekly", "Monthly", "Yearly"].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`text-xs transition-colors ${
                          timeRange === range
                            ? "text-white font-medium"
                            : "text-gray-400 hover:text-gray-300"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#A141FE] rounded-full"></div>
                      <span className="text-gray-300 text-xs">New</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#245FE7] rounded-full"></div>
                      <span className="text-gray-300 text-xs">Old</span>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="  md:h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={getChartData()}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorNew"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#A141FE"
                            stopOpacity={0.5}
                          />
                          <stop
                            offset="95%"
                            stopColor="#A141FE"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorOld"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#245FE7"
                            stopOpacity={0.5}
                          />
                          <stop
                            offset="95%"
                            stopColor="#245FE7"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="0"
                        stroke="#E2E8F0"
                        strokeOpacity={0.1}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#CBD5E0",
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#CBD5E0",
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                        ticks={[0, 100, 200, 300, 400, 500]}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="new"
                        stroke="#A141FE"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorNew)"
                      />
                      <Area
                        type="monotone"
                        dataKey="old"
                        stroke="#245FE7"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorOld)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="flex mt-6  w-full">
              {/* This Month Earning */}
              <div className="flex-1 px-16 py-4 w-full border-t border-r border-[#896E9C] flex items-center gap-3">
                <div className="w-10 h-10 bg-[#29232A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">This Month Earning</p>
                  <p className="text-white text-sm font-medium">$1689.53</p>
                </div>
              </div>

              {/* Total Earning */}
              <div className="flex-1 px-16 py-4 w-full border-t border-[#896E9C] flex items-center gap-3">
                <div className="w-10 h-10 bg-[#29232A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Total Earning</p>
                  <p className="text-white text-sm font-medium">$52,567.53</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="flex flex-col gap-6 ml-6 w-1/2 ">
            {/* New/Old Toggle */}

            {/* Total Playlist Card */}
            <div className="bg-[#312B36] rounded-xl p-[20px] w-full py-18 px-10 ">
              <div className="flex items-center justify-between mb-2 ">
                <div>
                  <p className="text-white text-xs">Total Playlist</p>
                  <p className="text-white text-4xl font-bold">12</p>
                </div>

                <div className=" bg-[#29232A] rounded-lg flex items-center justify-center p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="19"
                    viewBox="0 0 21 19"
                    fill="none"
                  >
                    <path
                      d="M19 1.6521H1H19ZM19 6.31877H1H19ZM9 10.9854H1H9ZM9 15.6521H1H9Z"
                      fill="#E2E8F0"
                    />
                    <path
                      d="M19 1.6521H1M19 6.31877H1M9 10.9854H1M9 15.6521H1"
                      stroke="url(#paint0_linear_19_496)"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M16.875 11.7701C18.529 12.7251 19.355 13.2031 19.477 13.8911C19.5074 14.0634 19.5074 14.2398 19.477 14.4121C19.356 15.1021 18.529 15.5791 16.875 16.5331C15.221 17.4881 14.395 17.9661 13.737 17.7271C13.5726 17.6671 13.42 17.5787 13.286 17.4661C12.75 17.0161 12.75 16.0621 12.75 14.1521C12.75 12.2421 12.75 11.2871 13.286 10.8381C13.42 10.7258 13.5727 10.6378 13.737 10.5781C14.394 10.3381 15.221 10.8161 16.875 11.7701Z"
                      fill="url(#paint1_linear_19_496)"
                      stroke="url(#paint2_linear_19_496)"
                      stroke-width="1.5"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_19_496"
                        x1="10"
                        y1="1.6521"
                        x2="10"
                        y2="15.6521"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF7DD0" />
                        <stop offset="1" stop-color="#F7009E" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_19_496"
                        x1="16.1249"
                        y1="10.5168"
                        x2="16.1249"
                        y2="17.788"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF7DD0" />
                        <stop offset="1" stop-color="#F7009E" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_19_496"
                        x1="16.1249"
                        y1="10.5168"
                        x2="16.1249"
                        y2="17.788"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF7DD0" />
                        <stop offset="1" stop-color="#F7009E" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Followers Card */}
            <div className="bg-[#312B36] rounded-xl p-[20px] w-full py-18 px-10">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-white text-xs">Active Subscribers</p>
                  <p className="text-white text-4xl font-bold">58,320</p>
                </div>

                <div className=" bg-[#29232A] rounded-lg flex items-center justify-center p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M20 8H4V6H20V8ZM18 2H6V4H18V2ZM22 12V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H4C3.47005 21.9984 2.96227 21.7872 2.58753 21.4125C2.2128 21.0377 2.00158 20.5299 2 20V12C2.00158 11.4701 2.2128 10.9623 2.58753 10.5875C2.96227 10.2128 3.47005 10.0016 4 10H20C20.5299 10.0016 21.0377 10.2128 21.4125 10.5875C21.7872 10.9623 21.9984 11.4701 22 12ZM13.927 17.042L16.25 15.056L13.191 14.8L12 12L10.809 14.8L7.75 15.056L10.073 17.042L9.373 20L12 18.428L14.627 20L13.927 17.042Z" fill="url(#paint0_linear_25596_8966)"/>
  <defs>
    <linearGradient id="paint0_linear_25596_8966" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF7DD0"/>
      <stop offset="1" stop-color="#F7009E"/>
    </linearGradient>
  </defs>
</svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningSummaryChart;
