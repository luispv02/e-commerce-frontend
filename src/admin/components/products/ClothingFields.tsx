import { useState } from "react";
import type { Filter, FilterOption } from "../../../interfaces/filters";


export const ClothingFields = ({ category }: { category: Filter[] }) => {

  const [tallas, setTallas] = useState<string[]>([]);
  const [colores, setColores] = useState<string[]>([]);
  const [genero, setGenero] = useState<string>('man')
  const [tipo, setTipo] = useState<string>('shirts')

  const handleSizeColor = (filter: Filter, value: string) => {
    const isColor = filter.filterKey === "color";
    const list = isColor ? colores : tallas;
    const setList = isColor ? setColores : setTallas;

    const updated = list.includes(value)
      ? list.filter(v => v !== value)
      : [...list, value];

    setList(updated);
  };

  const handleSelect = (filter: Filter, value: string) => {
    if (filter.filterKey === 'gender') setGenero(value);
    if (filter.filterKey === 'clothingType') return setTipo(value);
  }
  

  const isOptionSelected = (filterKey: string, optionId: string) => {
    return (filterKey === 'color' ? colores : tallas).includes(optionId);
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
                <div className="flex flex-wrap gap-2">
                  {
                    c.options.map(option => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSizeColor(c, option.id)}
                        className={`px-4 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${isOptionSelected(c.filterKey, option.id)
                          ? "bg-blue-400 text-white border border-blue-500 shadow-md"
                          : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:bg-blue-100"
                          }`}
                      >
                        {c.filterKey === 'color' && <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: option.hex }} />}
                        {option.label}
                      </button>
                    ))
                  }
                </div>
              ) : (
                <select
                  id={c.filterKey}
                  name={c.filterKey}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300"
                  onChange={(e) => handleSelect(c, e.target.value)}
                >
                  {
                    c.options.map(option => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))
                  }
                </select>
              )
            }
          </div>
        ))
      }
    </div>
  );
};