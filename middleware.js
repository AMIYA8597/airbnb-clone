const Listing = require("./models/listing.js")
const Review = require("./models/review.js")
const { listingSchema, reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");


module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.user);
  // console.log(req.path , "..", req.originalUrl);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be loggedin for create listing");
    return res.redirect("/login");
  }
  next();
};


module.exports.saveRedirectUrl = (req,res,next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;    
  }
  next();
}

module.exports.onlyOwnerUsed = async (req,res,next) => {
  let { id } = req.params;
  let listingUpdate = await Listing.findById(id )
  if (!listingUpdate.owner.equals(res.locals.currentUser._id)) {
   req.flash("error" , "you are not the owner of this listing")
   return res.redirect(`/listings/${id}`)
  }
  next();
}


module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.onlyAuthorUsed = async (req,res,next) => {
  let {id , reviewId } = req.params;
  let reviewUpdate = await Review.findById(reviewId )
  if (!reviewUpdate.author.equals(res.locals.currentUser._id)) {
   req.flash("error" , "you didn`t create this review")
   return res.redirect(`/listings/${id}`)
  }
  next();
}
