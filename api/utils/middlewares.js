
//middleware for checking if the user is logged in or not
export default isloggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
       req.session.redirectUrl = req.originalUrl;
      }
    next();
  };


//middleware for authorisation check
module.exports.isAuthor = async (req,res,next)=>{
    let {id,reviewId } = req.params;
    const currentListing = await review.findById(reviewId);
   if(!currentListing.owner._id.equals(res.locals.currentUser._id)){
     req.flash("error", "You don't have permission");
     res.redirect(`/listings/${id}`);
   }
   next();

  };
