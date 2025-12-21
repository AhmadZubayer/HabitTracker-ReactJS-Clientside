import React from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
  const bannerSlides = [
    {
      title: 'Build Better Habits',
      description: 'Track your daily habits and achieve your goals one day at a time',
      image: '/banner-images/1.jpg',
      cta: 'Get Started',
      link: '/signup'
    },
    {
      title: 'Stay Consistent',
      description: 'Maintain your streak and watch your progress grow every single day',
      image: '/banner-images/2.jpg',
      cta: 'Browse Habits',
      link: '/browse-habits'
    },
    {
      title: 'Achieve Your Goals',
      description: 'Join our community and discover habits that will transform your life',
      image: '/banner-images/3.jpg',
      cta: 'Explore Now',
      link: '/browse-habits'
    }
  ];

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
        className="rounded-3xl overflow-hidden shadow-2xl"
        style={{ height: '500px' }}
      >
        {bannerSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center">
                <div className="text-white px-12 text-center max-w-4xl">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
                    {index === 0 ? (
                      <>
                        Build Better{' '}
                        <span className="text-[#1085F1]">
                          <Typewriter
                            words={['Habits', 'Routines', 'Goals', 'Life']}
                            loop={0}
                            cursor
                            cursorStyle="_"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                          />
                        </span>
                      </>
                    ) : (
                      slide.title
                    )}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-block px-8 py-4 bg-[#1085F1] text-white rounded-full font-semibold text-lg hover:bg-[#0d6ec4] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="absolute bottom-6 right-6 flex items-center gap-3 z-10">
        <button className="custom-prev w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all hover:scale-110">
          <svg className="w-6 h-6 text-[#1085F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="custom-pagination flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full shadow-lg"></div>
        
        <button className="custom-next w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all hover:scale-110">
          <svg className="w-6 h-6 text-[#1085F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Banner;
