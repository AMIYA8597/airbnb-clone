const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users");

router
  .route("/signup")
  .get(userController.renderSignUpForm)
  .post(wrapAsync(userController.UserSignUp));

router
  .route("/login")
  .get(userController.renderSignInForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.userSignIn
  );

  router.get("/logout", userController.userLogout);

module.exports = router;



// router.get("/signup", userController.renderSignUpForm);

// router.post(
//   "/signup",
//   wrapAsync(userController.UserSignUp)
// );

// router.get("/login", userController.renderSignInForm);

// router.post(
//   "/login",
//   saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   userController.userSignIn
// );

// router.post("/login", async (req, res) => {
//     try {
//         let { username, password } = req.body;
//   const newUser = new User({ username });
//   const loginUser = await User.register(newUser, password);
//   console.log(loginUser);
//   req.flash("success", "User login successfully");
//   res.redirect("/listings");
//     }
//     catch (err) {
//         console.log("error", err.message);
//         req.flash("error", err.message);
//         res.redirect("/login");
//     }
// });


