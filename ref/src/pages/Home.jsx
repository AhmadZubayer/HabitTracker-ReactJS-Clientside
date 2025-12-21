import React, { useState, useEffect, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import Banner from '../components/Banner';
import TopPlants from '../components/TopPlants';
import CareTips from '../components/CareTips';
import PlantExperts from '../components/PlantExperts';
import BestPlant from '../components/BestPlant';

const Home = () => {
    const { plantData } = useLoaderData();
    const [careTips, setCareTips] = useState([]);
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);

    const plants = useMemo(() => {
        return plantData
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5);
    }, [plantData]);

    const plantOfWeek = useMemo(() => {
        return plantData.reduce((prev, current) => 
            (current.soldThisWeek > prev.soldThisWeek) ? current : prev
        );
    }, [plantData]);

    useEffect(() => {
        Promise.all([
            fetch('/plant-care.json').then(res => res.json()),
            fetch('/gardener-expert.json').then(res => res.json())
        ])
        .then(([careTipsData, expertsData]) => {
            setCareTips(careTipsData);
            setExperts(expertsData);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <Banner />
            <TopPlants plants={plants} />
            <CareTips careTips={careTips} />
            <PlantExperts experts={experts} />
            <BestPlant plantOfWeek={plantOfWeek} />
        </div>
    );
};

export default Home;