import React from 'react';
import Banner from '../Banner/Banner';
import TopRatedDoctors from '../TopRatedDoctors/TopRatedDoctors';
import OfferSection from '../OfferSection/OfferSection';
import ServicesSection from '../Services/ServicesSection';
import TopSpecialties from '../TopSpecialties/TopSpecialties';
import MarqueeSection from '../MarqueeSection/MarqueeSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <ServicesSection />
            <TopSpecialties />
            <TopRatedDoctors />
            <MarqueeSection />
            <OfferSection />
        </div>
    );
};

export default Home;