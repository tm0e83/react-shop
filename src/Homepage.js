import React from 'react';
import ProductList from './ProductList';
import ShoppingBasket from './ShoppingBasket';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const selectedProducts = useSelector(state => state.general.selectedProducts);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-6 items-start">
        <ProductList />
        {selectedProducts.length ? <ShoppingBasket /> : ''}
      </div>
      <div className="text-center mt-5">
        <Pagination />
      </div>
    </div>
  );
};

export default HomePage;
