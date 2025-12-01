import { useSearchParams } from "react-router";
import { categories } from "../../data/categories/categories";
import type { Category } from "../../interfaces/category";


export const Categories = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("category") || "all";


  const handleChangeCaterogy = (category: Category) => {
    
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('category', category);
    setSearchParams(newSearchParams);
  }

  return (
    <div className="flex justify-start gap-4 items-center">
      {
        categories.map((category) => (
          <button
            key={category.path}
            onClick={() => handleChangeCaterogy(category.path)}
            className={`text-sm px-3 py-1 rounded-full cursor-pointer 
              ${selected === category.path ? "bg-black text-white" : "bg-gray-300"}`}
          >
            {category.label}
          </button>
        ))
      }

    </div >
  );
};