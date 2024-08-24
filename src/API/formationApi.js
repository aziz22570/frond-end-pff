import { useEffect, useState } from "react";
import axiosInstance from "../features/auth/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { joinFormation } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { closeForm } from "../store/popupSlice";

export const useListFormation = (currentPage) => {
  console.log(
    "useListFormation",
    `${process.env.REACT_APP_API_URL}/api/v1/formation?page=${currentPage}&active=true`
  );
  const [formations, setFormations] = useState([]);
  const [totalpage, settoTalpage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/formation?page=${currentPage}&active=true`,
          {
            headers: {
              "ngrok-skip-browser-warning": "1", // Add this custom header
            },
          }
        );
        setFormations(response.data.data);
        console.log("formation eeeeeeeeeeeeee", response.data);

        settoTalpage(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching formation list:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  // Empty dependency array to run the effect only once
  if (formations) {
    return { formations, totalpage };
  }
};
export const useCreateFormation = (formation) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleButton = (id) => {
    console.log(" navigate", id);

    navigate(`/formation/edit/${id}`);
  };
  const [newFormation, setNewFormation] = useState("");

  const fetchData = async () => {
    try {
      console.log("formation from api", formation);

      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/formation`,
        formation
      );
      setNewFormation(response.data);
      console.log("before navigate", response.data);
      dispatch(joinFormation(response.data));
      dispatch(closeForm());
      HandleButton(response.data);
      console.log("after navigate");
    } catch (error) {
      console.error("Error creating formation:", error.response.data);
    }
  };

  // Empty dependency array to run the effect only once

  return { newFormation, fetchData };
};
export const useLastFormation = () => {
  const [lastFormations, setLastFormations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/formation/last?page=${1}&active=true`
        );
        setLastFormations(response.data.data);
      } catch (error) {
        console.error("Error fetching formation list:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return { lastFormations };
};
export const usePersoFormation = (currentPage) => {
  const [formationsPerso, setFormationsPerso] = useState([]);
  const [totalpagePerso, settoTalpagePerso] = useState(1);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/formation/perso?page=${currentPage}&active=true`
        );
        setFormationsPerso(response.data.data);
        settoTalpagePerso(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching formation list:", error);
      }
    };

    isLoggedIn && fetchData();
  }, [currentPage, isLoggedIn]); // Empty dependency array to run the effect only once

  return { formationsPerso, totalpagePerso };
};
export const useSearchFormation = (currentPage, search) => {
  const [formations, setFormations] = useState([]);
  const [totalpage, settoTalpage] = useState(1);
  const [results, setResults] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/formation/search?page=${currentPage}&name=${search}&active=true`
        );
        console.log(response.data.data);
        setFormations(response.data.data);
        settoTalpage(response.data.totalPages);
        setResults(response.data.results);
        console.log("totalpage", totalpage);
      } catch (error) {
        console.error("Error fetching formation list:", error);
      }
    };

    fetchData();
  }, [currentPage, search]); // Empty dependency array to run the effect only once
  console.log(results);
  return { formations, totalpage, results };
};
export const useFetchFormation = (id) => {
  const [formation, setFormation] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("changed", formation.programmes);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/formation/${id}`
        );
        setFormation(response.data.data);
        console.log("formation from fetch", response.data.data);
      } catch (error) {
        setError("Error fetching formation: " + error.message);
        console.error("Error fetching formation:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);
  return { formation, loading, error };
};
export const useJoinFormation = (id) => {
  const dispatch = useDispatch();

  const fetchData = async (id) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/formation/join`,
        { id: id }
      );
      Swal.fire({
        title: response.data,
        icon: "success",
      });
      console.log(id);
      dispatch(joinFormation(id));
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  };
  return { fetchData };
};
export const useMyFormation = (user) => {
  const [formations, setFormations] = useState([]);
  console.log("use my formations");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          user
            ? `${process.env.REACT_APP_API_URL}/api/v1/formation/myformatios/${user}`
            : `${process.env.REACT_APP_API_URL}/api/v1/formation/myformatios`
        );
        console.log(response.data);
        setFormations(response.data.data);
      } catch (error) {
        console.error("Error fetching formation list:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return { formations };
};

export const useUpdateFormation = (id) => {
  const [newFormation, setNewFormation] = useState("");

  const fetchData = async (data, type) => {
    try {
      console.log(data, "update");

      const response = await axiosInstance.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/formation/${id}`,
        data,
        type && {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for FormData
          },
        }
      );
      setNewFormation(response.data);
    } catch (error) {
      console.error("Error updating formation:", error.response);
    }
  };

  // Empty dependency array to run the effect only once

  return { newFormation, fetchData };
};
export const usePayFormation = (receiverWalletId,amount,trainingId,trainingName,userId) => {
  const dispatch = useDispatch();

  const fetchPayData = async ({trainingId,userId,trainingName}) => {
    console.log('the user id is', userId);
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/konnect`,
        {
          "receiverWalletId": "66bf833f2090572126fabbb2",
          "amount": 10000,
            "trainingId":trainingId,
          "trainingName":trainingName,
          "userId":userId
        }
        // esponse.data.payUrl
      );
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to Payment Page"
      }).then((result) => {
        if (result.isConfirmed) {
  window.location.href = response.data.payUrl;
        }
      });
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  };
  return { fetchPayData };
};
