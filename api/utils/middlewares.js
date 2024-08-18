
//middleware for checking if the user is logged in or not
export const isloggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        res.status(401).json({ message: 'User not logged in' });
        }
    next();
  };

