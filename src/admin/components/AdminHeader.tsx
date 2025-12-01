import { Link } from 'react-router';
import { MdArrowBackIosNew, MdLogout } from 'react-icons/md';
import logo from '../../assets/images/logo.png'

export const AdminHeader = () => {

  return (
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

      <div>
        <Link to="/" className='lg:hidden'>
          <MdArrowBackIosNew className="w-5 h-5" />
        </Link>

        <img src={logo} alt="logo" width={40} className='hidden lg:block'/>
      </div>

      <div className='flex gap-2'>
        <div className='w-8 h-8 bg-cyan-200 rounded-full flex items-center justify-center'>
          <span className='text-sm'>LP</span>
        </div>

        <button className="lg:hidden bg-red-100 border border-red-300 rounded text-[12px] px-2 flex items-center gap-1 text-red-700 cursor-pointer hover:bg-red-200 hover:border-red-400 transition">
          Cerrar sesión
          <MdLogout className="text-sm" />
        </button>
      </div>
    </div>
  );
};