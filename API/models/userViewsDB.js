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
      "SELECT * FROM user_views WHERE id_users = $/id_users/ AND id_posts = $/id_posts/",
      data
    )
  },
  findAmountByPostId(id) {
    return db.one("SELECT COUNT(*) FROM user_views WHERE id_posts = $1", id)
  },
  save(userView) {
    return db.one(
      `INSERT INTO user_views (id, id_posts, id_users) 
      VALUES ($/id/, $/id_posts/, $/id_users/)
      RETURNING *`,
      userView
    )
  },
}
