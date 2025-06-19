import type { Product } from "@/lib/shopify/types";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroSlider = ({ products }: { products: Product[] }) => {
  return (
    <div className="hero-slider-wrapper">
      <Swiper
        pagination={{
          clickable: true,
          bulletClass: "modern-pagination-bullet",
          bulletActiveClass: "modern-pagination-bullet-active",
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={1000}
        loop={true}
        modules={[Pagination, Autoplay, EffectFade]}
        className="hero-swiper"
      >
        {products?.map((item: Product, index: number) => (
          <SwiperSlide key={item.id}>
            <div className="relative overflow-hidden">
              {/* Background with gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-teal-900/40 z-10"></div>
              
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10 z-5 ">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent transform rotate-12 scale-150"></div>
              </div>              <div className="relative z-20 min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[85vh] flex items-center py-8 sm:py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
                    
                    {/* Content Section */}
                    <div className="text-center lg:text-left order-2 lg:order-1 space-y-4 sm:space-y-6 lg:space-y-8">
                      {/* Badge/Tag */}
                      <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white border border-white/20">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        New Arrival
                      </div>

                      {/* Main Heading */}
                      <div className="space-y-2 sm:space-y-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white leading-tight sm:leading-tight lg:leading-tight">
                          <span className="block opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                            {item.title?.split(' ').slice(0, Math.ceil(item.title.split(' ').length / 2)).join(' ')}
                          </span>
                          <span className="block bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                            {item.title?.split(' ').slice(Math.ceil(item.title.split(' ').length / 2)).join(' ')}
                          </span>
                        </h1>
                      </div>

                      {/* Description */}
                      <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-sm sm:max-w-md lg:max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                        Discover premium quality products that combine innovation with style. Experience the difference.
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                        {item.handle && (
                          <a
                            href={`products/${item.handle}`}
                            className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/25 hover:scale-105 transform text-sm sm:text-base"
                          >
                            <span className="relative z-10">Shop Now</span>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </a>                        )}
                      </div>

                      {/* Stats/Features */}
                      <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start text-white/80 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Premium Quality</span>
                        </div>
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Fast Delivery</span>
                        </div>
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                          </svg>
                          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Secure Payment</span>
                        </div>
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="order-1 lg:order-2 relative max-w-md sm:max-w-lg lg:max-w-none mx-auto lg:mx-0">
                      <div className="relative group">
                        {/* Floating elements - responsive sizes */}
                        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 lg:-top-6 lg:-right-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full opacity-20 animate-float"></div>
                        <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 lg:-bottom-8 lg:-left-8 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-15 animate-float-delayed"></div>
                        
                        {/* Main product image */}
                        {item.featuredImage && (
                          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl transform transition-transform duration-700 group-hover:scale-105">
                            <img
                              src={item.featuredImage.url}
                              className="w-full h-auto object-cover aspect-square sm:aspect-auto"
                              width={600}
                              height={500}
                              alt={item.title}
                            />
                            {/* Image overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        )}

                        {/* Decorative elements */}
                        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full scale-125 sm:scale-150 blur-2xl sm:blur-3xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>              {/* Background pattern overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd">                      <g fill="#ffffff" fillOpacity="0.02">
                        <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
