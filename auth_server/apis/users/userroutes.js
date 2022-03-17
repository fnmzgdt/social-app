const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  login,
  followUser,
  getUnfollowedUsers
} = require("./usercontroler");
const router = require("express").Router();
const { validateToken } = require("../../auth/tokenValidation");

router.post("/signup", createUser);
router.get("/users", validateToken, getUsers);
router.get("/user/:id", validateToken, getUserById);
router.patch("/user", validateToken, updateUser);
router.get("/suggested", getUnfollowedUsers)
router.post("/login", login);
router.post("/follow", followUser)

module.exports = router;
