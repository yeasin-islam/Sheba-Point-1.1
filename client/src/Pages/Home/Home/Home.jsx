import React from 'react';
import Banner from '../Banner/Banner';
import TopRatedDoctors from '../TopRatedDoctors/TopRatedDoctors';
import OfferSection from '../OfferSection/OfferSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <TopRatedDoctors />
            <OfferSection />
        </div>
    );
};

export default Home;