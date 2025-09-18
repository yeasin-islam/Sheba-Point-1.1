import React from 'react';
import PageIndications from '../../../../components/PageIndications/PageIndications';

const DoctorsPatient = () => {
    return (
        <div className='h-full'>
            <PageIndications route={'dashboard/doctorPages/doctorsPatient'} pageName={'Doctors Patients by Id'}></PageIndications>

            {/* Start from here and delete pageIndicationComponent from here */}
        </div>
    );
};

export default DoctorsPatient;