import React from 'react';
import { useNavigate, useRouteError, Link } from 'react-router';

// Inline SVG Icons
const FiAlertTriangle = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <circle cx="12" cy="17" r="1"></circle>
    </svg>
);

const FiRefreshCw = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
    </svg>
);

const FiHome = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const FiArrowLeft = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const ErrorPage = ({
    errorCode,
    errorTitle,
    errorMessage,
    showHomeButton = true,
    showBackButton = true,
    showRefreshButton = true
}) => {
    const navigate = useNavigate();
    const error = useRouteError();

    // Use route error data if available, otherwise use props
    const displayErrorCode = errorCode || (error?.status || "404");
    const displayTitle = errorTitle || (error?.statusText || "Page Not Found");
    const displayMessage = errorMessage || (
        error?.data?.message ||
        error?.message ||
        "The page you're looking for doesn't exist or has been moved."
    );

    const handleGoBack = () => navigate(-1);
    const handleRefresh = () => window.location.reload();

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">

                {/* Error Icon */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-error/10 rounded-full mb-6">
                        <FiAlertTriangle className="w-12 h-12 text-error" />
                    </div>
                </div>

                {/* Error Content */}
                <div className="text-center space-y-6 mb-12">
                    {/* Error Code */}
                    <div className="space-y-2">
                        <h1 className="text-8xl md:text-9xl font-bold text-error/20 leading-none">
                            {displayErrorCode}
                        </h1>
                        <div className="relative -mt-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-base-content">
                                {displayTitle}
                            </h2>
                        </div>
                    </div>

                    {/* Error Message */}
                    <p className="text-lg text-base-content/70 max-w-md mx-auto leading-relaxed">
                        {displayMessage}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {showHomeButton && (
                        <Link to="/" className="btn btn-primary btn-lg gap-2 min-w-40">
                            <FiHome className="w-5 h-5" />
                            Go Home
                        </Link>
                    )}

                    {showBackButton && (
                        <button
                            onClick={handleGoBack}
                            className="btn btn-outline btn-lg gap-2 min-w-40"
                        >
                            <FiArrowLeft className="w-5 h-5" />
                            Go Back
                        </button>
                    )}

                    {showRefreshButton && (
                        <button
                            onClick={handleRefresh}
                            className="btn btn-ghost btn-lg gap-2 min-w-40 hover:btn-outline"
                        >
                            <FiRefreshCw className="w-5 h-5" />
                            Refresh
                        </button>
                    )}
                </div>



                {/* Footer */}
                <div className="text-center mt-12 text-base-content/40 text-sm">
                    Error occurred at {new Date().toLocaleString()}
                </div>

            </div>
        </div>
    );
};

export default ErrorPage;