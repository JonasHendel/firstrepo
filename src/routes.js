const express = require("express");
const multer = require("multer");

const routes = express.Router();
const UserController = require("./controllers/UserController");
const EventContoller = require("./controllers/EventController");
const DashboardController = require("./controllers/DashboardController");
const LoginController = require("./controllers/LoginController");

const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);

routes.get("/status", (req, res) => {
	res.send({ status: 200 });
});

// TODO SubscribeController
// TODO ApprovalController
// TODO RejectionConttoller

routes.post("/login", LoginController.store);

// Dashboard
routes.get("/events/:sport", DashboardController.getAllEvents);
routes.get("/events", DashboardController.getAllEvents);
routes.get("/event/:eventId", DashboardController.getEventById);

// Event
routes.post("/event", upload.single("thumbnail"), EventContoller.createEvent);
routes.delete("/event/:eventId", EventContoller.deleteEvent);

// User
routes.post("/user/register", UserController.createUser);
routes.get("/user/:userId", UserController.getUserById);

module.exports = routes;
