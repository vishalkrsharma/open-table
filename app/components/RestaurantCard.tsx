import { RestaurantCardType } from '@/types/RestaurantCardType';
import Link from 'next/link';
import Price from './Price';
import Stars from './Stars';

interface Props {
  restaurant: RestaurantCardType;
}

const RestaurantCard = ({ restaurant }: Props) => {
  const { id, name, main_image, cuisine, slug, location, price, reviews } = restaurant;

  return (
    <Link href={`/restaurant/${slug}`}>
      <div className='w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer'>
        <img
          src={main_image}
          alt='MAIN_IMAGE'
          className='w-full h-36'
        />
        <div className='p-1'>
          <h3 className='font-bold text-2xl mb-2'>{name}</h3>
          <div className='flex items-start'>
            <Stars reviews={reviews} />
            <p className='ml-2'>
              {reviews.length} review{reviews.length === 1 ? '' : 's'}
            </p>
          </div>
          <div className='flex text-reg font-light capitalize'>
            <p className=' mr-3'>{cuisine.name}</p>
            <Price price={price} />
            <p>{location.name}</p>
          </div>
          <p className='text-sm mt-1 font-bold'>Booked 3 times today</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
