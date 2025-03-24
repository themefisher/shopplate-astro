interface Props {
  reviews: {
    avatar: string;
    name: string;
    date: string;
    rating: number;
    comment: string;
  }[]
}

export default function ReviewProgress({
  reviews
}: Props) {

  let ratings = [0,0,0,0,0,0];
  let ratingsPercentage = [0,0,0,0,0,0];

  reviews.map(review => {  
    ratings[review.rating]++;
  });

  for(let i = 1; i < 6; i++){
    ratingsPercentage[i] = Math.trunc((ratings[i] * 100) / reviews.length);
  }
  
  return (
    <>
      {[5, 4, 3, 2, 1].map((star) => (
        <div key={star} className="flex items-center mb-2">
          <div className="flex">
            <p className="mb-0 font-bold">{star}</p>
            <svg className="text-yellow-400 w-5 h-5 flex-shrink-0 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-3">
            <div 
              className="bg-yellow-400 h-2.5 rounded-full" 
              style={{width: `${ratingsPercentage[star]}%`}}
            ></div>
          </div>
          <div>
            <div>
              <span className="text-sm font-bold">{ratingsPercentage[star]}%</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};