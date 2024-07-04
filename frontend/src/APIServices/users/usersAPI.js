
import { BASE_URL } from "../../utils/baseEndpoint";
import axios from "axios";

export const registerAPI = async (userData) => {
    const response = await axios.post(
      `${BASE_URL}/users/register`,
      {
        username: userData?.username,
        password: userData?.password,
        email: userData?.email,
      },
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };

  //login 
  
export const loginAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/login`,
    {
      username: userData?.username,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};