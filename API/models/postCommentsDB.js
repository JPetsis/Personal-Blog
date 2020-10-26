const db = require("../config/connection")

module.exports = {
  findAll() {
    return db.many("SELECT * FROM post_comments")
  },
  findById(id) {
    return db.one("SELECT * FROM post_comments WHERE id = $1", id)
  },
  findByComment(comment) {
    return db.one("SELECT * FROM users WHERE comment = $1", comment)
  },
  create(comment) {
    return db.one(
      `INSERT INTO post_comments (comment) 
      VALUES ($/comment/)
      RETURNING *`,
      comment
    )
  },
  update(comment) {
    return db.one(
      `UPDATE post_comments
      SET
      comment = $/comment/
      WHERE id = $/id/
      RETURNING *`,
      comment
    )
  },
  delete(id) {
    return db.none("DELETE FROM post_comments WHERE id = $1", id)
  },
}
