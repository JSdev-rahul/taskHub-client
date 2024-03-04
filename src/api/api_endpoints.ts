export const APIEndpoints = {
  // User Authentication Endpoints
  signUp: "/users",
  login: "/login",
  googleLogin: "/login/google-auth",

  // OTP Verification Endpoints
  verifyOtp: "/login/verify-otp",
  regenerateOtp: "/login/regenerate-otp",

  // Token Generation Endpoints
  generateAccessToken: "/token/generate-access-token",

  // Todos Endpoints
  getAllTodos: "/todos/:id",
  createTodo: "/todos",
  deleteTodo: "/todos/:id",
  getTodoDetails: "/todos/:id",
  updateTodo: "/todos/:id",
}
