
export const DashboardPage = () => {
  return (
     <div className="flex items-center justify-center h-[70vh]">
      <div className="max-w-md mx-auto p-8 rounded-xl shadow-lg bg-white flex flex-col items-center text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          ¡Próximamente!
        </h2>
        <p className="text-gray-500 mb-4">
          Esta sección del panel de administración aún no está disponible.<br/>
          Estamos trabajando para traer nuevas características pronto.
        </p>
        <span className="inline-block bg-indigo-100 text-indigo-600 text-xs px-3 py-1 rounded-full font-semibold">
          Dashboard en desarrollo
        </span>
      </div>
    </div>
  );
};