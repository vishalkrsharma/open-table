import { ReactNode } from 'react';
import Header from './components/Header';

export const metadata = {
  title: 'Restaurant - OpenTable',
};

const RestaurantLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    slug: string;
  };
}) => {
  return (
    <main>
      <Header title={params.slug} />
      <div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>{children}</div>
    </main>
  );
};

export default RestaurantLayout;
