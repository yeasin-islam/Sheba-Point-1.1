import React from 'react';
import Banner from '../Banner/Banner';
import TopRatedDoctors from '../TopRatedDoctors/TopRatedDoctors';
import OfferSection from '../OfferSection/OfferSection';
import ServicesSection from '../Services/ServicesSection';
import TopSpecialties from '../TopSpecialties/TopSpecialties';

const Home = () => {
    return (
        <div>
            <Banner />
            <ServicesSection />
            <TopSpecialties />
            <TopRatedDoctors />
            <OfferSection />
        </div>
    );
};

export default Home;