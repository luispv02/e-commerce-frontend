import type { Filter } from "../../../interfaces/filters";
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { ClothingProduct, ProductFormValues, Size } from "../../../interfaces/product";

interface Props {
  category: Filter[];
  register: UseFormRegister<ProductFormValues>
  setValue: UseFormSetValue<ProductFormValues>
  watch: UseFormWatch<ProductFormValues>
  errors: FieldErrors<ProductFormValues>;
}

export const ClothingFields = ({ category, register, setValue, watch, errors }: Props) => {
  const sizes = watch("sizes") || [];
  const colors = watch("colors") || [];

  const handleSizeColor = (filterKey: string, value: string) => {
    if (filterKey === 'size') {
      const updatedSizes = sizes.includes(value as Size)
        ? sizes.filter(s => s !== value)
        : [...sizes, value as Size];

      setValue("sizes", updatedSizes, { shouldValidate: true });
    }
    if (filterKey === 'color') {
      const updatedColors = colors.includes(value)
        ? colors.filter(c => c !== value)
        : [...colors, value];
      setValue("colors", updatedColors, { shouldValidate: true });
    }
  };

  const isOptionSelected = (filterKey: string, optionId: string) => {
    if (filterKey === 'size') return sizes.includes(optionId as Size);
    if (filterKey === 'color') return colors.includes(optionId);
    return false;
  }

  return (
    <div className="border-t border-gray-200 pt-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Información adicional - Ropa</h3>

      {
        category.map(c => (
          <div key={c.filterKey}>
            <label htmlFor={c.filterKey} className="block text-sm font-medium text-gray-700 mb-1">{c.title}</label>

            {
              (c.filterKey === 'size' || c.filterKey === 'color') ? (
                <>
                  <input
                    type="hidden"
                    {...register(c.filterKey === 'size' ? 'sizes' : 'colors', { required: "Este campo es requerido" })}
                  />

                  <div className="flex flex-wrap gap-2">
                    {
                      c.options.map(option => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleSizeColor(c.filterKey, option.id)}
                          className={`px-4 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${isOptionSelected(c.filterKey, option.id)
                            ? "bg-blue-400 text-white border border-blue-500 shadow-md"
                            : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:bg-blue-100"
                            }`}
                        >
                          {c.filterKey === 'color' && <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: option.hex }} />}
                          <span>{option.label}</span>
                        </button>
                      ))
                    }
                  </div>
                  {c.filterKey === 'color' && errors.colors && <p className="text-red-500 text-sm ml-2">Selecciona al menos un color</p>}
                  {c.filterKey === 'size' && errors.sizes && <p className="text-red-500 text-sm ml-2">Selecciona al menos una talla</p>}
                </>
              ) : (
                <>
                  <select
                    {...register(c.filterKey as keyof ClothingProduct, { required: true })}
                    className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 ${errors[c.filterKey as keyof ClothingProduct] ? 'border-red-400' : ''}`}
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    {
                      c.options.map(option => (
                        <option key={option.id} value={option.id}>{option.label}</option>
                      ))
                    }
                  </select>
                </>
              )
            }
          </div>
        ))
      }
    </div>
  );
};