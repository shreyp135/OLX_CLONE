import express from 'express';
import {newListing, allListings,userListings, userPurchases} from "../controllers/listings.js"

const router = express.Router();

router.post('/', newListing);
router.get('/', allListings);
router.get('/userListings', userListings);
router.get('/purchases', userPurchases);

export default router;
