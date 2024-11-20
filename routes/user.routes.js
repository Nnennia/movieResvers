const express = require("express");
const cinema = require("../handler/user.handler");
const userRouter = express.Router();

userRouter.route("/cinema").post(cinema);

module.exports = userRouter;
