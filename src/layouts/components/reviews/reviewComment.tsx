import ReviewRating from './reviewRating';

interface Props {
  review: {
    avatar: string;
    name: string;
    date: string;
    rating: number;
    comment: string;
  }
}

export default function ReviewComment({
  review
}: Props) {

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6 transition-all hover:shadow-md">
      <div className="flex items-center mb-4">
        {/* <div className="w-22 h-22  overflow-hidden mr-4 ring-2 ring-gray-100">
          <img 
            alt={`${review.name}'s profile`} 
            src={review.avatar} 
            className="w-full h-full object-cover" 
          />
        </div> */}
        <div>
          <h3 className="font-semibold text-gray-800">{review.name}</h3>
          <p className="text-xs text-gray-500">{review.date}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <ReviewRating rating={review.rating}/>
      </div>
      
      <p className="text-gray-700 leading-relaxed mb-2">"{review.comment}"</p>
      
      <div className="pt-3 flex justify-between items-center border-t border-gray-100 mt-4">
        <span className="text-xs text-gray-500">Verified Purchase</span>
        <div className="flex space-x-2">
          <button className="text-xs text-gray-500 flex items-center hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            Helpful
          </button>
          <button className="text-xs text-gray-500 flex items-center hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};