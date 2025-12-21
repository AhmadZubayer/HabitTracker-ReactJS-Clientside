import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import banner1 from '../assets/banner-images/1.jpg';
import banner2 from '../assets/banner-images/2.jpg';
import banner3 from '../assets/banner-images/3.jpg';
import banner4 from '../assets/banner-images/4.jpg';
import banner5 from '../assets/banner-images/5.jpg';
import banner6 from '../assets/banner-images/6.jpg';
import banner7 from '../assets/banner-images/7.jpg';

const Banner = () => {
    const [bannerSlides, setBannerSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    const bannerImages = {
        '/banner-images/1.jpg': banner1,
        '/banner-images/2.jpg': banner2,
        '/banner-images/3.jpg': banner3,
        '/banner-images/4.jpg': banner4,
        '/banner-images/5.jpg': banner5,
        '/banner-images/6.jpg': banner6,
        '/banner-images/7.jpg': banner7
    };

    useEffect(() => {
        axios.get('/banner-content.json')
            .then(res => setBannerSlides(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section className="relative max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-[440px]">
                    <span className="loading loading-spinner loading-xl text-green-600"></span>
                </div>
            </section>
        );
    }

    return (
        <section className="relative max-w-7xl mx-auto px-4 py-8">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                }}
                navigation={{
                    prevEl: '.custom-prev',
                    nextEl: '.custom-next',
                }}
                loop={true}
                className="rounded-3xl overflow-hidden shadow-lg"
                style={{ height: '440px' }}
            >
                {bannerSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full w-full">
                            <img
                                src={bannerImages[slide.image]}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent flex items-center">
                                <div className="text-white px-12 max-w-2xl">
                                    <h1 className="text-5xl font-bold mb-4">
                                        {slide.title}
                                    </h1>
                                    <p className="text-xl mb-2 font-medium">
                                        {slide.slogan}
                                    </p>
                                    <p className="text-base mb-6 opacity-90">
                                        {slide.description}
                                    </p>
                                    <Link
                                        to="/allPlants"
                                        className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all border border-white/30"
                                    >
                                        See collection
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
     
            <div className="absolute bottom-6 right-6 flex items-center gap-3 z-10">
                <button className="custom-prev w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                
                <div className="custom-pagination flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full shadow-lg"></div>
                
                <button className="custom-next w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                
                <button 
                    className="swiper-pause-button w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                    onClick={(e) => {
                        const swiper = e.currentTarget.closest('.max-w-7xl').querySelector('.swiper').swiper;
                        if (swiper.autoplay.running) {
                            swiper.autoplay.stop();
                            e.currentTarget.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
                        } else {
                            swiper.autoplay.start();
                            e.currentTarget.innerHTML = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>';
                        }
                    }}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default Banner;