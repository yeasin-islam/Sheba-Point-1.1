import React from 'react';
import PageIndications from '../../../../components/PageIndications/PageIndications';

const DoctorConsulation = () => {
    return (
        <div className='h-full'>
            <PageIndications route={'dashboard/doctorPages/consultaiton'} pageName={'Doctor Consultaiton by Id'}></PageIndications>

            {/* Start from here and delete pageIndicationComponent from here */}
        </div>
    );
};

export default DoctorConsulation;