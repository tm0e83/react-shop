import './Pagination.css';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const Pagination = ({ setPageIndex }) => {
  const dispatch = useDispatch();
  const productsPerPage = useSelector(state => state.general.productsPerPage);
  const pageIndex = useSelector(state => state.general.pageIndex);
  const productsTotal = useSelector(state => state.general.productsTotal);
  const numberOfPages = productsTotal / productsPerPage;

  return (
    <div className="inline-block select-none">
      {numberOfPages > 1 ? (
        <div className="flex gap-3 mb-3">
          <button
            className="caret-button"
            disabled={pageIndex - 1 < 0}
            onClick={() => dispatch(setPageIndex(pageIndex - 1))}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <div className="page-buttons flex gap-3">
            {[...Array(numberOfPages).keys()].map(i => {
              if (i === 0 || i === numberOfPages - 1 || i === pageIndex - 1 || i === pageIndex || i === pageIndex + 1) {
                return (
                  <div
                    key={i}
                    onClick={() => (i === pageIndex ? {} : dispatch(setPageIndex(i)))}
                    className={`px-2 py-1 leading-none rounded ${i === pageIndex ? ' bg-sky-600 text-white cursor-default' : ' hover:text-orange-400 cursor-pointer'}`}
                  >
                    {i + 1}
                  </div>
                );
              } else {
                if (i === pageIndex - 2 || i === pageIndex + 2)
                  return (
                    <div
                      key={i}
                      className="page-ellipsis"
                    >
                      &#8230;
                    </div>
                  );
              }
              return '';
            })}
          </div>
          <button
            className="caret-button"
            disabled={pageIndex + 2 > numberOfPages}
            onClick={() => dispatch(setPageIndex(pageIndex + 1))}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Pagination;
