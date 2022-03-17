const pool = require("../../config/database");

module.exports = {
  writePost: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO posts(type_id,user_id, body) VALUES(1, ?, ?);`,
        [data.user_id, data.content],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results.insertId);
        }
      );
    });
  },
  writeImageUrls: (urlList, postId) => {
    return new Promise((resolve, reject) => {
      const postIdImage = urlList.map((url) => [postId, url]);
      console.log(postIdImage)
      pool.query(
        `INSERT INTO images(post_id, url) VALUES ?;`,
        [postIdImage],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
  writeTag: (data) => {
    return new Promise((resolve, reject) => {
      console.log(data.tags);
      pool.query(
        `INSERT IGNORE INTO tags(content) VALUES ?;`,
        [data.tags],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
  writePostTags: (data, lastId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO posts_tags(post_id, tag_id) SELECT ?, id FROM tags WHERE content IN ?;`,
        [lastId, data.tagArray],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
  //gets the people who are following you
  getCurrentUsersFollowers: (myId, callBack) => {
    pool.query(
      `SELECT GROUP_CONCAT(follower_id) as followers from followers where user_id = ?;`,
      [myId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results);
        return callBack(null, results[0].followers);
      }
    );
  },
  //gets the people you are following
  getFollowedUsers: (myId, callBack) => {
    pool.query(
      `SELECT GROUP_CONCAT(user_id) as followed FROM followers where follower_id = ?;`,
      [myId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getRecentPostsFromFollowedUsers: (userIdsArr, callBack) => {
    pool.query(
      `SELECT posts.id, body, user_id, (SELECT COUNT(post_id) FROM likes WHERE likes.post_id = posts.id) as likeCount, (SELECT CASE WHEN EXISTS ( SELECT * FROM likes WHERE posts.id = likes.post_id AND likes.user_id = 14 ) THEN TRUE ELSE FALSE END) AS liked, (SELECT GROUP_CONCAT(url) FROM images WHERE images.post_id = posts.id) AS imageUrl, users.username FROM posts JOIN users ON posts.user_id = users.id where posts.type_id = 1 AND user_id IN (?) ORDER BY id DESC LIMIT 10;`,
      [userIdsArr],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getLatestPosts: (currentUserId, callBack) => {
    pool.query(
      `SELECT posts.id, body, imageUrl, user_id, users.username FROM posts JOIN users ON posts.user_id = users.id where posts.type_id = 1 ORDER BY id DESC LIMIT 10;`,
      [currentUserId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPaginatedPosts: (currentUserId, lastId, callBack) => {
    pool.query(
      `SELECT posts.id, posts.user_id, content, date, imageUrl, users.username, (SELECT COUNT(likes.post_id) FROM likes WHERE likes.post_id = posts.id) as like_count, (CASE WHEN EXISTS ( SELECT * FROM likes WHERE posts.id = likes.post_id AND likes.user_id = ? ) THEN TRUE ELSE FALSE END) as liked_by_current_user FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id<? ORDER BY posts.id DESC LIMIT 5;`,
      [currentUserId, lastId],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callBack(error);
        }
        console.log(lastId);
        console.log(results);
        return callBack(null, results);
      }
    );
  },
  getHashtagPosts: (tag, callBack) => {
    pool.query(
      `SELECT posts.id, posts.body as body, posts.user_id, (SELECT GROUP_CONCAT(url) FROM images WHERE images.post_id = posts.id) AS imageUrl, users.username FROM posts JOIN users ON posts.user_id = users.id JOIN posts_tags ON posts.id = post_id JOIN tags ON tags.id = tag_id WHERE tags.content = ? ORDER BY posts.id DESC LIMIT 5;`,
      [tag],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserPosts: (userId, callBack) => {
    pool.query(
      `SELECT posts.id, body, user_id, (SELECT GROUP_CONCAT(url) FROM images WHERE images.post_id = posts.id) AS imageUrl, users.username FROM posts JOIN users ON posts.user_id = users.id where posts.type_id = 1 AND users.id = ? ORDER BY id DESC LIMIT 10;`,
      [userId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  userLikesPost: (userId, postId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO likes(user_id, post_id) VALUES(?, ?);`,
        [userId, postId],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
  removeLike: (userId, postId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM likes WHERE likes.user_id = ? AND likes.post_id = ?;`,
        [userId, postId],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
  getCurrentUserFeed: (postIdsArr, callBack) => {
    //fetch posts from an array of posti ids
    pool.query(
      `SELECT posts.id, body, user_id, (SELECT COUNT(post_id) FROM likes WHERE likes.post_id = posts.id) as likeCount, (SELECT CASE WHEN EXISTS ( SELECT * FROM likes WHERE posts.id = likes.post_id AND likes.user_id = 14 ) THEN TRUE ELSE FALSE END) AS liked, (SELECT GROUP_CONCAT(url) FROM images WHERE images.post_id = posts.id) AS imageUrl, users.username FROM posts JOIN users ON posts.user_id = users.id where posts.type_id = 1 AND posts.id IN (?) ORDER BY posts.id DESC LIMIT 10;`,
      [postIdsArr],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
