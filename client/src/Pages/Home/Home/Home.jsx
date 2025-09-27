import React from 'react';
import Banner from '../Banner/Banner';
import TopRatedDoctors from '../TopRatedDoctors/TopRatedDoctors';
import OfferSection from '../OfferSection/OfferSection';
import ServicesSection from '../Services/ServicesSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <ServicesSection />
            <TopRatedDoctors />
            <OfferSection />
        </div>
    );
};

export default Home;