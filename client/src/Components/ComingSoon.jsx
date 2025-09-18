import React from 'react';
import webLogo from '../assets/WebLogo.png';

const ComingSoon = ({
  title = "Under construction",
  message = "We're working hard to bring this feature to you soon.",
  showBack = true,
}) => {

  return (
    <div className="relative flex items-center justify-center bg-base-300 min-h-screen px-4">
      <div className='absolute translate-x-115 -translate-y-40 bg-accent/50 rounded-2xl p-4'>
        <h2 className='font-bold'>Development progress...</h2>
        <p>✅ Home Page Layout</p>
        <ul>
          <p>✅ Dashboard Layout</p>
          <li>Admin static and dynamic routes</li>
          <li>Doctor static and dynamic routes</li>
        </ul>

      </div>
      <div className="text-center bg-base-100 p-10 rounded-2xl shadow-xl overflow-hidden">
        <div>

          <img
            src={webLogo}
            alt="Web Logo"
            className="mx-auto mb-6 h-20 w-6/7 md:h-32"
          />
        </div>
        <h1 className="text-4xl text-primary md:text-5xl font-bold mb-4">
          🚧 {title}
        </h1>
        <p className="text-neutral-500 text-lg md:text-xl max-w-xl mx-auto">
          {message}
        </p>

        {showBack && (
          <button
            className="mt-6 inline-flex items-center px-5 py-2.5 text-base-100 bg-secondary rounded-full shadow-md transition duration-200"
          >
            ⬅ Back
          </button>
        )}

        <div className="mt-6 animate-spin text-2xl">⏳</div>
        <h2 className='text-error text-2xl'>Hello, are you looking for me? I'm inside Home.jsx</h2>
        <p>src/pages/Home/Home.jsx</p>
      </div>
    </div>
  );
};

export default ComingSoon;
