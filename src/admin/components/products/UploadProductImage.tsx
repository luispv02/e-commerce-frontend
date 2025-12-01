import { useRef } from "react";
import { CiImageOn } from "react-icons/ci";

export const UploadProductImage = () => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-1">
        Imagenes
      </label>
      <div
        className="border-2 flex flex-col items-center text-center border-dashed border-gray-300 rounded-md p-4 md:p-6  text-gray-500 mb-3 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <CiImageOn size={50} />
        <p className="text-sm md:text-md">
          Agregar imagenes
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
        />
      </div>
    </div>
  );
};