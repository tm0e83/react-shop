import './App.css';

import { useState, useEffect, useCallback } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { ChevronRightIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/outline';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setProductsTotal } from './generalSlice';
import HomePage from './Homepage';
import CategoryPage from './CategoryPage';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const pageIndex = useSelector(state => state.general.pageIndex);
  const productsPerPage = useSelector(state => state.general.productsPerPage);
  const dispatch = useDispatch();

  const loadProducts = useCallback(() => {
    fetch(`https://dummyjson.com/products/search?limit=${productsPerPage}&skip=${pageIndex * productsPerPage}&q=${searchValue}`)
      .then(res => res.json())
      .then(json => {
        dispatch(setProducts(json.products));
        dispatch(setProductsTotal(json.total));
      });
  }, [dispatch, pageIndex, productsPerPage, searchValue]);

  useEffect(() => {
    if (!searchValue.trim().length) {
      loadProducts();
    }
  }, [loadProducts, searchValue]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=${productsPerPage}`)
      .then(res => res.json())
      .then(json => {
        dispatch(setProducts(json.products));
        dispatch(setProductsTotal(json.total));
      });
  }, [dispatch, productsPerPage]);

  return (
    <div>
      <header className="header">
        <div className="flex justify-between items-center gap-5 max-w-7xl mx-auto">
          <div className="p-3 text-sky-400 text-lg">
            <span className="font-black">React</span> <span className="font-thin">Shop</span>
          </div>
          <nav className="grow p-3 ml-10">
            <ul className="list-none flex gap-8">
              <Link to="/">Startseite</Link>
              <Link to="/category">Kategorie</Link>
            </ul>
          </nav>
          <div className="p-3 flex gap-8">
            <a href=".">
              <ShoppingCartIcon className="w-5 h-5" />
            </a>
            <a href=".">
              <UserIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="bg-sky-600 pt-16 pb-10">
          <h1 className="text-3xl text-center mb-20 text-white">React shop - Wir haben alles!</h1>
          <div className="max-w-lg mx-auto flex">
            <input
              className="border grow px-4 py-2 outline-none rounded-l-3xl"
              type="text"
              placeholder="Produkt suchen..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={e => (e.key === 'Enter' ? loadProducts() : {})}
            />
            <button
              className="bg-orange-400 px-3 py-2 rounded-r-3xl"
              onClick={loadProducts}
            >
              <ChevronRightIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </header>
      <main className="pt-5 pb-10">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="category"
            element={<CategoryPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
