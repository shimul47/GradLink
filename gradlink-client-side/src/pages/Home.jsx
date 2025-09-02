import React from 'react';
import Hero from '../Components/Hero';
import FeaturesSection from '../Components/FeaturesSection';
import Testimonials from '../Components/Testimonials';
import CTA from '../Components/CTA';
import Impacts from '../Components/Impacts';
import FAQ from '../Components/FAQ';
import Partners from '../Components/Partners';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <Testimonials />
      <CTA />
      <Impacts />
      <FAQ />
      <Partners />
    </div>
  );
};

export default Home;