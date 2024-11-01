import { useState, useEffect } from "react";
import axiosInstance from "../features/auth/axiosInstance";

export const useFetchEmail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/email`
        );
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormation();
  }, []);

  return { data, loading, error };
};

export const apiAdminSendEmail = async (
  username,
  email,
  title,
  content,
) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_API_URL}/api/v1/email/`,
      { username, email, title, content }
    );
    return { data: response.data };
  } catch (err) {
    console.log(err);
  }
};

export const apiuserSendEmail = async ({
  username,
  email,
  title,
  content,
  destinationId,
}) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_API_URL}/api/v1/email/${destinationId}`,
      { username, email, title, content }
    );
    return { data: response.data };
  } catch (err) {
    console.log(err);
  }
};
