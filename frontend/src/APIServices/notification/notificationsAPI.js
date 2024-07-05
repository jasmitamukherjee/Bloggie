import axios from "axios";
//create that must return a promise
const BASE_URL = "http://localhost:5000/api/v1/notifications";

//!fetch all notifications
export const fetchNotificationsAPI = async () => {
  const response = await axios.get(`${BASE_URL}`,{
    withCredentials:true
  });
  return response.data;
};

//! Read notification
export const readNotificationAPI = async (notificationId) => {
  const posts = await axios.put(`${BASE_URL}/${notificationId}`, {
    withCredentials:true
  });
  return posts.data;
};
