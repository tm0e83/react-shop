import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SelectedProduct from './SelectedProduct';
import { ArrowCircleRightIcon, ShoppingCartIcon } from '@heroicons/react/outline';

const ShoppingBasket = () => {
  const navigate = useNavigate();
  const products = useSelector(state => state.general.selectedProducts);

  const totalPrice = () => {
    return products.reduce((sum, product) => (sum += product.price), 0);
  };

  const formatCurrency = num => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(num);
  };

  return (
    <div className="max-w-[300px] bg-slate-100 text-sm">
      <div className="font-bold px-4 py-2 bg-slate-600 text-white flex gap-2">
        <ShoppingCartIcon className="w-5 h-5" />
        <span>Warenkorb</span>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-3 mb-3">
          {!products.length ? 'Ihr Warenkorb ist leer.' : ''}
          {products.map((product, index) => (
            <SelectedProduct
              key={index}
              data={product}
            />
          ))}
        </div>
        <div className="pt-2 border-t border-slate-300 text-right mb-3 flex justify-between">
          <span>Summe ({products.length} Artikel):</span> <span>{formatCurrency(totalPrice())}</span>
        </div>
        <div>
          <button
            onClick={() => navigate('/buy')}
            className="button w-full flex items-center justify-center gap-1"
          >
            <span>Zur Kasse gehen</span>
            <ArrowCircleRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBasket;
