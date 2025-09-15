// import StatCard from "@/components/MetricCard";
// import RegistrationTable from "@/components/RegistrationTable";
// import ChartCard from "@/components/EarningSummaryChart";
// import { Area, ResponsiveContainer } from "recharts";
// import AlcoholConsumptionTrendChart from "@/components/AlcoholConsumptionTrendChart";
// import EarningSummaryChart from "@/components/EarningSummaryChart";
// import MetricCard from "@/components/MetricCard";

import EarningSummaryChart from "@/components/EarningSummaryChart";
import MetricCard from "@/components/MetricsDashboard";
import RegistrationTable from "@/components/RegistrationTable";
import DarkMetricCards from "@/components/MetricsDashboard";
import MetricsDashboard from "@/components/MetricsDashboard";

const Admin = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <div className=" w-full min-h-screen">
        <div className="">
          {/* Total User Card */}
          {/* <MetricCard
            title="Total User"
            value={2500}
            percentageChange={4}
            percentageDirection="up"
            timePeriodData={months}
          />

        
          <MetricCard
            title="Total Rider"
            value={200}
            percentageChange={4}
            percentageDirection="up" 
            timePeriodData={months}
          />
          <MetricCard
            title="Total Restaurant"
            value={200}
            percentageChange={4}
            percentageDirection="up" 
            timePeriodData={months}
          /> */}
          <MetricsDashboard />
        </div>

        <div className=" p-4">
          {/* Earning Summary Chart */}
          <div className="w-full">
            {/* Ensure minimum height for chart visibility */}
            <EarningSummaryChart />
          </div>

          {/* Alcohol Consumption Trend Line Chart */}
          {/* <div className="min-h-[340px]"> */}

          {/* Ensure minimum height for chart visibility */}
          {/* <AlcoholConsumptionTrendChart /> */}
          {/* </div> */}
        </div>

        <div className="p-4">
          <RegistrationTable />
        </div>
      </div>
    </>
  );
};
export default Admin;
