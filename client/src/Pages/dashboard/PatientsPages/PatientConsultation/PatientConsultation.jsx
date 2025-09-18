import React from 'react';
import PageIndications from '../../../../components/PageIndications/PageIndications';

const PatientConsultation = () => {
    return (
        <div className='h-full'>
            <PageIndications route={'dashboard/patientsPages/consultaiton'} pageName={'Patients Consultaiton by Id'}></PageIndications>

            {/* Start from here and delete pageIndicationComponent from here */}
        </div>
    );
};

export default PatientConsultation;