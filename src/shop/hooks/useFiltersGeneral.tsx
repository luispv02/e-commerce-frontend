import { useEffect, useState, type ChangeEvent } from "react";
import { useSearchParams } from "react-router";

export const useFiltersGeneral = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const currentOrderBy = searchParams.get('order') || 'any';
  const currentPrice = searchParams.get('price');
  const currentCategory = searchParams.get('category');
  const [minPrice, maxPrice] = currentPrice ? currentPrice.split("-") : ["", ""];
  const [prices, setPrices] = useState({
    min: minPrice,
    max: maxPrice
  })

  const handleOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const orderBy = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('order', orderBy);
    setSearchParams(newSearchParams)
  }

  const handleChangePrices = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrices(prev => ({
      ...prev,
      [name]: value
    })) 
  }

  const handlePrices = () => {
    const formatted = `${prices.min || ''}-${prices.max || ''}`;

    const newSearchParams = new URLSearchParams(searchParams);
    if (!prices.min && !prices.max) {
      newSearchParams.delete('price');
    } else {
      newSearchParams.set('price', formatted);
    }
    setSearchParams(newSearchParams)
  }

  useEffect(() => {
    setPrices({ min: "", max: "" });
  }, [currentCategory])
  

  return {
    currentOrderBy,
    prices,

    handleOrderChange,
    handleChangePrices,
    handlePrices
  }
};