const db = require("../config/connection")

module.exports = {
  findAll() {
    return db.many("SELECT * FROM post_views")
  },
  findById(id) {
    return db.one("SELECT * FROM post_views WHERE id = $1", id)
  },
  findByPostId(views) {
    return db.many("SELECT * FROM post_views WHERE views = $1", views)
  },
  save(view) {
    return db.one(
      `INSERT INTO post_views (views) 
      VALUES ($/views/)
      RETURNING *`,
      view
    )
  },
  update(view) {
    return db.one(
      `UPDATE post_views
      SET
      views = $/views/,
      WHERE id = $/id/
      RETURNING *`,
      view
    )
  },
  delete(id) {
    return db.none("DELETE FROM post_views WHERE id = $1", id)
  },
}
