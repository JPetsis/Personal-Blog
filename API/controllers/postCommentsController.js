const postcommentsDB = require("../models/postCommentsDB")
const pgp = require("pg-promise")()
const QRE = pgp.errors.QueryResultError
const qrec = pgp.errors.queryResultErrorCode

module.exports = {
  index(req, res, next) {
    postcommentsDB
      .findAll()
      .then((postComments) => res.json({ message: "Getting Comments", data: postComments }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: [] })
        else next(err)
      })
  },
  getOne(req, res, next) {
    postcommentsDB
      .findById(req.params.id)
      .then((postComment) => res.json({ message: "Getting Comment", data: postComment }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: {} })
        else next(err)
      })
  },
  getUserById(req, res, next) {
    postcommentsDB
      .findUserById(req.params.id_users)
      .then((postComment) => res.json({ message: "Getting comments by user", data: postComment }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: [] })
        else next(err)
      })
  },
  create(req, res, next) {
    postcommentsDB
      .save(req.body)
      .then((postComment) => res.json({ message: "Adding Comment", data: postComment }))
      .catch((err) => next(err))
  },
  update(req, res, next) {
    postcommentsDB
      .update(req.body)
      .then((postComment) => res.json({ message: "Updating Comment", data: postComment }))
      .catch((err) => next(err))
  },
  delete(req, res, next) {
    postcommentsDB
      .delete(req.params.id)
      .then(() => res.json({ message: "Comment Deleted" }))
      .catch((err) => next(err))
  },
}
