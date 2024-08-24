import { useState, useEffect } from 'react';
import axiosInstance from '../features/auth/axiosInstance';

const useFetchFormer = (page, limit) => {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormer = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/Teacher?page=${page}&limit=${limit}`
        );
        setData(response.data.data);
        setCount(response.data.count);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormer();
  }, [page, limit]);

  return { Teacher:data, countFormer:count,loadingFormer:loading, errorFormer:error };
};

export default useFetchFormer;

