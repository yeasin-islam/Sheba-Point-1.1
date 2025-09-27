import React from 'react';
import Banner from '../Banner/Banner';
import TopRatedDoctors from '../TopRatedDoctors/TopRatedDoctors';
import ServicesSection from '../Services/ServicesSection';
import TopSpecialties from '../TopSpecialties/TopSpecialties';
import MarqueeSection from '../MarqueeSection/MarqueeSection';
import TestimonialsSection from '../TestimonialsSection/TestimonialsSection';
import SupportSection from '../SupportSection/SupportSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <ServicesSection />
            <TopSpecialties />
            <TopRatedDoctors />
            <MarqueeSection />
            <TestimonialsSection />
            <SupportSection />
        </div>
    );
};

export default Home;