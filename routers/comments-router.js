const commentsRouter = require("express").Router();
const {getComment} = require("../controllers/comments-controller")

commentsRouter
.route("/:comment_id")
.delete(getComment)

module.exports = commentsRouter;