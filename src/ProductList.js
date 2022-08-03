// import './App.css';

import { useSelector } from 'react-redux';
import Product from './Product';
import { EmojiSadIcon } from '@heroicons/react/outline';

function ProductList() {
  const products = useSelector(state => state.general.products);
  const selectedProductIds = useSelector(state => state.general.selectedProducts.map(product => product.id));

  return (
    <div className="grow">
      {!products.length ? (
        <div className="flex gap-2 items-center">
          <EmojiSadIcon className="w-8 h-8 text-gray-400" />
          <span>Keine Produkte gefunden</span>
        </div>
      ) : (
        ''
      )}
      {products.map((product, index) => (
        <Product
          key={index}
          data={product}
          selected={selectedProductIds.includes(product.id)}
        />
      ))}
    </div>
  );
}

export default ProductList;
