const {
  getLatestPosts,
  getPaginatedPosts,
  writePost,
  getHashtagPosts,
  getUserPosts,
  userLikesPost,
  removeLike,
  getUserFeed,
  getHashtagViews,
} = require("./postscontroler");
//const { validateToken } = require("../../auth/tokenValidation");
const Multer = require("multer");

const router = require("express").Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});
 
router.get("/latestposts", getLatestPosts);
router.get("/paginatedposts", getPaginatedPosts);
router.post("/writepost", multer.array('images'), writePost);
router.get("/hashtag/:tagname", getHashtagPosts);
router.get("/userfeed/:userid", getUserPosts);
router.post("/like", userLikesPost);
router.delete("/like", removeLike);
router.get("/feed", getUserFeed);
router.get("/hashtag/:tagname/viewcount", getHashtagViews)
module.exports = router;
