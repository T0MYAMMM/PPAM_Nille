const initialState = {
    token: null,
    error: null,
    isLoading: false,
    user: null,
    success: null,
  };
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'API_LOGIN_REQUEST':
        // Handle login request
      case 'API_LOGIN_SUCCESS':
        // Handle login success
      case 'API_LOGIN_FAILED':
        // Handle login failure
      case 'API_SIGNUP_REQUEST':
        // Handle signup request
      case 'API_SIGNUP_SUCCESS':
        // Handle signup success
      case 'API_SIGNUP_FAILED':
        // Handle signup failure
      default:
        return state;
    }
  }