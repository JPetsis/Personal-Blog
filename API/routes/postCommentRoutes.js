const express = require("express")
const postCommentsController = require("../controllers/postCommentsController")
const postCommentsRouter = express.Router()

postCommentsRouter
  .route("/")
  .get(postCommentsController.index)
  .post(postCommentsController.create)
  .put(postCommentsController.update)

postCommentsRouter
  .route("/comment/:id")
  .get(postCommentsController.getOne)
  .delete(postCommentsController.delete)

postCommentsRouter.route("/user/:id_users").get(postCommentsController.getUserById)

module.exports = postCommentsRouter
