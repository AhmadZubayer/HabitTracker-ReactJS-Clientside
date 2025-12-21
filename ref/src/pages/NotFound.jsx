import React from 'react';
import { Link } from 'react-router';
import bgImage from '../assets/register-page/room-interior-design.jpg';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="card-bg w-full mx-auto max-w-md shrink-0 shadow-lg">
                <div className="card-body text-center">
                    <h1 className="text-9xl font-bold text-green-700">404</h1>
                    <h2 className="text-3xl font-bold text-gray-800 mt-4">Not Found</h2>
                    <p className="text-gray-600 mt-4 mb-6">
                        The page you requested does not exist or has been moved.
                    </p>
                    <Link to="/" className="btn-primary mx-auto">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
