import RestaurantNavBar from '../components/RestaurantNavBar';
import Menu from '../components/Menu';
import db from '@/lib/db';

export const metadata = {
  title: 'Menu - OpenTable',
};

const fetchMenu = async (slug: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) throw new Error('Cannot find Restaurant');

  return restaurant.items;
};

const RestaurentMenuPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const menu = await fetchMenu(params.slug);

  return (
    <div className='bg-white w-[100%] rounded p-3 shadow'>
      <RestaurantNavBar slug={params.slug} />
      <Menu menu={menu} />
    </div>
  );
};

export default RestaurentMenuPage;
