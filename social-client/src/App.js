import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { verify } from "jsonwebtoken";
import BlockLogin from "./components/BlockLogin";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import HashtagPage from "./pages/HashtagPage";
import UserPage from "./pages/Users/UserPage";
import { useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import GlobalStyle from "./components/GlobalStyles";
import WriteArticle from "./pages/WriteArticle/WriteArticle";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.jwtToken || null;
  if (token) {
    const decodedToken = verify(token.split(" ")[1], "papajohny7");
    console.log(decodedToken);
    if (decodedToken * 1000 < Date.now()) {
      console.log("user should be logged out");
    }
    dispatch({ type: "SET_AUTHENTICATED" });
    axios.defaults.headers.common["Authorization"] = token;
    dispatch({ type: "LOGIN_USER_SUCCESS", payload: decodedToken });
  }

  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <BlockLogin exact path="/login">
          <Login />
        </BlockLogin>
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
        <Route exact path="/hashtag/:tagname" component={HashtagPage} />
        <Route exact path="/user/:userid" component={UserPage} />
        <Route exact path="/write" component={WriteArticle} />
      </Switch>
    </Router>
  );
}

export default App;
