import React from 'react';
import Reviews from '../reviews/reviewRating';

// Define the data structure
interface Testimonial {
  id: number;
  rating: number;
  content: string;
  author: {
    name: string;
    avatar: string;
  }
}

interface TestimonialsData {
  hero: {
    title: string;
    description: string;
    buttonText: string;
  };
  section: {
    title: string;
    description: string;
  };
  testimonials: Testimonial[];
}

interface Props {
  pageHeaderBgImg: string;
  pageHeaderMinVh: string;
  data: TestimonialsData;
}

export default function TestimonialsGrid({
  pageHeaderBgImg,
  pageHeaderMinVh,
  data
}: Props) {
  return (
    <section>
      {/* Hero section with background image */}
      <div 
        className="relative rounded-t-lg bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${pageHeaderBgImg})`, 
          minHeight: pageHeaderMinVh 
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Content */}
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex justify-center">
            <div className="max-w-3xl text-center pt-16 pb-12">
              <h1 className="text-4xl font-bold mb-4">{data.hero.title}</h1>
              <p className="text-lg mb-8 px-4 md:px-12">{data.hero.description}</p>
              <button className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors">
                <svg className="mr-2" width="15" height="15" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.00002 3.4999C4.00002 2.34011 4.94023 1.3999 6.10002 1.3999C6.63788 1.3999 7.12849 1.6021 7.50002 1.93463C7.87158 1.6021 8.36214 1.3999 8.90002 1.3999C10.0599 1.3999 11 2.34011 11 3.4999C11 3.74535 10.9579 3.98096 10.8805 4.1999H11.7C12.4732 4.1999 13.1 4.8267 13.1 5.5999C13.1 6.3731 12.4732 6.9999 11.7 6.9999H8.20002V6.2999C8.20002 5.91331 7.88663 5.5999 7.50002 5.5999C7.11343 5.5999 6.80002 5.9133 6.80002 6.2999V6.9999H3.30002C2.52683 6.9999 1.90002 6.3731 1.90002 5.5999C1.90002 4.8267 2.52683 4.1999 3.30002 4.1999H4.11952C4.04213 3.98096 4.00002 3.74535 4.00002 3.4999ZM6.80002 4.1999V3.4999C6.80002 3.11331 6.48662 2.7999 6.10002 2.7999C5.71343 2.7999 5.40002 3.11331 5.40002 3.4999C5.40002 3.8865 5.71343 4.1999 6.10002 4.1999H6.80002ZM8.90002 4.1999C9.28663 4.1999 9.60003 3.8865 9.60003 3.4999C9.60003 3.11331 9.28663 2.7999 8.90002 2.7999C8.51341 2.7999 8.20002 3.11331 8.20002 3.4999V4.1999H8.90002Z" fill="white"/>
                  <path d="M6.79998 7.69995H2.59998V11.2C2.59998 11.9732 3.22678 12.6 3.99998 12.6H6.79998V7.69995Z" fill="white"/>
                  <path d="M8.20001 12.6H11C11.7732 12.6 12.4 11.9732 12.4 11.2V7.69995H8.20001V12.6Z" fill="white"/>
                </svg>
                {data.hero.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials section */}
      <div className="container mx-auto px-4 py-8 mb-12">
        <h3 className="text-2xl font-bold mt-4 mb-2">{data.section.title}</h3> 
        <p className="mb-8 max-w-xl">{data.section.description}</p>
        
        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <Reviews rating={testimonial.rating.toString()} />
                <p className="mt-4 text-gray-700">{testimonial.content}</p>
                <div className="flex items-center mt-4">
                  <div className="w-10 h-10 mr-3 overflow-hidden rounded-full">
                    <img 
                      src={testimonial.author.avatar} 
                      className="w-full h-full object-cover" 
                      alt={testimonial.author.name}
                    />
                  </div>
                  <h6 className="font-medium">{testimonial.author.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Example usage
export const sampleTestimonialsData: TestimonialsData = {
  hero: {
    title: "Exclusive Discounts for Members",
    description: "The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. For standing out. But the time is now to be okay to be the greatest you.",
    buttonText: "Get your code"
  },
  section: {
    title: "Our customer's opinion",
    description: "Society has put up so many boundaries, so many limitations on what's right and wrong that it's almost impossible to get a pure thought out."
  },
  testimonials: [
    {
      id: 1,
      rating: 4,
      content: "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play this game of life you need to appreciate every moment.",
      author: {
        name: "Alexa Liras",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
      }
    },
    {
      id: 2,
      rating: 5,
      content: "There's nothing I really wanted to do in life that I wasn't able to get good at. That's my skill. I'm not really specifically talented at anything except for the ability to learn. That's what I do. That's what I'm here for. Don't be afraid to be wrong because you can't learn anything from a compliment.",
      author: {
        name: "Laurent Perrier",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
      }
    },
    {
      id: 3,
      rating: 4,
      content: "It really matters and then like it really doesn't matter. What matters is the people who are sparked by it. And the people who are like offended by it, it doesn't matter. Because it's about motivating the doers. Because I'm here to follow my dreams and inspire other people to follow their dreams.",
      author: {
        name: "Michael Levi",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
      }
    },
    {
      id: 4,
      rating: 5,
      content: "I always felt like I could do anything. That's the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can't do anything, you won't do anything. I was taught I could do everything.",
      author: {
        name: "Kylie Peterson",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
      }
    },
    {
      id: 5,
      rating: 4,
      content: "It really matters and then like it really doesn't matter. What matters is the people who are sparked by it. And the people who are like offended by it, it doesn't matter. Because it's about motivating the doers. Because I'm here to follow my dreams and inspire other people to follow their dreams.",
      author: {
        name: "Michael Levi",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
      }
    },
    {
      id: 6,
      rating: 5,
      content: "I always felt like I could do anything. That's the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can't do anything, you won't do anything. I was taught I could do everything.",
      author: {
        name: "Kylie Peterson",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
      }
    }
  ]
};