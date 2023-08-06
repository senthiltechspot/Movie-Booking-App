const authControllers = require("../controllers/auth.controllers");
const {
  validateUserRequestBody,
} = require("../middlewares/validateUserRequestBody");

module.exports = function (app) {
  app.post(
    "/mba/api/v1/auth/signup",
    [validateUserRequestBody],
    authControllers.signup
  );
  app.post("/mba/api/v1/auth/signin", authControllers.signin);

  // Google authentication routes
  app.get("/crm/api/v1/login/google", authControllers.loginWithGoogle);
  app.get(
    "/crm/api/v1/auth/google/callback",
    authControllers.googleCallbackSuccess
  );

  // JWT token login route
//   app.get("/ecomm/api/v1/token-login", authController.tokenLogin);
};
