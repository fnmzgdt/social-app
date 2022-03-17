const {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  getUserByEmail,
  followUser,
  getUnfollowedUsers,
} = require("./userservice");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    registerUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: 0, message: "db connection error" });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: 0, message: "db connection error" });
      }
      if (!results) {
        return res.json({ success: 0, message: "no users found" });
      }
      return res.json({ success: 1, data: results });
    });
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: 0, message: "db connection error" });
      }
      if (!results) {
        return res.json({ success: 0, message: "user not found" });
      }
      return res.json({ success: 1, data: results });
    });
  },
  updateUser: (req, res) => {
    const { body } = req;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: 0, message: "db connection error" });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.status(403).json({ message: "Wrong email or password" });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results = JSON.parse(JSON.stringify(results));
        results.password = undefined;
        const jsontoken = sign(results, "papajohny7", {
          expiresIn: "10h",
        });
        return res.json({
          success: 1,
          message: "Successful login",
          userData: results,
          token: jsontoken,
        });
      } else {
        return res.status(403).json({ message: "Wrong email or password" });
      }
    });
  },
  getUnfollowedUsers: (req, res) => {
    const myId = req.query.myId;

    getUnfollowedUsers(myId)
      .then((results) => {
        return res.status(200).json(results);
      })
      .catch((err) => console.log(err));
  },
  followUser: (req, res) => {
    const myId = req.query.myId;
    const userId = req.query.userId;

    followUser(myId, userId)
      .then((results) => {
        return res.status(200).json({ results });
      })
      .catch((err) => console.log(err));
  },
};
