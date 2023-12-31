import Price from '@/app/components/Price';
import { Cuisine, Location, PRICE } from '@prisma/client';
import Link from 'next/link';

const SearchSideBar = async ({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: {
    city?: string;
    cuisine?: string;
    price?: PRICE;
  };
}) => {
  const prices = [
    { price: PRICE.CHEAP, label: <Price price={PRICE.CHEAP} /> },
    { price: PRICE.REGULAR, label: <Price price={PRICE.REGULAR} /> },
    { price: PRICE.EXPENSIVE, label: <Price price={PRICE.EXPENSIVE} /> },
  ];

  return (
    <div className='w-1/5'>
      <div className='border-b pb-4 flex flex-col'>
        <h1 className='mb-2'>Region</h1>
        {locations.length ? (
          locations.map((location) => (
            <Link
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  city: location.name,
                },
              }}
              className='font-light text-reg capitalize'
              key={location.id}
            >
              {location.name}
            </Link>
          ))
        ) : (
          <p className='font-light text-reg'>No locations found.</p>
        )}
      </div>
      <div className='border-b pb-4 mt-3 flex flex-col'>
        <h1 className='mb-2'>Cuisine</h1>
        {cuisines.length ? (
          cuisines.map((cuisine) => (
            <Link
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  cuisine: cuisine.name,
                },
              }}
              className='font-light text-reg capitalize'
              key={cuisine.id}
            >
              {cuisine.name}
            </Link>
          ))
        ) : (
          <p className='font-light text-reg'>No cuisines found.</p>
        )}
      </div>
      <div className='mt-3 pb-4'>
        <h1 className='mb-2'>Price</h1>
        <div className='flex'>
          {prices?.map(({ price, label }, idx) => (
            <Link
              key={idx}
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className='border w-full text-reg font-light rounded-l p-2 flex'
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
