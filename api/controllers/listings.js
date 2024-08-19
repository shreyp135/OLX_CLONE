import Listings from "../models/listings.js";


export const newListing = async (req, res) => {
  const { listingName, description, price, owner } = req.body;

  try {
    const newListing = new Listings({
      listingName,
      description,
      price,
      sold: false,
      owner,
    });

    const listing = await newListing.save();
    res.json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

export const allListings = async (req, res) => {
  try {
    const listings = await Listings.find({ sold: false });
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

export const userListings = async (req, res) => {
  try {
    const listings = await Listings.find({ owner: req.user.id });
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

export const userPurchases = async (req, res) => {
  try {
    const listings = await Listings.find({ owner: req.user.id,sold: true });
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
