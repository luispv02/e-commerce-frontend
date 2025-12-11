import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { Filter } from "../../../interfaces/filters";
import type { ProductFormValues, TechnologyProduct } from "../../../interfaces/product";

interface Props {
  category: Filter[];
  register: UseFormRegister<ProductFormValues>
  errors: FieldErrors<ProductFormValues>;
}


export const TechFields = ({ category, register, errors }: Props) => {

  return (
    <div className="border-t border-gray-200 pt-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Información adicional - Tecnología</h3>

      {
        category.map(c => (
          <div key={c.filterKey}>
            <label htmlFor={c.filterKey} className="block text-sm font-medium text-gray-700 mb-1">
              {c.title}
            </label>

            <select
              {...register(c.filterKey as keyof TechnologyProduct, { required: true })}
              className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 ${errors[c.filterKey as keyof TechnologyProduct] ? 'border-red-500' : ''}`}
            >
              <option value="" disabled>Selecciona una opción</option>
              {
                c.options.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))
              }
            </select>
          </div>
        ))
      }
    </div>
  );
};