import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";

const TimeGraphe = ({ lastFiveMonthArray }) => {
  lastFiveMonthArray.forEach((element) => {
    const monthNumber = element.month;
    const date = new Date(2000, monthNumber - 1);
    const monthName = date.toLocaleString("en-US", { month: "long" });

    element.month = monthName;
  });
  console.log(lastFiveMonthArray);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={600}
        height={300}
        data={lastFiveMonthArray}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Teacher"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Line
          type="monotone"
          dataKey="Student"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Line
          type="monotone"
          dataKey="Formation"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeGraphe;
