import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StudentFormerFormationGraph = ({studentCount,countFormer,count}) => {
  const data = [
    {
      name: 'Student',
      Student: studentCount,
    },
    {
      name: 'Teacher',
      Teacher: countFormer,
    },
    {
      name: 'Formation',
      Formation: count,
    },
  
  ];

  return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Student" stackId="a" fill="#00C49F" />
          <Bar dataKey="Teacher" stackId="a" fill="#0088FE" />
          <Bar dataKey="Formation" stackId="a" fill="#FFBB28" />
        </BarChart>
      </ResponsiveContainer>
  )
}

export default StudentFormerFormationGraph