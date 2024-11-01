import React from 'react'

const Testimonials = () => {
    return (
      <section className="py-16  bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Community Feedback</h2>
          <div className="space-y-4">
            <blockquote className="italic">“This platform has made it so easy to find and join events in my area!”</blockquote>
            <cite className="font-semibold">- Jessica T.</cite>
            <blockquote className="italic">“The staff tools are fantastic! Managing events has never been easier.”</blockquote>
            <cite className="font-semibold">- Mike S.</cite>
          </div>
        </div>
      </section>
    );
  };

export default Testimonials