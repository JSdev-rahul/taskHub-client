const API_CONFIG = {
  SIGNUP: "/users",
  LOGIN: "/login",
  GOOGLE_LOGIN: "/login/google-auth",

  VERIFY_OTP: "/login/verify-otp",
  REGENRATE_OTP: "/login/regenerate-otp",

  GENERATE_ACCESS_TOKEN: "/token/generate-access-token",
  GET_ALL_TODOS: "/todos/:id",
  CREATE_TODO: "/todos",
  DELETE_TODO: "/todos/:id",
  GET_TODO_DETAILS: "/todos/:id",
  UPDATE_TODO: "/todos/:id",

  GET_ALL_USERS: "/users",
  DELETE_USER: "/users/:id",
}

export const API_ENDPOINT = {
  // User Authentication Endpoints
  SIGNUP: API_CONFIG.SIGNUP,
  LOGIN: API_CONFIG.LOGIN,
  GOOGLE_LOGIN: API_CONFIG.GOOGLE_LOGIN,

  // OTP Verification Endpoints
  VERIFY_OTP: API_CONFIG.VERIFY_OTP,
  REGENRATE_OTP: API_CONFIG.REGENRATE_OTP,

  // Token Generation Endpoints
  GENERATE_ACCESS_TOKEN: API_CONFIG.GENERATE_ACCESS_TOKEN,

  // Todos Endpoints
  GET_ALL_TODOS: API_CONFIG.GET_ALL_TODOS,
  CREATE_TODO: API_CONFIG.CREATE_TODO,
  DELETE_TODO: API_CONFIG.DELETE_TODO,
  GET_TODO_DETAILS: API_CONFIG.GET_TODO_DETAILS,
  UPDATE_TODO: API_CONFIG.UPDATE_TODO,

  // users EndPoints
  GET_ALL_USERS: API_CONFIG.GET_ALL_USERS,
  DELETE_USER: API_CONFIG.DELETE_USER,
}
