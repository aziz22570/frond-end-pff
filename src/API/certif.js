import { useState, useEffect } from 'react';
import axiosInstance from '../features/auth/axiosInstance';

export const useFetchFormation = (page, limit) => {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/formation?page=${page}&limit=${limit}`
        );
        setData(response.data.data);
        setCount(response.data.count);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormation();
  }, [page, limit]);

  return { data, count,loading, error };
};



export const useFetchFiveMonthFormation = () => {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/formation/fivemonth`
        );
        setData(response.data.data);
        setCount(response.data.count);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormation();
  }, []);

  return { data, count,loading, error };
};


