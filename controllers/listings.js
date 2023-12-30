const Listing = require("../models/listing");

// const mbxStyles = require('@mapbox/mapbox-sdk/services/styles');
// const stylesService = mbxStyles({ accessToken: MY_ACCESS_TOKEN });
// stylesService exposes listStyles(), createStyle(), getStyle(), etc.

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_BOX_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createListingForm = async (req, res, next) => {

   let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  })
    .send()
    // .then(response => {
    //   const match = response.body;
    // });
    // console.log("response", response.body.features[0].geometry);
    // res.send("done")

 let url = req.file.path;
 let filename = req.file.filename;
 console.log(url, "..", filename);
  const newListing = new Listing(req.body.listing);
  // console.log(req.user);
  newListing.owner = req.user._id;
  newListing.image = {url, filename}

  newListing.geometry = response.body.features[0].geometry;
  
  let savedListing =  await newListing.save();
  console.log("savedListing", savedListing);
  req.flash("ssuccess", "New Listing Created");
  res.redirect("/listings");
};

module.exports.showListingForm = async (req, res) => {
  let { id } = req.params;
  const idlisting = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!idlisting) {
    req.flash("error", "Your listing doesn't existing");
    res.redirect("/listings");
  }
  console.log(idlisting);
  res.render("listings/show.ejs", { idlisting });
};


module.exports.editListingForm = async (req, res) => {
  let { id } = req.params;
  const idlisting = await Listing.findById(id);
  if (!idlisting) {
    req.flash("error", "Your listing doesn't existing");
    res.redirect("/listings");
  }

   let originalImageUrl = idlisting.image.url
  originalImageUrl= originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { idlisting, originalImageUrl});
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
 let listingUpdate = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

 if (typeof req.file !== "undefined") {
  
 let url = req.file.path;
 let filename = req.file.filename;
//  console.log(url, "..", filename);
  listingUpdate.image = {url, filename}
  await listingUpdate.save();
}
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deleteListings = await Listing.findByIdAndDelete(id);

  console.log(deleteListings);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};












//   Validation of input fields using express-validator library
//   The check() function on the request object is used to perform these validations
//   If any validation fails, an error will be added to the req.errors array
//   This array can then be passed into the view so it can display the errors for the user
//   In this case, we are only doing simple text validation for simplicity sake
//   We also need to use body-parser middleware to parse the incoming request bodies
//   So that we can access the values of the input fields through req.body
//   app.use(bodyParser.urlencoded()) should have been included in our main server file
//   before we defined our routes
//   When the submit button on the form is clicked, the POST HTTP method is used
//   and the data from the form is sent in the request body
//   Our route handler for the /listings route with the HTTP GET method is not suitable
//   because it does not handle the submission of the form
//   Instead, we need to define a route handler for the /listings route with the HTTP POST method
//   That way, when the form is submitted, the data from the form can be accessed through req.body
//   And we can process the form data accordingly
//   Note that we don't actually save anything to the database yet
//   All we do is log the data to the console for now
//   To see the logged output, open your terminal and run node app
//   Then visit http://localhost:3000/listings in your web browser

// req.body is where we access the form data that was sent from the new listing page
// __dirname is a global variable that represents the directory that this script is running in
// path.join() combines the file paths to create one complete file path string
