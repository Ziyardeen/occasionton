import React from 'react'

const CallToAction = () => {
    return (
      <section className="py-16 bg-secondary text-black text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join the Fun?</h2>
        <a href="#signup" className="bg-green-500 px-6 py-3 rounded hover:bg-green-600">Sign Up Now</a>
        <a href="#browse-events" className="bg-transparent border border-green text-black px-4 py-2 rounded ml-2 hover:bg-slate-800 hover:text-white">Browse Events</a>
      </section>
    );
  };

export default CallToAction