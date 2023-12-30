const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require("../schema");
const Review = require("../models/review");
const {
  validateReview,
  isLoggedIn,
  onlyAuthorUsed,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews");

// //************************Reviews**************************************************
// //post review Route

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.postReviewForm)
);

//   // ******************delete review route *****************

router.delete(
  "/reveiewId",
  isLoggedIn,
  onlyAuthorUsed,
  wrapAsync(reviewController.getDestroyReview)
);

module.exports = router;
