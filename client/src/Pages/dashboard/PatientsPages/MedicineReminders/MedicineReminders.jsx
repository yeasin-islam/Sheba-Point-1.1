import React from 'react';
import PageIndications from '../../../../components/PageIndications/PageIndications';

const MedicineReminders = () => {
    return (
        <div className='h-full'>
            <PageIndications route={'dashboard/patientsPages/medicineReminders'} pageName={'Patients Medicine Reminders'}></PageIndications>

            {/* Start from here and delete pageIndicationComponent from here */}
        </div>
    );
};

export default MedicineReminders;