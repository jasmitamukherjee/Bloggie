import axios from "axios";
//create that must return a promise
const BASE_URL = "https://bloggie-back-1.onrender.com/api/v1/comments";

//!Create comment api
export const createCommentAPI = async (data) => {
  const response = await axios.post(`${BASE_URL}/create`, data, {
    withCredentials: true,
  });
  return response.data;
};