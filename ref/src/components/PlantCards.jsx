import React from 'react';
import { Link } from 'react-router';

const PlantCard = ({ plant, className = "" }) => {
    return (
        <div className={`bg-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:bg-green-50 transition-all overflow-hidden group ${className}`}>
            <div className="mt-5 h-48 flex items-center justify-center p-3 relative overflow-hidden">
                <img 
                    loading="lazy"
                    src={plant.image} 
                    alt={plant.plantName} 
                    className="w-[110%] h-[110%] object-cover rounded-3xl group-hover:scale-105 transition-transform"
                />
            </div>
            
            <div className="p-4">
                <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-1">
                    {plant.plantName}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xl font-bold text-green-700">${plant.price}</p>
                    
                    <div className="flex items-center gap-1 text-base text-gray-600">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{plant.rating}</span>
                    </div>
                </div>
                
                <div className="flex justify-center">
                    <Link to={`/plant/${plant.plantId}`} className="btn-primary text-sm px-8">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PlantCard;