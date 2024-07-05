
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

//auth
export const checkAuthStatusAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/users/checkAuthenticated`,
   
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//logout
export const logoutAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/users/logout`,
    {
      
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

//user profile
export const userProfileAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/users/profile`,
   
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// ! follow user
export const followUserAPI = async (userId) => {
  const response = await axios.put(
    `${BASE_URL}/users/follow/${userId}`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};
// ! unfollow user
export const unfollowUserAPI = async (userId) => {
  const response = await axios.put(
    `${BASE_URL}/users/unfollow/${userId}`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};