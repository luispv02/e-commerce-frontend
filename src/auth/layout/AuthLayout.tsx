import { Outlet } from "react-router";
import bgImage from '../../assets/images/background.jpg';

const AuthLayout = () => {
  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="max-w-5xl min-h-screen  m-auto flex">
        
        <div className="fixed inset-0 bg-black/60"></div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;