import './Filters.css';
import { useId } from 'react';
import { useFilters } from '../hooks/useFilters';

function Filters() {
  const { setFilters, filters } = useFilters();

  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangeMinPrice = (event) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      minPrice: event.target.value
    }));
  };

  const handleChangeCategory = (event) => {
    setFilters((oldFilters) => ({
      ...oldFilters,
      category: event.target.value
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          id={minPriceFilterId}
          type="range"
          min="0"
          max="1000"
          onChange={handleChangeMinPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}></label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          <option value="laptops">Portatiles</option>
          <option value="smartphones">Móviles</option>
        </select>
      </div>
    </section>
  );
}

export default Filters;
