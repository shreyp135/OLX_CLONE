import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Navbar () {
  
  const token = localStorage.getItem('token');
  const handleSignout = async (e) =>{
    try{
        await axios.get('http://localhost:8080/api/auth/signout');
        localStorage.removeItem("token");

        console.log("logged out");
        window.location.reload()
     }
    catch(err){
      console.log(err.message)
    }
  }
  return (<>
    <div className='flex flex-row justify-between align-middle bg-gray-1'>
      <div>
        <a className='w-fit' href="/">
           <img className='h-20 w-20' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAraIFmVik8jPewCwje3fyZIti2h-Ai6qI6g&s" alt="" />
        </a>
      </div>
      <div className='flex items-center'> 
        <div className='w-64 h-12 border-2 border-black rounded-md p-1 flex flex-row justify-between items-center hover:border-teal-400' >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.75rem" viewBox="0 0 24 24"><path fill="#3c3c3c" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
          <input className='w-48 h-10  text-lg px-4 focus:outline-none' placeholder='India' type="text"/>
          <a href="">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.75rem" viewBox="0 0 24 24"><path fill="none" stroke="#313131" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9l-7 6l-7-6"/></svg>
          </a>
        </div>
      </div>
      <div className='flex items-center w-3/6'> 
        <div className='w-full h-12 border-2 border-black rounded-md flex flex-row justify-between items-center hover:border-teal-400' >
          <input className='w-full h-10  text-lg px-4 focus:outline-none' placeholder='Find Cars, Mobile Phones and more...' type="text"/>
          <a href="" className='h-full w-12'>
            <div className='bg-[#0e3c27] h-full w-12 flex justify-center items-center'>
            <svg className='text-white' xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.75rem" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
            </div>
          </a>
        </div>
      </div>
     
       
      {!token ? (
         <> 
         <a href="/SignUp" className='flex justify-center items-center' >  
          <div className='font-medium text-lg text-[#0e3c27] hover:underline hover:duration-200 '>Register</div>
         </a> 
         <a href="/SignIn" className='flex justify-center items-center' >  
          <div className='font-medium text-lg text-[#0e3c27] hover:underline hover:duration-200 '>Login</div>
             </a> 
        </>
           ):(<>
         <a href="/Dashboard" className='flex justify-center items-center'>  
             <div className='font-medium text-lg text-[#0e3c27] hover:underline hover:duration-200 '>Dashboard</div>
          </a>
          <Link to="/" className='flex justify-center items-center' onClick={handleSignout}>  
          <div className='font-medium text-lg text-[#0e3c27] hover:underline hover:duration-200 '>Logout</div>
        </Link>
        </>
        )}


      <div className='flex flex-row justify-center items-center'>
      {!token ? (
        <a href="/SignIn">
        <img src="https://res.cloudinary.com/dahhchuj8/image/upload/v1724006509/S1creenshot_2024-08-18_235928_shu26k.png" alt="" className='w-20 mr-8 hover:shadow-md hover:duration-200 rounded-3xl'/>
        </a>
            ):(
        <a href="/newListing">
        <img src="https://res.cloudinary.com/dahhchuj8/image/upload/v1724006509/S1creenshot_2024-08-18_235928_shu26k.png" alt="" className='w-20 mr-8 hover:shadow-md hover:duration-200 rounded-3xl'/>
        </a>
        )}
      </div>
      
    </div>
    <hr className='text-gray-600'/>
    </>
  );
};
