const userViewsDb = require("../models/userViewsDB")
const pgp = require("pg-promise")()
const QRE = pgp.errors.QueryResultError
const qrec = pgp.errors.queryResultErrorCode

module.exports = {
  index(req, res, next) {
    userViewsDb
      .findAll()
      .then((userViews) => res.json({ data: userViews }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: [] })
        else next(err)
      })
  },
  getOne(req, res, next) {
    userViewsDb
      .findById(req.params.id)
      .then((userView) => res.json({ data: userView }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: {} })
        else next(err)
      })
  },
  getByPostId(req, res, next) {
    userViewsDb
      .findByPostId(req.params.id_posts)
      .then((userViews) => res.json({ data: userViews }))
      .catch((err) => {
        if (err instanceof QRE && err.code === qrec.noData) return res.json({ data: {} })
        else next(err)
      })
  },
}
