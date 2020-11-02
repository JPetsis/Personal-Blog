const db = require("../config/connection")

module.exports = {
  findAll() {
    return db.many("SELECT * FROM user_views")
  },
  findById(id) {
    return db.one("SELECT * FROM user_views WHERE id = $1", id)
  },
  findByPostId(id) {
    return db.many("SELECT * FROM user_views WHERE id_posts = $1", id)
  },
  save(userView) {
    return db.one(
      `INSERT INTO user_views (id) 
      VALUES ($/id/)
      RETURNING *`,
      userView
    )
  },
}
