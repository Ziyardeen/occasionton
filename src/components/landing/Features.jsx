import React from 'react'


const Features = () => {
  
    return (
      <section id="features" className="py-16 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold">Browse Events</h3>
              <p>A user-friendly interface to explore various events happening in your community.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold">Easy Sign-Up</h3>
              <p>Quickly sign up for events with a few clicks. Receive instant confirmation and reminders.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold">Google Calendar Integration</h3>
              <p>Seamlessly add events to your Google Calendar. Never miss out on an event again!</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold">Staff Management Tools</h3>
              <p>Special access for staff members to create, manage, and promote events.</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Features

