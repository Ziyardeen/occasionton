import React from 'react'
import signupImage from '../../assets/signup-image.jpg'
import Header from './Header';
// https://www.vecteezy.com/vector-art/40674548-signup-vector-icon

const SignUp = () => {
    return (
        <div className='h-screen flex flex-col justify-between pb-6'>
            <Header/>
        <div className="flex flex-col md:flex-row ">

            {/* Left Side - Image */}
            <div className="hidden  md:flex md:w-1/2 md:justify-center md:items-center md:border-r-4 md:border-primary">
                <img 
                    src={signupImage} 
                    alt="Event Background" 
                    className="w-4/5  object-cover" 
                />
            </div>
            {/* Right Side - Signup Form */}
            <div className="flex items-center justify-center md:w-1/2 bg-white p-8">
                <form className="w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            aria-required="true"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>
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
                    <div className="mb-4">
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
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            required
                            aria-required="true"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            placeholder="Confirm your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white p-3 rounded hover:bg-primary transition duration-200"
                    >
                        Create Account
                    </button>
                    <p className="mt-4 text-center">
                        Already have an account? 
                        <a href="/login" className="text-primary hover:underline"> Log in here</a>
                    </p>
                </form>
            </div>
        </div>
        </div>
    );
}

export default SignUp