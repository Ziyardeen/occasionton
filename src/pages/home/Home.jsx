import React from 'react';
import Hero from '../../components/landing/Hero';
import Header from '../../components/landing/Header';
import Features from '../../components/landing/Features';
import HowItWorks from '../../components/landing/HowItWorks';
import Testimonials from '../../components/landing/Testimonials';
import CallToAction from '../../components/landing/CallToAction';
import Footer from '../../components/landing/Footer';

const Home = () => {
  return (
    <div className='w-full h-screen  p-5 '>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
