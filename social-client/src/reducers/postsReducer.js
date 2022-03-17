const initialState = {
  posts: [],
  suggestedUsers: [],
  loading: false,
  error: null,
  lastId: null,
  hashtagViews: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POSTS_REQUEST":
      return {
        ...state,
        posts: [],
        loading: true,
        error: null,
      };
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        lastId:
          action.payload.length > 0
            ? action.payload[action.payload.length - 1].id
            : null,
      };
    case "FETCH_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "FETCH_HASHTAG_VIEWS":
      return {
        ...state,
        hashtagViews: action.payload,
      };

    //fetch_paginated_posts
    case "FETCH_PAGINATED_POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_PAGINATED_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.payload],
      };
    case "UPDATE_LAST_ID":
      return {
        ...state,
        lastId: action.payload,
      };
    case "FETCH_PAGINATED_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "LOADING_POST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LIKE":
      const objIndex = state.posts.findIndex(
        (post) => post.id == action.payload
      );
      return {
        ...state,
        posts: state.posts.map((post, i) =>
          i == objIndex
            ? {
                ...post,
                likeCount: post.likeCount + 1,
                liked: true,
              }
            : post
        ),
      };
    case "REMOVE_LIKE":
      const indexpost = state.posts.findIndex(
        (post) => post.id == action.payload
      );
      return {
        ...state,
        posts: state.posts.map((post, i) =>
          i == indexpost
            ? {
                ...post,
                likeCount: post.likeCount - 1,
                liked: false,
              }
            : post
        ),
      };

    case "FETCH_SUGGESTED_USERS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_SUGGESTED_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        suggestedUsers: action.payload,
      };

    case "FETCH_SUGGESTED_USERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "FOLLOW":
      return {
        ...state,
        suggestedUsers: state.suggestedUsers.filter(
          (element) => element.id !== action.payload
        ),
      };

    case "FOLLOW_FAILURE":
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default postsReducer;
