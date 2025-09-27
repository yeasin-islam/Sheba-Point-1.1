import React from 'react';
import Banner from '../Banner/Banner';
import TopRatedDoctors from '../TopRatedDoctors/TopRatedDoctors';
import OfferSection from '../OfferSection/OfferSection';
import ServicesSection from '../Services/ServicesSection';
import TopSpecialties from '../TopSpecialties/TopSpecialties';
import MarqueeSection from '../MarqueeSection/MarqueeSection';
import TestimonialsSection from '../TestimonialsSection/TestimonialsSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <ServicesSection />
            <TopSpecialties />
            <TopRatedDoctors />
            <MarqueeSection />
            <TestimonialsSection />
            <OfferSection />
        </div>
    );
};

export default Home;