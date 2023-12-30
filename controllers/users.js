const User = require("../models/user");

module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.UserSignUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);

    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      //successful login with flash message and redirect to home page
      req.flash("success", "Welcome to wanderlust!");
      res.redirect("/listings");
    });

    //   req.flash("success", "User Register successfully");
    //   res.redirect("/listings");
  } catch (err) {
    console.log("error", err.message);
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderSignInForm = (req, res) => {
  res.render("users/login.ejs");
};
//   middleware for user authentication
// this function is called by express in the routes that need authentication. If a user is not logged in, it will call the function defined below
//   function isLoggedIn(req,res,next){

module.exports.userSignIn = async (req, res) => {
  req.flash("success", "Welcome to MajorProject ! You are logged in!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
module.exports.userLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are Logged out");
    // res.redirect("/login");
    res.redirect("/listings");
  });
};
