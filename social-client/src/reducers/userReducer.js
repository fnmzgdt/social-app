const initialState = {
  authenticated: false,
  id: null,
  username: null,
  email: null,
  loading: false,
  error: null,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        authenticated: true,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        loading: false,
        error: null,
      };
    case "LOGIN_USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "SET_AUTHENTICATED":
      return {
        ...state,
        authenticated: true,
      };
    default:
      return state;
  }
};
