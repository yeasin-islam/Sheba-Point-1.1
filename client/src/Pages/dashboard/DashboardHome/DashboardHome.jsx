import React from 'react';

const DashboardHome = () => {
    return (
        <div className='min-h-full flex items-center justify-center'>
            <div className='max-w-xl bg-base-300 p-8 rounded-2xl'>
                <h3 className='font-bold text-2xl'>This is dashboard Home</h3>
                <p>/src/pages/dashboard/dashboardHome</p>
                <li className='bg-accent/50 p-2 rounded-2xl mt-4 text-secondary'>Home Component একটাই থাকবে। এখানেই role based দেখানো হবে। Overview অথবা Home পেইজটা সবার পরে করিয়েন।</li>
                <li className='bg-accent/50 p-2 rounded-2xl mt-4 text-secondary'>SideBar আপাতত সবারগুলো একসাথে থাকুক। রোল সেট করার পরে আলাদা হয়ে যাবে।</li>
            </div>

        </div>
    );
};

export default DashboardHome;