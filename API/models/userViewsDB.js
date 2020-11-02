const db = require("../config/connection")

module.exports = {
  findAll() {
    return db.many("SELECT * FROM user_views")
  },
  findById(id) {
    return db.one("SELECT * FROM user_views WHERE id = $1", id)
  },
  findByUserIdAndPostId(data) {
    return db.one(
      "SELECT * FROM user_views WHERE user_id = $/user_id/ AND post_id = $/post_id/",
      data
    )
  },
  findAmountByPostId(id) {
    return db.one("SELECT COUNT(*) FROM post_views WHERE post_id = $1", id)
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
