import React from 'react'

const Footer = () => {
    return (
      <footer id="contact" className="bg-primary text-white py-6">
        <div className="container mx-auto text-center">
          <p className="mb-4">© 2024 Community Events. All Rights Reserved.</p>
          <nav>
            <ul className="flex justify-center space-x-6">
              <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
              <li><a href="/faqs" className="hover:underline">FAQs</a></li>
            </ul>
          </nav>
          <div className="mt-4">
            <p>Contact us: <a href="mailto:support@communityevents.com" className="underline">support@communityevents.com</a></p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:underline">Facebook</a>
            <a href="#" className="hover:underline">Twitter</a>
            <a href="#" className="hover:underline">Instagram</a>
          </div>
        </div>
      </footer>
    );
  };

export default Footer