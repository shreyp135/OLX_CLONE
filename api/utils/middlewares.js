
//middleware for checking if the user is logged in or not
export const isloggedIn = (req,res,next)=>{
    console.log(req)
    if(!req.isAuthenticated()){
        console.log(" message: User not logged in");
        return false;
        }
        return true;
    next();
  };

