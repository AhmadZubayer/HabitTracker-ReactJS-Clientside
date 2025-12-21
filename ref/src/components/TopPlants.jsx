import React from 'react';
import { Link } from 'react-router';
import PlantCard from './PlantCards';

const TopPlants = ({ plants }) => {
    return (
        <section className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
                Top Rated Indoor Plants
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {plants.map((plant) => (
                    <PlantCard key={plant.plantId} plant={plant} className="mt-5" />
                ))}
            </div>

            <div className="text-center mt-10">
                <Link to="/allPlants" className="btn-primary">
                    View All Plants
                </Link>
            </div>
        </section>
    );
};

export default TopPlants;