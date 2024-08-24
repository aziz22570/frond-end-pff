import { useState, useEffect } from "react";
import axiosInstance from "../features/auth/axiosInstance";

export const useFetchStudent = (page, limit) => {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/student?page=${page}&limit=${limit}`
        );
        setData(response.data.data);
        setCount(response.data.count);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [page, limit]);

  return {
    student: data,
    studentCount: count,
    loadingStudent: loading,
    errorStudent: error,
  };
};


export const lastMonthStat = (array) => {

    const now = new Date();
    const months = [];
    for (let i = 4; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        year: month.getFullYear(),
        month: month.getMonth() + 1, // JavaScript months are 0-indexed
        count: 0,
      });
    }


    // Count users for each month
    array?.forEach((user) => {
      const userDate = new Date(user.createdAt); // Adjust based on your data structure
      const userYear = userDate.getFullYear();
      const userMonth = userDate.getMonth() + 1;

      // Find the corresponding month and increment the count
      const monthData = months.find(
        (m) => m.year === userYear && m.month === userMonth
      );
      if (monthData) {
        monthData.count++;
      }

    });


  return months;
};

