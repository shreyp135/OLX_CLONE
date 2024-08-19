import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

export default function newListing() {
  const [listingName, setListingName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();      

    const handleSubmit = async (e) => {
        e.preventDefault();
        const owner = localStorage.getItem('token');
        if(owner){
        const res = await axios.post(
          'https://olx-clone-cher.onrender.com/api/listings',
          { listingName, price, description, owner },
        );
        navigate("/");
      }
      else
        navigate("/SignIn")
        
      };
    

  return (<>
      <div className="container mx-auto p-4">
      <h2 className="mt-6 mb-10 text-3xl text-center font-semibold">
        Create a New Listing on OLX
      </h2>
      <br />
      <div className='flex flex-row justify-center'>
      <form className='w-3/5' onSubmit={handleSubmit}>
        <div className="mb-8">
          <label htmlFor="Name" className="form-label block text-sm font-medium text-gray-700">
            Item Name
          </label>
          <input
            type="text" value={listingName} onChange={(e) => setListingName(e.target.value)} required
            className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>


        <div className="mb-8">
          <label htmlFor="description" className="form-label block text-sm font-medium text-gray-700">
            Item Description
          </label>
          <input
           type="text" value={description} onChange={(e) => setDescription(e.target.value)} required
            className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="price" className="form-label block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text" value={price} onChange={(e) => setPrice(e.target.value)} required 
            className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        <br />
        <div className='flex flex-row justify-center'>
        <button type="submit" className="btn bg-[#0e3c27] hover:shadow-lg hover:duration-200 text-white font-medium py-2 px-4 rounded ">
          Add Item
        </button>
        </div>
      </form>
    </div>
      <br />
    </div>
    </>
  )
}
