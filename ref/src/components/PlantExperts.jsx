import React from 'react';

const PlantExperts = ({ experts }) => {
    return (
        <section className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-center text-black mb-10">
                Meet Our Green Experts
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {experts.map(expert => (
                    <div key={expert.id} className="bg-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:bg-green-50 transition-all overflow-hidden">
                        <figure className="h-64 overflow-hidden">
                            <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                        </figure>
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-bold text-black mb-2">{expert.name}</h3>
                            <p className="text-gray-600 text-sm">{expert.specialization}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PlantExperts;