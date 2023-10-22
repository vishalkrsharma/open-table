import RestaurantNavBar from '../components/RestaurantNavBar';
import Menu from '../components/Menu';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const metadata = {
  title: 'Menu - OpenTable',
};

const fetchMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) throw new Error();

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
