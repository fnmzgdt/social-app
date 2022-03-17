import axios from "axios";

export const loginUser = (userData, history) => (dispatch, getState) => {
  dispatch({ type: "LOGIN_USER_REQUEST" });
  try {
    axios.post("/login", userData).then((res) => {
      console.log(res.data);
      const jwtToken = `Bearer ${res.data.token}`;
      localStorage.setItem("jwtToken", jwtToken);
      axios.defaults.headers.common["Authorization"] = jwtToken;
      dispatch({ type: "LOGIN_USER_SUCCESS", payload: res.data.userData });
      history.push("/home");
    });
  } catch (error) {
    dispatch({ type: "LOGIN_USER_FAILURE", error });
  }
};
