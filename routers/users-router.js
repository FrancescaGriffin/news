const usersRouter = require("express").Router();
const { getAllUsers, getUser } = require("../controllers/users-controller")

usersRouter
.route("/:username")
.get(getUser)

usersRouter
.route("/")
.get(getAllUsers)


module.exports = usersRouter;