import { clothesFilters } from "../data/filters/clothes-filters";

const ALL_COLORS = clothesFilters.find(v => v.filterKey === 'colors')?.options || [];

export const getColorLabel = (colorId: string) => {
  if(!colorId) return undefined;  
  return ALL_COLORS.find(color => color.id === colorId)?.label;
}