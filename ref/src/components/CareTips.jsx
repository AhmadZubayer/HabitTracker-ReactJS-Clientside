import React from 'react';

const CareTips = ({ careTips }) => {
    return (
        <section className="bg-green-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-black mb-10">
                    Essential Plant Care Tips
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {careTips.map(tip => (
                        <div key={tip.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                            <figure className="h-64 overflow-hidden">
                                <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                            </figure>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-black mb-2 text-center">{tip.title}</h3>
                                <p className="text-gray-600 text-sm">{tip.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CareTips;