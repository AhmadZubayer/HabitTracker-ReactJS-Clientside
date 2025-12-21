import React from 'react';
import { Link } from 'react-router';

const BestPlant = ({ plantOfWeek }) => {
    if (!plantOfWeek) return null;

    return (
        <section className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
                <div className="bg-green-100 rounded-3xl overflow-hidden shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                        <div className="p-12 flex flex-col justify-center">
                            <h2 className="text-4xl font-bold text-black mb-4">
                                Plant of the Week
                            </h2>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                {plantOfWeek.plantName}
                            </h3>
                            <p className="text-gray-700 text-lg mb-4">
                                {plantOfWeek.description}
                            </p>
                            <p className="text-sm text-gray-600 mb-6">
                                {plantOfWeek.soldThisWeek} sold this week!
                            </p>
                            <Link 
                                to={`/plant/${plantOfWeek.plantId}`}
                                className="btn-three w-md text-center"
                            >
                                See details
                            </Link>
                        </div>
                        
                        <div className="h-full min-h-[400px] flex items-center justify-center p-4">
                            <img 
                                src={plantOfWeek.image} 
                                alt={plantOfWeek.plantName}
                                className="w-[78%] h-[78%] object-cover rounded-3xl shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BestPlant;