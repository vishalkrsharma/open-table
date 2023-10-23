import Price from '@/app/components/Price';
import Stars from '@/app/components/Stars';
import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage';
import { Cuisine, Location, PRICE, Review } from '@prisma/client';
import Link from 'next/link';

interface Props {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  price: PRICE;
  location: Location;
  cuisine: Cuisine;
  reviews: Review[];
}

const RestaurantCard = ({ restaurant }: { restaurant: Props }) => {
  const { name, price, cuisine, main_image, location, slug, reviews } = restaurant;

  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(reviews);

    if (rating > 4) return 'Awesome';
    else if (rating <= 4 && rating > 3) return 'Good';
    else if (rating <= 3 && rating > 0) return 'Average';
    else return 'Unrated';
  };

  return (
    <div className='border-b flex pb-5 ml-4'>
      <img
        src={main_image}
        alt='MAIN_IMAGE'
        className='w-44 rounded h-36'
      />
      <div className='pl-5'>
        <h2 className='text-3xl'>{name}</h2>
        <div className='flex items-start'>
          <div className='flex mb-2'>
            <Stars reviews={reviews} />
          </div>
          <p className='ml-2 text-sm'>{renderRatingText()}</p>
        </div>
        <div className='mb-9'>
          <div className='font-light flex text-reg'>
            <Price price={price} />
            <p className='mr-4  capitalize'>{cuisine.name}</p>
            <p className='mr-4 capitalize'>{location.name}</p>
          </div>
        </div>
        <div className='text-red-600'>
          <Link href={`/restaurant/${slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
