import React from 'react';

const PageIndications = ({ pageName, route }) => {
    return (
        <div className='h-full flex items-center justify-center'>
            <div className='max-w-xl bg-base-300 p-8 rounded-2xl'>
                <h3 className='font-bold text-2xl'>This is {pageName} Page</h3>
                <p>../src/pages/{route}</p>
            </div>

        </div>
    );
};

export default PageIndications;