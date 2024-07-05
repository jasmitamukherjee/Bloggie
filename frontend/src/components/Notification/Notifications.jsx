import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchNotificationsAPI, readNotificationAPI } from "../../APIServices/notification/notificationsAPI";

const Notifications = () => {
  const { data, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotificationsAPI,
  });

  const [unreadNotifications, setUnreadNotifications] = useState([]);

  useEffect(() => {
    if (data) {
      const unread = data.filter((notification) => notification?.isRead === false);
      setUnreadNotifications(unread);
    }
  }, [data]);

  // Mutation for reading notification
  const mutation = useMutation({
    mutationKey: ["read-notification"],
    mutationFn: readNotificationAPI,
  });

  // Read notification handler
  const readNotificationHandler = async (id) => {
    try {
      await mutation.mutateAsync(id);
      const updatedNotifications = unreadNotifications.filter((notification) => notification._id !== id);
      setUnreadNotifications(updatedNotifications);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100">
      <div className="max-w-md w-full mt-5 bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-800 p-4 text-white text-lg font-semibold rounded-t-lg">
          Notifications
        </div>
        <div className="max-h-96 mt-3 overflow-auto">
          {unreadNotifications.length === 0 ? (
            <p className="text-center text-gray-600 py-4">No new notifications</p>
          ) : (
            unreadNotifications.map((notification) => (
              <div key={notification._id} onClick={() => readNotificationHandler(notification._id)}>
                <div className="border-b cursor-pointer border-gray-200 px-4 py-3 hover:bg-gray-50 transition duration-300 ease-in-out">
                  <p className="text-sm text-gray-800 font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
