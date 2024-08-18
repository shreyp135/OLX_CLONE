import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log( { email, password });
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/api/auth/signin', { email, password });
    console.log("2");
    localStorage.setItem('token', res.data.token);
    navigate('/');
  };

  return (<>
    <div className="flex min-h-full flex-1 flex-col mt-12 px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-6 mb-4 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="">
                                <input
                                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                               
                            </div>
                            <div className="mt-1 mb-4">
                                <input
                                  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <button
                                type="submit"
                                className="flex mb-2 mt-6 w-full justify-center rounded-md bg-[#0e3c27] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:duration-300 hover:shadow-xl hover:shadow-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                       
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account &#x3f;
                        <Link to="/SignUp" className="ml-2 text-blue-500 underline ">
                            Sign-up
                        </Link>
                    </p>
                </div>
            </div>

    </>
  );
};

export default Login;
