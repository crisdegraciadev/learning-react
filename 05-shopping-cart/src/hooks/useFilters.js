import { useContext } from 'react';
import { FilterContext } from '../contexts/filters';

export function useFilters() {
  const { filters, setFilters } = useContext(FilterContext);

  const filterProducts = (products) => {
    return products.filter(({ price, category }) => {
      return (
        filters.minPrice <= price && (filters.category === 'all' || filters.category === category)
      );
    });
  };

  return {
    filterProducts,
    setFilters,
    filters
  };
}
