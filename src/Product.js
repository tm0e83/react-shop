// import './Product.css';

import { StarIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { addProductToBasket } from './generalSlice';
import { CheckIcon } from '@heroicons/react/solid';

function AddButton({ data }) {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(addProductToBasket(data))}
      className="button"
    >
      In den Einkaufswagen
    </button>
  );
}

function SelectedMessage() {
  return (
    <div className="px-3 py-2 border border-green-500 inline-flex itemc-center gap-2 text-green-500">
      <span>Im Warenkorb</span>
      <CheckIcon className="w-5 h-5" />
    </div>
  );
}

function Product({ data, selected }) {
  const formattedPrice = () => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(data.price);
  };

  const rating = () => {
    const numfullStars = Math.round(data.rating);
    const numEmptyStars = 5 - numfullStars;

    return (
      <div className="flex gap-1">
        {[...Array(numfullStars)].map((star, index) => (
          <StarIcon
            key={index}
            className="w-5 h-5 text-amber-400"
          />
        ))}
        {[...Array(numEmptyStars)].map((star, index) => (
          <StarIcon
            key={index}
            className="w-5 h-5 text-gray-300"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex gap-3 mb-8">
      <div className="grow max-w-[125px]">
        <img
          className="max-w-full"
          src={data.thumbnail}
          alt={data.title}
        />
      </div>
      <div className="grow">
        <div className="font-bold">
          {data.brand} {data.title}
        </div>
        <div>{rating()}</div>
        <div>{data.description}</div>
        <div className="font-black text-2xl mb-1">{formattedPrice()}</div>
        <div>{selected ? <SelectedMessage /> : <AddButton data={data} />}</div>
      </div>
    </div>
  );
}

export default Product;
