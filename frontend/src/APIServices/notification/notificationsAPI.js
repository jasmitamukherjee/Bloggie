import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/notifications";

// Fetch all notifications
export const fetchNotificationsAPI = async () => {
  const response = await axios.get(`${BASE_URL}`, {
    withCredentials: true,
  });
  return response.data;
};

// Read notification
export const readNotificationAPI = async (notificationId) => {
  const posts = await axios.put(
    `${BASE_URL}/${notificationId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return posts.data;
};