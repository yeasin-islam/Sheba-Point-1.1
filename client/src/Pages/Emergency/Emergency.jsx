import React from 'react';
import PageIndications from '../../components/PageIndications/PageIndications';

const Emergency = () => {
    return (
        <div className='h-full'>
            <PageIndications route={'dashboard/patientsPages/emergency'} pageName={'Patients Emergency'}></PageIndications>

            {/* Start from here and delete pageIndicationComponent from here */}
        </div>
    );
};

export default Emergency;