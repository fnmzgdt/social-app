const pool = require("../../config/database");

module.exports = {
  registerUser: (data, callBack) => {
    pool.query(
      `INSERT INTO users(username, email, password) VALUES(?, ?, ?)`,
      [data.username, data.email, data.password],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `SELECT id, firstName, lastName, gender, email FROM registration`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserById: (id, callBack) => {
    pool.query(
      `SELECT id, firstName, lastName, gender, email FROM registration WHERE id=?;`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `UPDATE registration SET firstName=?, lastName=?, gender=?, email=?, password=? WHERE id=?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM users WHERE email=?;`,
      [email],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUnfollowedUsers: (myId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, username, email FROM users WHERE users.id NOT IN (SELECT followers.user_id FROM followers WHERE follower_id = ?) AND users.id != ? LIMIT 4;
        `,
        [myId, myId],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
  followUser: (myId, userId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO followers(follower_id, user_id) VALUES(?, ?);`,
        [myId, userId],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    }); 
  }
};
