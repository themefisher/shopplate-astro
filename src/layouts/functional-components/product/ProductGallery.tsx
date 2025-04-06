import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/lib/styles.min.css';
import type { Swiper as TSwiper } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonProductThumb from "../loadings/skeleton/SkeletonProductThumb";

export interface ImageItem {
  url: string;
  altText: string;
  width: number;
  height: number;
}

const ProductGallery = ({ images }: { images: ImageItem[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<TSwiper | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [loadingThumb, setLoadingThumb] = useState(true);
  const [picUrl, setPicUrl] = useState(images.length > 0 ? images[0].url : "");

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const altTextArray = images.map((item) => item.altText);
  const filteredImages = images.filter(
    (item) => item.altText === altTextArray[activeIndex]
  );

  // Listen to URL changes using popstate and polling
  useEffect(() => {
    const updateStateFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get("color");

      if (searchParam) {
        const foundIndex = altTextArray.indexOf(searchParam);
        if (foundIndex !== -1) {
          setActiveIndex(foundIndex);
          setPicUrl(images[foundIndex].url);
        }
      }
      setLoadingThumb(false);
    };

    // Initial check on component mount
    updateStateFromURL();

    // Listen for back/forward button events (popstate)
    window.addEventListener("popstate", updateStateFromURL);

    // Polling to detect manual URL changes
    const polling = setInterval(() => {
      updateStateFromURL();
    }, 500);

    // Cleanup event listener and polling
    return () => {
      window.removeEventListener("popstate", updateStateFromURL);
      clearInterval(polling);
    };
  }, [altTextArray, images]);

  const handleSlideChange = (swiper: TSwiper) => {
    setActiveIndex(swiper.activeIndex);
    setPicUrl(filteredImages[swiper.activeIndex]?.url);
  };

  const handleThumbSlideClick = (clickedUrl: string) => {
    const foundIndex = filteredImages.findIndex(
      (item) => item.url === clickedUrl
    );
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
      setPicUrl(clickedUrl);
    }
  };

  if (loadingThumb) {
    return <SkeletonProductThumb />;
  }

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSlideChange={handleSlideChange}
        >
          {filteredImages.map((item) => (
            <SwiperSlide key={item.url}>
              <InnerImageZoom
                src={item.url}
                zoomSrc={item.url}
                width={722}
                height={623}
                zoomType="hover"
                className="mb-6 border border-border dark:border-border/40 rounded-md max-h-[623px]"
              />
            </SwiperSlide>
          ))}
          <div
            className={`hidden lg:block w-full absolute top-1/2 -translate-y-1/2 z-10 px-6 text-text-dark ${isHovered
              ? "opacity-100 transition-opacity duration-300 ease-in-out"
              : "opacity-0 transition-opacity duration-300 ease-in-out"
              }`}
          >
            <div
              ref={prevRef}
              className="p-2 lg:p-4 rounded-md bg-body cursor-pointer shadow-sm absolute left-4"
            >
              <HiOutlineArrowNarrowLeft size={24} />
            </div>
            <div
              ref={nextRef}
              className="p-2 lg:p-4 rounded-md bg-body cursor-pointer shadow-sm absolute right-4"
            >
              <HiOutlineArrowNarrowRight size={24} />
            </div>
          </div>
        </Swiper>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {filteredImages.map((item) => (
          <SwiperSlide key={item.url}>
            <div
              onClick={() => handleThumbSlideClick(item.url)}
              className={`rounded-md cursor-pointer overflow-hidden ${picUrl === item.url
                ? "border border-darkmode-border dark:border-yellow-500"
                : "border border-border dark:border-border/40"
                }`}
            >
              <img
                src={item.url}
                alt={item.altText}
                width={168}
                height={146}
                className="max-h-[146px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductGallery;
