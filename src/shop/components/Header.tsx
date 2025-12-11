import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router';
import { CgShoppingCart } from 'react-icons/cg';
import { ModalUserMenu } from './ModalUserMenu';
import { useShopStore } from '../store/shop.store';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [isAuthenticated] = useState(true); // !Solo como prueba
  const [iconCartAnimation, setIconCartAnimation] = useState(false);
  const { pathname } = useLocation();

  const totalItems = useShopStore((state) => state.totalItems())

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key)
    if (e.key !== 'Enter') return;

    const query = (inputRef.current?.value)?.trim();
    const newSearchParams = new URLSearchParams();
    if (!query) {
      newSearchParams.delete('query');
    } else {
      newSearchParams.set('query', query);
    }
    setSearchParams(newSearchParams);
  }

  useEffect(() => {
    if(totalItems === 0) return;

    setIconCartAnimation(true);

    const timeout = setTimeout(() => {
      setIconCartAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    }
  }, [totalItems])

  return (
    <header className='px-4'>
      <div className="flex items-center gap-4 justify-between h-16">

        <Link to="/">
          <h2>E-commerce</h2>
        </Link>

        <div className="flex flex-1 gap-1 justify-end items-center">
          <input
            key={query}
            ref={inputRef}
            name='search'
            type="text"
            placeholder="Buscar productos"
            onKeyDown={handleSearch}
            defaultValue={query}
            className='w-full md:w-100 md:mx-auto text-gray-600 text-sm px-2 py-2  border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent  transition-all duration-300'
          />
          

          <div className='hidden md:flex items-center space-x-6'>
            <NavLink to='/cart' className={`relative text-gray-700 hover:text-blue-600 transition-colors ${iconCartAnimation && pathname !== '/cart' ? 'animate-icon-cart' : ''}`}>
              <CgShoppingCart className="w-6 h-6 text-gray-500" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                { totalItems }
              </span>
            </NavLink>

            {isAuthenticated ? (
              <ModalUserMenu />
            ) : (
              <Link to='/auth/login' className="bg-black text-white border px-2 py-1 rounded-lg hover:bg-gray-700 transition-all font-medium text-sm">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};