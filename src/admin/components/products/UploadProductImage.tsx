import { useEffect, useRef, type ChangeEvent } from "react";
import { CiImageOn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import type { ProductFormValues } from "../../../interfaces/product";
import { FaTrashAlt } from "react-icons/fa";
import type { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface Props {
  register: UseFormRegister<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  getValues: UseFormGetValues<ProductFormValues>;
}

export const UploadProductImage = ({ register, setValue, watch, errors, getValues }: Props) => {
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const files = watch('files') || [];
  const productImages = watch('images') ?? [];
  const category = watch('category');
  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArr = Array.from(files);
    const currentFiles = getValues('files') || [];
    setValue("files", [...currentFiles, ...filesArr], { shouldValidate: true });
  }

  const handleRemoveImage = (image: string | File) => {
    if (image instanceof File) {
      const updatedFiles = files.filter(file => file.name !== image.name);
      setValue('files', updatedFiles, { shouldValidate: true });
      return;
    }
    const updatedUrls = productImages.filter(url => url !== image);
    setValue("images", updatedUrls, { shouldValidate: true });
  }

  useEffect(() => {
    register('files', {
      validate: () => {
        const images = getValues('images') || [];
        const files = getValues('files') || [];

        if (images.length > 0) return true; 
        if (files.length > 0) return true; 
        return false;
      }
    });
  }, [register, getValues]);

  useEffect(() => {
    setValue('files', [])
  }, [category, setValue])

  useEffect(() => {
    setValue('images', productImages)
  }, [setValue])

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="block text-sm font-medium text-gray-700 ">
          Imagenes guardadas ({productImages.length})
        </div>

        <button type="button" className="bg-blue-300 p-1 rounded hover:bg-blue-400 transition cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <FiPlus className="text-xl" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleImagesChange(e)}
          />
        </button>
      </div>
      {
        productImages.length > 0
          ? <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-8 gap-2">
            {productImages.map((img, id) => (
              <div
                key={id}
                className="relative group rounded-md overflow-hidden border border-gray-200 box-shadow-md"
              >
                <img
                  src={img}
                  alt={`imagen-${id + 1}`}
                  className="w-full h-25 object-cover"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white/90 text-red-600 hover:bg-white rounded-full p-2 shadow-md transition cursor-pointer"
                  aria-label="Eliminar imagen"
                  onClick={() => handleRemoveImage(img)}
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            ))}
          </div>
          : <div
            className={`border-2 flex flex-col items-center text-center border-dashed border-gray-300 rounded-md p-4 md:p-6  text-gray-500 mb-3 cursor-pointer ${errors.files ? 'border-red-400 text-red-400' : ''}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <CiImageOn size={50} />
            <p className="text-sm md:text-md">
              Agregar imagenes
            </p>
          </div>
      }

      {
        files.length > 0 &&
        <div className="mt-5">
          <div className="block text-sm font-medium text-gray-700 mb-1">Imagenes por cargar ({files.length}) </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-8 gap-2">
            {
              files.map((file, index) => (
                <div key={index} className="relative group rounded-md overflow-hidden border border-gray-200 box-shadow-md">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Product"
                    key={index}
                    className="w-full h-25 object-cover"
                  />

                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white/90 text-red-600 hover:bg-white rounded-full p-2 shadow-md transition cursor-pointer"
                    aria-label="Eliminar imagen"
                    onClick={() => handleRemoveImage(file)}
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      }
    </div>
  );
};