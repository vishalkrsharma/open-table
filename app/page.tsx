import RestaurantCard from '@/app/components/RestaurantCard';
import Header from './components/Header';
import db from '@/lib/db';
import { RestaurantCardType } from '@/types/RestaurantCardType';

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await db.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      reviews: true,
    },
  });

  return restaurants;
};

const HomePage = async () => {
  const restaurants = await fetchRestaurants();

  return (
    <>
      <Header />
      <main>
        <div className='py-3 px-36 mt-10 flex flex-wrap justify-center'>
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
