import React from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import Pagination from 'components/pagination/Pagination';
import { setPageIndex } from 'generalSlice';
import { useSelector } from 'react-redux';

const Overview = () => {
  const selectedProducts = useSelector(state => state.general.selectedProducts);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-6 items-start">
        <ProductList />
        {selectedProducts.length ? <Cart /> : ''}
      </div>
      <div className="text-center mt-5">
        <Pagination setPageIndex={setPageIndex} />
      </div>
    </div>
  );
};

export default Overview;
