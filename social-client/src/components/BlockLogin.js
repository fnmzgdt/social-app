import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.user.authenticated);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? <Redirect to="/home" /> : children;
      }}
    />
  );
};

export default PrivateRoute;
