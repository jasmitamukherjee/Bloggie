
const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const notificationController = require("../../controllers/notification/notificationController");

const notificationRouter = express.Router();

//-----lists----

notificationRouter.get("/api/v1/notifications",isAuthenticated, notificationController.fetchNotifications);

//----read notification ----
notificationRouter.put(
  "/api/v1/notifications/:notificationId",
  isAuthenticated,
  notificationController.readNotification
);

module.exports = notificationRouter;