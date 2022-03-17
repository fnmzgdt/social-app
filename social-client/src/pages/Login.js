import React, { useState } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/userActions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./login.css";

const useStyles = makeStyles({
  customError: {
    color: "red",
    fontSize: "0.8rem",
    margin: " 0 0 20px 0",
  },
});

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(loginUser(userData, history));

    /* axios
      .post("/login", userData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        history.push("/home");
      })
      .catch((err) => {
        setErrors(err.response.data);
      }); */
  };
  return (
    <div className="split-screen">
      <div className="left"></div>
      <div className="right">
        <form>
          <section className="copy">
            <h2>Sign in</h2>
          </section>
          <div className="input-container email">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="textfield"
              variant="outlined"
              label="Email"
            ></TextField>
          </div>
          <div className="input-container password">
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="textfield"
              variant="outlined"
              label="Password"
              type="password"
            ></TextField>
          </div>
          {errors.message && (
            <Typography variant="body2" className={classes.customError}>
              {errors.message}
            </Typography>
          )}
          <Button
            onClick={handleSubmit}
            className="signin-btn"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
