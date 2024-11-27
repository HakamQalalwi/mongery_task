import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center">
                <div className="loader border-t-4 border-indigo-500 rounded-full w-16 h-16 animate-spin"></div>
                <p className="mt-4 text-gray-500 dark:text-gray-300 text-lg font-medium">Loading...</p>
            </div>
            <style jsx>{`
                .loader {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner;
