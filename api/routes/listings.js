import express from 'express';
import { isloggedIn } from '../utils/middlewares';
import {newListing, allListings,userListings, userPurchases} from "../controllers/listings"

const router = express.Router();

const itemController = require('../controllers/itemController');

router.post('/', isloggedIn, newListing);
router.get('/', allListings);
router.get('/my-items', isloggedIn, userListings);
router.get('/my-purchases', isloggedIn, userPurchases);

export default router;
