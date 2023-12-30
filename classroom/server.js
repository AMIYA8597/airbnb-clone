const express = require("express");
const app = express();
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
};
app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next) => {
  res.locals.successMsg = req.flash("success")
  res.locals.errorMsg = req.flash("error")
  next();
})

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  // console.log(req.session.name);
  // res.send(name);
  
  if (name === "anonymous") {
    req.flash("error", "user not registered");
  } else {
    req.flash("success", "user register successfully");
  }
  
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  // let {name = "Anonymous"} = req.query;
  // res.send(`Hello ${req.session.name}`);
  
  res.render("page.ejs", { name: req.session.name });
});


// app.get("/reqcount" , (req,res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count =1;
//   }
//   res.send(`you send a reqcount for ${req.session.count} times`)
// })

// app.get("/test", (req, res) => {
//   res.send("test successful");
// });

app.listen(3005, () => {
  console.log("server is listening in 3005");
});













































// app.use(cookieParser());
// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookies", (req, res) => {
//   res.cookie("color", "blue", { signed: true });
//   res.cookie("name", "Amiya", { signed: true });
//   res.cookie("age", "23", { signed: true });
//   res.send("signed cookies set");
// });

// app.get("/verify", (req, res) => {
//   console.log(req.cookies);
//   console.log(req.signedCookies);
//   res.send("verified");
// });

// app.get("/getcookies", (req, res) => {
//   res.cookie("greet", "How r U");
//   res.cookie("talk", "r u ok?");
//   res.send("send you some cookies");
// });

// app.get("/", (req, res) => {
//   console.dir(req.cookies);
//   res.send("Hi this is classroom root");
// });
