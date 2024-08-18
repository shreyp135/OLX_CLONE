import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const res = await axios.get('/api/listings');
      setListings(JSON.parse(res.data));
    };
    fetchListings();
  }, []);

  return (
    <div>
      <h1>All Items</h1>
      <ul>
        {listings.map((listing) => (
          <li key={listing._id}>
            {listing.name} - ${listing.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
