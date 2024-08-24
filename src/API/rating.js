import { useEffect, useState } from "react";
import axiosInstance from "../features/auth/axiosInstance";


    export const rateFormer = async (data) => {
      try {
        const response = await axiosInstance.post(
          `${process.env.REACT_APP_API_URL}/api/v1/user/rate`,data
        );
console.log(response.data);

        return({data:response.data});
      } catch (err) {
        console.log(err);
      } 
    };
    export const getRating = async (data) => {
      console.log("the data is",data);

      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/rate/${data.teacher}/${data.rater}`,data.rater
        );
        return {data:response.data};
      } catch (err) {
        console.log(err);
      } 
      
    };

  