import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SelectedProduct from './SelectedProduct';
import { ArrowCircleRightIcon } from '@heroicons/react/outline';

const CartPage = () => {
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
    <div className="max-w-7xl mx-auto">
      <div className="page-headline">
        <span>Warenkorb</span>
      </div>
      <div className="mb-4">
        <div className="flex flex-col gap-3 mb-3">
          {!products.length ? 'Ihr Warenkorb ist leer.' : ''}
          {products.map((product, index) => (
            <SelectedProduct
              key={index}
              data={product}
            />
          ))}
        </div>
        {products.length ? (
          <div>
            <div className="pt-2 border-t border-slate-300 text-right mb-3 flex justify-end gap-4 text-xl">
              <b>Summe ({products.length} Artikel):</b> <span className="font-black">{formatCurrency(totalPrice())}</span>
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
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CartPage;
