import { useEffect, useState } from "react";
import axiosInstance from "../features/auth/axiosInstance";

export const createQuiz = async ({formationId, name}) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_API_URL}/api/v1/quiz/${formationId}`,
      { name }
    );
    console.log(response.data);

    return { data: response.data };
  } catch (err) {
    console.log(err);
  }
};
export const teacherGetQuiz = async (formationId, quizId) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_API_URL}/api/v1/quiz/teacher/${formationId}/${quizId}`
    );
    return { data: response.data };
  } catch (err) {
    console.log(err);
  }
};
export const getquiz = async (formationId, quizId) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_API_URL}/api/v1/quiz/${formationId}/${quizId}`
    );
    return { data: response.data };
  } catch (err) {
    console.log(err);
  }
};
export const deletequiz = async (formationId, quizId) => {
  try {
    const response = await axiosInstance.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/quiz/${formationId}/${quizId}`
    );
    return { data: response.data };
  } catch (err) {
    console.log(err);
  }
};


//  question
export const apiCreteQuestion = async ({formationId, quizId,question,responseType,choices}) => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_API_URL}/api/v1/question/${formationId}/${quizId}`,{question,responseType,choices}
    );
    return { data: response.data };
  } catch (err) {
    console.log(err);
  }
};
export const apiUpdateQuestion = async ({formationId, quizId,questionId,question,responseType,choices}) => {
  try {
    const response = await axiosInstance.patch(
      `${process.env.REACT_APP_API_URL}/api/v1/question/${formationId}/${quizId}/${questionId}`,{question,responseType,choices}
    );
    return { data: response.data };
  } catch (err) {
    console.log(err);
  }
};
export const deleteQuestion = async (formationId, quizId,questionId) => {
  try {
    const response = await axiosInstance.patch(
      `${process.env.REACT_APP_API_URL}/api/v1/question/${formationId}/${quizId}/${questionId}`
    );
    return { data: response.data };
  } catch (err) {
    console.log(err);
  }
};
export const apiAnswerQuestion = async ({formationId, quizId,questionId,answers}) => {
  console.log("the api answers",answers);
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_API_URL}/api/v1/question/answer/${formationId}/${quizId}`,answers
    );
    return { data: response.data };
  } catch (err) {
    console.log(err);
  }
};