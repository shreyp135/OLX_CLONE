import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const res = await axios.get('https://olx-clone-cher.onrender.com/api/listings');
      console.log(res.data)
      setListings(res.data);
    };
    fetchListings();
  }, []);

  return (
    <div >
      <h1 className='text-xl font-medium m-8'>Fresh Recommendations</h1>
      <div className='grid grid-cols-4 px-24 gap-4'> 
        {listings.map((listing) => (
          <div key={listing._id} className='relative h-fit border border-gray-300 rounded-md p-6 hover:shadow-md hover:duration-150'>
            <svg className='absolute right-4 top-4 hover:text-[#0e3c27]' xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.75rem" viewBox="0 0 24 24"><path fill="black" d="m12.82 5.58l-.82.822l-.824-.824a5.375 5.375 0 1 0-7.601 7.602l7.895 7.895a.75.75 0 0 0 1.06 0l7.902-7.897a5.376 5.376 0 0 0-.001-7.599a5.38 5.38 0 0 0-7.611 0m6.548 6.54L12 19.485L4.635 12.12a3.875 3.875 0 1 1 5.48-5.48l1.358 1.357a.75.75 0 0 0 1.073-.012L13.88 6.64a3.88 3.88 0 0 1 5.487 5.48"/></svg>
            <h1 className='font-bold text-lg'>&#8377; {listing.price.toLocaleString("en-IN")}</h1>
            <p className='text-md font-semibold'> {listing.listingName} </p>
            <p className='text-gray-500'>{listing.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
 