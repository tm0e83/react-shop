import './App.css';

import { useState, useEffect, useCallback } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { ChevronRightIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/outline';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setProductsTotal, setUID } from './generalSlice';
import OverviewPage from './views/Overview/OverviewPage';
import CategoryPage from './views/Category/CategoryPage';
import CartPage from './views/Cart/CartPage';
import BuyPage from './views/Buy/BuyPage';
import UserProfilePage from './views/UserProfile/UserProfilePage';
import LoginPage from './views/Login/LoginPage';
import { getAuth, signOut } from 'firebase/auth';

function App() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const pageIndex = useSelector(state => state.general.pageIndex);
  const productsPerPage = useSelector(state => state.general.productsPerPage);
  const selectedProducts = useSelector(state => state.general.selectedProducts);
  const uid = useSelector(state => state.general.uid);
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

  const login = () => {
    navigate('/login');
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUID(null));
        navigate('/login');
      })
      .catch(() => console.log('failed to logout'));
  };

  return (
    <div>
      <header className="header">
        <div className="flex justify-between items-center gap-5 max-w-7xl px-3 pt-5 pb-2 mx-auto">
          <div className="text-sky-400 text-lg">
            <span className="font-black">React</span> <span className="font-thin">Shop</span>
          </div>
          <nav className="grow ml-10">
            <ul className="list-none flex gap-8">
              <Link to="/">Produkte</Link>
              {/* <Link to="/category">Kategorie</Link> */}
            </ul>
          </nav>
          <div className="flex gap-8">
            {uid ? <button onClick={logout}>Ausloggen</button> : <button onClick={login}>Einloggen</button>}

            <Link
              to="/cart"
              className="relative"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {selectedProducts.length ? (
                <span className="absolute bg-red-700 text-white p-[1px] min-w-[14px] min-h-[14px] text-[9px] rounded-full leading-none flex justify-center items-center -top-[12px] right-0">
                  {selectedProducts.length}
                </span>
              ) : (
                ''
              )}
            </Link>

            {uid ? (
              <Link
                to="/profile"
                className="relative"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="bg-sky-600 px-3 pt-16 pb-10">
          <h1 className="text-3xl text-center text-white">React shop</h1>
          <div className="text-center mb-20 text-white">Dummy-Shop basierend auf React, Redux und Firebase</div>

          <div className="max-w-lg mx-auto flex">
            <input
              className="grow !px-4 !py-2 border-none !rounded-l-3xl !rounded-r-none"
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
      <main className="px-3 pt-5 pb-10">
        <Routes>
          <Route
            path="/"
            element={<OverviewPage />}
          />
          <Route
            path="overview"
            element={<OverviewPage />}
          />
          <Route
            path="category"
            element={<CategoryPage />}
          />
          <Route
            path="cart"
            element={<CartPage />}
          />
          <Route
            path="buy"
            element={<BuyPage />}
          />
          <Route
            path="profile"
            element={<UserProfilePage />}
          />
          <Route
            path="login"
            element={<LoginPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
