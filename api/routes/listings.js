import express from 'express';
import { isloggedIn } from '../utils/middlewares.js';
import {newListing, allListings,userListings, userPurchases} from "../controllers/listings.js"

const router = express.Router();

router.post('/', isloggedIn, newListing);
router.get('/', allListings);
router.get('/my-items', isloggedIn, userListings);
router.get('/my-purchases', isloggedIn, userPurchases);

export default router;
