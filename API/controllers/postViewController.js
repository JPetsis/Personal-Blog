const postViewsDb = require("../models/postViewsDB")
const userViewDB = require("../models/userViewsDB")
const pgp = require("pg-promise")()
const QRE = pgp.errors.QueryResultError
const qrec = pgp.errors.queryResultErrorCode

function saveNewPostView(req, res, next) {
  postViewsDB
    .save(req.body)
    .then((postView) => saveNewUserView())
    .catch((err) => next(err))
}

function saveNewUserView(req, res, next) {
  userViewDB
    .save(req.body)
    .then((userView) => res.sendStatus(200))
    .catch((err) => next(err))
}

module.exports = {
  index(req, res, next) {
    postViewsDb
      .findAll()
      .then((postViews) => res.json({ data: postViews }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: [] })
        else next(err)
      })
  },
  getOne(req, res, next) {
    postViewsDb
      .findById(req.params.id)
      .then((postView) => res.json({ data: postView }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: {} })
        else next(err)
      })
  },
  getByPostId(req, res, next) {
    postViewsDb
      .findByPostId(req.params.id_posts)
      .then((postViews) => res.json({ data: postViews }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: {} })
        else next(err)
      })
  },
  save(req, res, next) {
    userViewDB
      .findByPostId(req.body.id_posts)
      .then((userViews) => res.sendStatus(200))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return saveNewPostView()
        else next(err)
      })
  },
}
