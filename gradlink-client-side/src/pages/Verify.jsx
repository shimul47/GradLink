import React from 'react';
import HeroSection from '../VerifyComponents/HeroSection';

import WhyVerifySection from '../VerifyComponents/WhyVerifySection';
import FAQSection from '../VerifyComponents/FAQSection';

import VerifyUser from '../VerifyComponents/VerifyUser';

const Verify = () => {



  return (
    <div>
      <HeroSection />
      {/* <StatusCard /> */}
      <VerifyUser />
      <WhyVerifySection />
      <FAQSection />
    </div>
  );
};

export default Verify;