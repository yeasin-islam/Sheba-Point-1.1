import React from 'react';
import PageIndications from '../../../../components/PageIndications/PageIndications';

const Referrals = () => {
    return (
        <div className='h-full'>
            <PageIndications route={'dashboard/doctorPages/referrals'} pageName={'Doctor Referrals'}></PageIndications>

            {/* Start from here and delete pageIndication Component */}
        </div>
    );
};

export default Referrals;