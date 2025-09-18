import React from 'react';
import PageIndications from '../../../../components/PageIndications/PageIndications';

const Appointments = () => {
    return (
        <div className='h-full'>
            <PageIndications route={'dashboard/doctorPages/appointments'} pageName={'Doctor Appointments'}></PageIndications>
            {/* Start from here and delete pageIndicationComponent from here */}
        </div>
    );
};

export default Appointments;