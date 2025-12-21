import React from 'react';
import { useLoaderData } from 'react-router';
import PlantCard from '../components/PlantCards';

const AllPlants = () => {
    const { plantData } = useLoaderData();

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-2">All Plants</h2>
            <p className="text-center text-gray-600 mb-10">{plantData.length} plants available</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {plantData.map((plant) => (
                    <PlantCard key={plant.plantId} plant={plant} />
                ))}
            </div>
        </div>
    );
};

export default AllPlants;
