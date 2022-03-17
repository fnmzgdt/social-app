require("dotenv").config();
const redis = require("redis");
const {
  getLatestPosts,
  getPaginatedPosts,
  writePost,
  writeTag,
  writePostTags,
  getHashtagPosts,
  getUserPosts,
  userLikesPost,
  removeLike,
  getCurrentUserFeed,
  getCurrentUsersFollowers,
  getFollowedUsers,
  getRecentPostsFromFollowedUsers,
  writeImageUrls,
} = require("./postsservice");
const { Storage } = require("@google-cloud/storage");
const uuid = require("uuid");
const uuidv1 = uuid.v1;

const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY,
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

module.exports = {
  getLatestPosts: (req, res) => {
    const currentUserId = req.query.currentUserId;

    getLatestPosts(currentUserId, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: 0, message: "db connection error" });
      }
      if (!results) {
        return res.json({ success: 0, message: "no posts found" });
      }
      return res.json(results);
    });
  },
  getPaginatedPosts: (req, res) => {
    const lastId = req.query.lastId;
    const currentUserId = req.query.currentUserId;
    getPaginatedPosts(currentUserId, lastId, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: 0, message: "db connection error" });
      }
      if (!results) {
        return res.json({ success: 0, message: "no more posts." });
      }
      return res.json(results);
    });
  },
  writePost: async (req, res) => {
    //fetch all ids of the people following you

    const postData = {};

    postData.user_id = req.body.id;
    postData.content = req.body.post;
    // PUSH METHOD (FOR USERS WITH SMALL FOLLOWINGS)
    // add a check whether a user has a huge following: EXPLAIN SELECT COUNT(*) FROM followers ... + if > 10k
    /* getCurrentUsersFollowers(postData.user_id, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: 0, message: "db connection error" });
      }
      if (!results) {
        return res.json({ success: 0, message: "no followers found" });
      }
      return res.status(200).json(results.split(","));
    }); */

    // PUSH THE POST IDS IN THE FOLLOWERS' FEEDS

    let tags = [];
    postData.content
      .split(" ")
      .filter((str) => str[0] === "#")
      .forEach((str) => tags.push(str.slice(1).split()));
    let tagArray = [tags];

    postData.tags = tags;
    postData.tagArray = tagArray;
    const images = req.files;
    if (images.length > 0) {
      const uploadImage = (image) => {
        return new Promise((resolve, reject) => {
          const newFileName = uuidv1() + "-" + image.originalname;

          const blob = bucket.file(newFileName);

          const blobStream = blob.createWriteStream({
            resumable: false,
          });

          blobStream.on("error", (err) => {
            res.status(500).send({ message: err.message });
            reject(err);
          });

          blobStream.on("finish", async () => {
            const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`;

            try {
              await bucket.file(newFileName).makePublic();
              resolve(publicUrl);
            } catch (err) {
              console.log("failed to make it public");
              reject(err);
            }
          });

          blobStream.end(image.buffer);
        });
      };

      const urlList = [];

      for (let i = 0; i < images.length; i++) {
        const publicUrl = await uploadImage(images[i]);
        urlList.push(publicUrl);
      }

      let postMethods = [writePost(postData), writeTag(postData)];

      Promise.all(postMethods)
        .then((results) => {
          Promise.all([
            writeImageUrls(urlList, results[0]),
            writePostTags(postData, results[0])
          ]);
        })
        .catch((err) => console.log(err));
    } else {
      let postMethods = [writePost(postData), writeTag(postData)];
      Promise.all(postMethods)
        .then((results) => writePostTags(postData, results[0]))
        .then((results) => console.log(results))
        .catch((err) => console.log(err));
    }
  },
  getHashtagPosts: (req, res) => {
    const tag = req.params.tagname;
    const myId = req.query.myId;
    //redis add 1 unique visit
    client.PFADD(`hashtag:${tag}`, myId);
    getHashtagPosts(tag, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "db connection error" });
      }
      if (!results) {
        return res.json({ message: "no posts with this tag exist" });
      }
      return res.status(200).json(results);
    });
  },
  getHashtagViews: (req, res) => {
    const tag = req.params.tagname;
    const myId = req.query.myId;

    client.PFCOUNT(`hashtag:${tag}`, (err, data) => {
      if (err) {
        console.log(err);
        return res
          .status(199)
          .json({ message: "connection with redis failed" });
      }
      return res.json(data);
    });
  },
  getUserPosts: (req, res) => {
    const userId = req.params.userid;
    getUserPosts(userId, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: 0, message: "db connection error" });
      }
      if (!results) {
        return res.json({ message: "user doesn't have any posts" });
      }
      return res.json(results);
    });
  },
  userLikesPost: (req, res) => {
    const userId = req.query.userId;
    const postId = req.query.postId;

    userLikesPost(userId, postId)
      .then((results) => {
        return res.status(200).json({ postId });
      })
      .catch((err) => console.log(err));
  },
  removeLike: (req, res) => {
    const userId = req.query.userId;
    const postId = req.query.postId;

    removeLike(userId, postId)
      .then((results) => {
        return res.status(200).json({ postId });
      })
      .catch((err) => console.log(err));
  },
  getUserFeed: (req, res) => {
    //fetch the feed of the user with currentId
    const myId = req.query.myId;

    const getUserFeed = (myId) => {
      client.GET(`feedtimestamp:${myId}`, (err, data) => {
        if (err) {
          reject(err);
        }
        if (data != null) {
          if (Math.floor(Date.now() / 1000) - data > 40) {
            client.SET(`feedtimestamp:${myId}`, Math.floor(Date.now() / 1000));

            getFollowedUsers(myId, (err, results) => {
              if (err) {
                console.log(err);
                return res
                  .status(500)
                  .json({ success: 0, message: "db connection error" });
              }
              if (!results[0].followed) {
                console.log({
                  success: 0,
                  message: "the user doesn't follow anyone",
                });
              } else {
                const userIdsArr = results[0].followed.split(",");
                getRecentPostsFromFollowedUsers(userIdsArr, (err, results) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).json({
                      success: 0,
                      message: "db connection error",
                    });
                  }
                  if (!results) {
                    console.log({
                      success: 0,
                      message: "no posts from followed users",
                    });
                  } else {
                    let arrOfPostIds = [];
                    results.forEach((post) => arrOfPostIds.push(post.id));
                    // console.log(arrOfPostIds);
                    arrOfPostIds.length > 0
                      ? client.SADD(`feed:${myId}`, arrOfPostIds)
                      : console.log("empty");
                    return res.status(200).json(results);
                  }
                });
              }
            });
          } else {
            client.SMEMBERS(`feed:${myId}`, (err, data) => {
              if (err) {
                reject(err);
              }
              if (data != null && data.length > 0) {
                //console.log(data);
                getCurrentUserFeed(data, (err, results) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).json({
                      success: 0,
                      message: "db connection error",
                    });
                  }
                  if (!results) {
                    console.log({
                      success: 0,
                      message: "no posts in feed",
                    });
                  } else {
                    return res.status(200).json(results);
                  }
                });
              } else {
                console.log("oof");
              }
            });
          }
        } else {
          client.SET(`feedtimestamp:${myId}`, Math.floor(Date.now() / 10000));
        }
      });
    };

    getUserFeed(myId);
    /*if (data.length > 0) {
        getCurrentUserFeed(data, (err, results) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ success: 0, message: "db connection error" });
          }
          return res.json(results);
        });
      } else {
        return res.json({ message: "no posts found" });
      }
       */
  },
};
