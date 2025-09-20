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
    { month: "Jan", plays: 320, money: 280 },
    { month: "Feb", plays: 350, money: 320 },
    { month: "Mar", plays: 380, money: 340 },
    { month: "Apr", plays: 420, money: 380 },
    { month: "May", plays: 450, money: 400 },
    { month: "Jun", plays: 480, money: 420 },
    { month: "Jul", plays: 460, money: 430 },
    { month: "Aug", plays: 490, money: 450 },
    { month: "Sep", plays: 480, money: 440 },
    { month: "Oct", plays: 510, money: 460 },
    { month: "Nov", plays: 495, money: 470 },
    { month: "Dec", plays: 520, money: 480 },
  ];

  const dailyData = Array.from({ length: 30 }, (_, i) => ({
    month: `D${i + 1}`,
    plays: Math.floor(Math.random() * 100) + 400,
    money: Math.floor(Math.random() * 100) + 350,
  }));

  const weeklyData = Array.from({ length: 12 }, (_, i) => ({
    month: `W${i + 1}`,
    plays: Math.floor(Math.random() * 100) + 400,
    money: Math.floor(Math.random() * 100) + 350,
  }));

  const yearlyData = Array.from({ length: 12 }, (_, i) => ({
    month: 2013 + i,
    plays: Math.floor(Math.random() * 2000) + 3000,
    money: Math.floor(Math.random() * 2000) + 2500,
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
                      <span className="text-gray-300 text-xs">Plays</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#245FE7] rounded-full"></div>
                      <span className="text-gray-300 text-xs">Money</span>
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
                          id="colorPlays"
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
                          id="colorMoney"
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
                        dataKey="plays"
                        stroke="#A141FE"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorPlays)"
                      />
                      <Area
                        type="monotone"
                        dataKey="money"
                        stroke="#245FE7"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorMoney)"
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
               <p className="text-gray-400 text-xs">Total Playlist</p>
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
                <p className="text-gray-400 text-xs">Total Followers</p>
              <p className="text-white text-4xl font-bold">58,320</p>
             </div>
               
                <div className=" bg-[#29232A] rounded-lg flex items-center justify-center p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11 9.9563C11 7.19488 13.2386 4.9563 16 4.9563C18.7614 4.9563 21 7.19488 21 9.9563C21 12.7177 18.7614 14.9563 16 14.9563C13.2386 14.9563 11 12.7177 11 9.9563Z"
                      fill="url(#paint0_linear_0_2785)"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21 13.9563C21 11.7472 22.7909 9.9563 25 9.9563C27.2091 9.9563 29 11.7472 29 13.9563C29 16.1654 27.2091 17.9563 25 17.9563C22.7909 17.9563 21 16.1654 21 13.9563Z"
                      fill="url(#paint1_linear_0_2785)"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3 13.9563C3 11.7472 4.79086 9.9563 7 9.9563C9.20914 9.9563 11 11.7472 11 13.9563C11 16.1654 9.20914 17.9563 7 17.9563C4.79086 17.9563 3 16.1654 3 13.9563Z"
                      fill="url(#paint2_linear_0_2785)"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.41315 21.113C10.0104 18.6155 12.8111 16.9563 16 16.9563C19.1893 16.9563 21.9903 18.6159 23.5875 21.1139C24.6917 22.8409 25.1694 24.9232 24.9453 26.9535C24.9103 27.2708 24.7259 27.5523 24.449 27.7112C21.9592 29.1398 19.0734 29.9563 16 29.9563C12.9266 29.9563 10.0408 29.1398 7.55099 27.7112C7.27412 27.5523 7.08973 27.2708 7.05471 26.9535C6.83058 24.9228 7.30855 22.8401 8.41315 21.113Z"
                      fill="url(#paint3_linear_0_2785)"
                    />
                    <path
                      d="M6.77638 19.9612C6.76032 19.9859 6.74436 20.0106 6.7285 20.0354C5.44122 22.0482 4.85211 24.4452 5.03295 26.8083C4.22222 26.6852 3.4356 26.4871 2.68057 26.2212L2.52729 26.1672C2.24768 26.0687 2.0523 25.8148 2.02879 25.5193L2.0159 25.3573C2.00536 25.2248 2 25.0911 2 24.9563C2 22.2698 4.11873 20.0782 6.77638 19.9612Z"
                      fill="url(#paint4_linear_0_2785)"
                    />
                    <path
                      d="M26.9675 26.8082C27.1483 24.4456 26.5595 22.0491 25.2727 20.0365C25.2566 20.0114 25.2404 19.9863 25.2241 19.9612C27.8815 20.0785 30 22.27 30 24.9563C30 25.0911 29.9946 25.2248 29.9841 25.3573L29.9712 25.5193C29.9477 25.8148 29.7523 26.0687 29.4727 26.1672L29.3194 26.2212C28.5645 26.487 27.7781 26.6851 26.9675 26.8082Z"
                      fill="url(#paint5_linear_0_2785)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_0_2785"
                        x1="16"
                        y1="4.9563"
                        x2="16"
                        y2="29.9563"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF7DD0" />
                        <stop offset="1" stop-color="#F7009E" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_0_2785"
                        x1="16"
                        y1="4.9563"
                        x2="16"
                        y2="29.9563"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF7DD0" />
                        <stop offset="1" stop-color="#F7009E" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_0_2785"
                        x1="16"
                        y1="4.9563"
                        x2="16"
                        y2="29.9563"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF7DD0" />
                        <stop offset="1" stop-color="#F7009E" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_0_2785"
                        x1="16"
                        y1="4.9563"
                        x2="16"
                        y2="29.9563"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF7DD0" />
                        <stop offset="1" stop-color="#F7009E" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_0_2785"
                        x1="16"
                        y1="4.9563"
                        x2="16"
                        y2="29.9563"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF7DD0" />
                        <stop offset="1" stop-color="#F7009E" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_0_2785"
                        x1="16"
                        y1="4.9563"
                        x2="16"
                        y2="29.9563"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningSummaryChart;