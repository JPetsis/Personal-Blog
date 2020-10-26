const tagsDB = require("../../models/UserModels/tagsDB")

module.exports = {
  index(req, res, next) {
    tagsDB
      .findAll()
      .then((tags) => res.json({ message: "Getting Tags", data: tags }))
      .catch((err) => next(err))
  },
  getOne(req, res, next) {
    tagsDB
      .findById(req.params.id)
      .then((tag) => res.json({ message: "Getting Tag", data: tag }))
      .catch((err) => next(err))
  },
  getByName(req, res, next) {
    tagsDB
      .findByUsername(req.params.name)
      .then((tag) => res.json({ message: "Getting tag by name", data: tag }))
      .catch((err) => next(err))
  },
  create(req, res, next) {
    tagsDB
      .save(req.body)
      .then((tag) => res.json({ message: "Adding Tags", data: tag }))
      .catch((err) => next(err))
  },
  update(req, res, next) {
    tagsDB
      .update(req.body)
      .then((tag) => res.json({ message: "Updating Tags", data: tag }))
      .catch((err) => next(err))
  },
  delete(req, res, next) {
    tagsDB
      .delete(req.params.id)
      .then(() => res.json({ message: "Tag Deleted" }))
      .catch((err) => next(err))
  },
}
