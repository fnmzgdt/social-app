const express = require("express");
const app = express();
require("dotenv").config();
const userRouter = require("./apis/users/userroutes");
const postRouter = require("./apis/posts/postsroutes");


app.use(express.json());
app.use("/api", userRouter);
app.use("/api", postRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("server is surring");
});
