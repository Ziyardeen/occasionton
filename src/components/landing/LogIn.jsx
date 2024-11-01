import React from 'react'
import loginImage from '../../assets/login-image.jpg'
import Header from './Header';

const LogIn = () => {
    return (
        <div className='h-screen flex flex-col justify-between  bg-primary'>
        <Header/>
            <div className="flex flex-col md:flex-row h-screen ">
                        {/* Left Side - Image */}
                        <div className="hidden md:flex md:w-1/2 mt-5">
                            <img 
                                src={loginImage}
                                alt="Event Background" 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        {/* Right Side - Login Form */}
                        <div className="flex items-center justify-center md:w-1/2 bg-white p-8 md:mb-10 h-full">
                            <form className="w-full max-w-sm">
                                <h2 className="text-2xl font-bold mb-6 text-center">Login to EventHub</h2>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        aria-required="true"
                                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        required
                                        aria-required="true"
                                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
                                >
                                    Login
                                </button>
                                <p className="mt-4 text-center">
                                    <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
                                </p>
                                <p className="mt-2 text-center">
                                    Don’t have an account? 
                                    <a href="/signup" className="text-blue-500 hover:underline"> Sign up here</a>
                                </p>
                            </form>
                        </div>
            </div>
        </div>
    );
}

export default LogIn