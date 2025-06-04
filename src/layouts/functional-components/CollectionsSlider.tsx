import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import { Navigation, Pagination, Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonCategory from "./loadings/skeleton/SkeletonCategory";

const CollectionsSlider = ({ collections }: { collections: any }) => {
  const [_, setInit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [collectionsData, setCollectionsData] = useState([]);
  const [loadingCollectionsData, setLoadingCollectionsData] = useState(true);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setCollectionsData(collections);
    setLoadingCollectionsData(false);
  }, [collections]);

  if (loadingCollectionsData) {
    return <SkeletonCategory />;
  }

  return (
    <div
      className="relative collections-slider-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={24}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
          bulletClass: "collections-pagination-bullet",
          bulletActiveClass: "collections-pagination-bullet-active",
        }}
        onInit={() => setInit(true)}
        className="collections-swiper"
      >
        {collectionsData?.map((item: any, index: number) => {
          const { title, handle, image } = item;
          const productCount = item.products?.edges?.length || 0;
          
          return (            <SwiperSlide key={handle}>
              <div className="group relative overflow-hidden">
                {/* Modern Card Container */}
                <div className="collection-card">
                  
                  {/* Animated Background Pattern */}
                  <div className="collection-floating-elements">
                    <div className="floating-circle-1"></div>
                    <div className="floating-circle-2"></div>
                  </div>

                  {/* Collection Badge */}
                  <div className="collection-badge">
                    {productCount} items
                  </div>

                  {/* Image Container with Modern Effects */}
                  <div className="collection-image-container">
                    {image && (
                      <>
                        <img
                          src={image.url}
                          width={400}
                          height={400}
                          alt={title}
                          className="collection-image"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="collection-gradient-overlay"></div>
                        
                        {/* Floating Decorative Elements */}
                        <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300 delay-100"></div>
                        <div className="absolute bottom-6 right-6 w-2 h-2 bg-teal-400/60 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300 delay-200"></div>
                      </>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="relative z-10 text-center space-y-3">
                    {/* Collection Title */}
                    <h3 className="collection-title">
                      <a
                        href={`/products?c=${handle}`}
                        className="relative inline-block after:absolute after:inset-0"
                      >
                        {title}
                      </a>
                    </h3>

                    {/* Product Count with Icon */}
                    <div className="collection-product-count">
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
                      </svg>
                      <span>{productCount} Products</span>
                    </div>

                    {/* Explore Button */}
                    <div className="collection-explore-button">
                      <a
                        href={`/products?c=${handle}`}
                        className="collection-explore-link"
                      >
                        <span>Explore Collection</span>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="collection-bottom-accent"></div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}        {/* Navigation Arrows */}
        <div
          className={`hidden lg:block w-full absolute top-1/2 -translate-y-1/2 z-20 px-6 ${
            isHovered
              ? "opacity-100 transition-opacity duration-300 ease-in-out"
              : "opacity-0 transition-opacity duration-300 ease-in-out"
          }`}
        >
          <div
            ref={prevRef}
            className="collection-nav-arrow collection-nav-prev"
          >
            <HiOutlineArrowNarrowLeft size={20} />
          </div>
          <div
            ref={nextRef}
            className="collection-nav-arrow collection-nav-next"
          >
            <HiOutlineArrowNarrowRight size={20} />
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default CollectionsSlider;