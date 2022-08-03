import { useDispatch } from 'react-redux';
import { removeProductFromBasket } from './generalSlice';

function Product({ data }) {
  const dispatch = useDispatch();

  const formattedPrice = () => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(data.price);
  };

  return (
    <div className="flex gap-3">
      <div className="min-w-[50px] max-w-[50px]">
        <img
          className="max-w-full"
          src={data.thumbnail}
          alt={data.title}
        />
      </div>
      <div className="grow">
        <div className="flex gap-3 justify-between">
          <div className="font-bold">{data.title}</div>
          <div className="font-black">{formattedPrice()}</div>
        </div>
        <div>
          <button
            onClick={() => dispatch(removeProductFromBasket(data))}
            className="text-orange-400 bg-transparent"
          >
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
