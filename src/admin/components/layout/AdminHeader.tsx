import { Link, useNavigate } from 'react-router';
import { MdArrowBackIosNew, MdLogout } from 'react-icons/md';
import { useAuthStore } from '../../../auth/store/auth.store';

export const AdminHeader = () => {

  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

      <div>
        <Link to="/" aria-label='Volver al inicio' className='lg:hidden'>
          <MdArrowBackIosNew className="w-5 h-5" />
        </Link>

      </div>

      <div className='flex gap-2'>
        <div className='px-2 py-1 bg-cyan-200 rounded-full flex items-center justify-center'>
          <span className='text-sm text-gray-600'>{user?.name}</span>
        </div>

        <button className="lg:hidden bg-red-100 border border-red-300 rounded text-[12px] px-2 flex items-center gap-1 text-red-700 cursor-pointer hover:bg-red-200 hover:border-red-400 transition" onClick={handleLogout}>
          Cerrar sesión
          <MdLogout className="text-sm" />
        </button>
      </div>
    </div>
  );
};