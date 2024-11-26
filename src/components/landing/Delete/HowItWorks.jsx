import React from 'react'

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16  bg-secondary">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <ol className="space-y-4">
          <li className="font-semibold">1. Sign Up: Create an account in seconds.</li>
          <li className="font-semibold">2. Explore Events: Browse the event list and find what interests you.</li>
          <li className="font-semibold">3. Join Events: Sign up for events you want to attend and receive reminders.</li>
          <li className="font-semibold">4. Manage Events: Staff can log in to create and oversee events.</li>
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks