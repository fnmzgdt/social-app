import axios from "axios";

export const fetchPosts = (myId) => (dispatch) => {
  dispatch({ type: "FETCH_POSTS_REQUEST" });
  try {
    axios.get("/feed", { params: { myId } }).then((res) => {
      console.log(res.data);
      dispatch({
        type: "FETCH_POSTS_SUCCESS",
        payload: res.data,
      });
    });
  } catch (error) {
    dispatch({ type: "FETCH_POSTS_FAILURE", error });
  }
};

export const loadPaginatedPosts = (currentUserId, lastId) => (dispatch) => {
  dispatch({ type: "FETCH_PAGINATED_POSTS_REQUEST" });
  console.log(lastId);
  try {
    axios
      .get("/paginatedposts", { params: { currentUserId, lastId } })
      .then((res) => {
        dispatch({ type: "FETCH_PAGINATED_POSTS_SUCCESS", payload: res.data });
        if (res.data.length > 0) {
          dispatch({
            type: "UPDATE_LAST_ID",
            payload: res.data[res.data.length - 1].id,
          });
        }
      });
  } catch (error) {
    dispatch({ type: "FETCH_PAGINATED_POSTS_FAILURE", error });
  }
};

//fetchPaginatedPosts

/*export const fetchPosts = () => {
  axios.get("/latestposts").then((res) => {
    return {
      type: "FETCH_POSTS",
      payload: res.data,
    };
  });
};*/

export const fetchHashtagPosts = (tagname, myId) => (dispatch) => {
  dispatch({ type: "FETCH_POSTS_REQUEST" });
  try {
    axios.get(`/hashtag/${tagname}`, { params: { myId } }).then((res) => {
      console.log(res.data);
      dispatch({ type: "FETCH_POSTS_SUCCESS", payload: res.data });
    });
  } catch (error) {
    dispatch({ type: "FETCH_POSTS_FAILURE", error });
  }
};

export const getHashtagViews = (tagname) => (dispatch) => {
  try {
    axios.get(`/hashtag/${tagname}/viewcount`).then((res) => {
      console.log(res.data);
      dispatch({ type: "FETCH_HASHTAG_VIEWS", payload: res.data });
    });
  } catch (error) {
    dispatch({ type: "FETCH_HASHTAG_VIEWS_FAILURE", error });
  }
};

export const writePost = (formdata) => (dispatch) => {
  dispatch({ type: "LOADING_POST" });
  try {
    axios.post("/writepost", formdata).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserPosts = (userId) => (dispatch) => {
  dispatch({ type: "FETCH_POSTS_REQUEST" });
  try {
    axios.get(`/userfeed/${userId}`).then((res) => {
      const response = res.data.map((post) =>
        post.imageUrl
          ? { ...post, imageUrl: post.imageUrl.split(",") }
          : post
      );
      //console.log(res.data);
      dispatch({
        type: "FETCH_POSTS_SUCCESS",
        payload: response,
      });
    });
  } catch (error) {
    dispatch({ type: "FETCH_POSTS_FAILURE", error });
  }
};

export const postLike = (userId, postId) => (dispatch) => {
  dispatch({ type: "LIKE", payload: postId });
  try {
    axios.post("/like", null, { params: { userId, postId } }).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LIKE_FAILURE", error });
  }
};

export const removeLike = (userId, postId) => (dispatch) => {
  dispatch({ type: "REMOVE_LIKE", payload: postId });
  try {
    axios.delete("/like", { params: { userId, postId } }).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LIKE_FAILURE", error });
  }
};

export const getSuggestedUsers = (myId) => (dispatch) => {
  dispatch({ type: "FETCH_SUGGESTED_USERS_REQUEST" });
  try {
    axios.get("/suggested", { params: { myId } }).then((res) => {
      dispatch({
        type: "FETCH_SUGGESTED_USERS_SUCCESS",
        payload: res.data,
      });
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FETCH_SUGGESTED_USERS_FAILURE", error });
  }
};

export const followUser = (myId, userId) => (dispatch) => {
  dispatch({ type: "FOLLOW", payload: userId });
  try {
    axios.post("/follow", null, { params: { myId, userId } }).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FOLLOW_FAILURE", error });
  }
};
