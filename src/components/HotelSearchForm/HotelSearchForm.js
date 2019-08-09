import React from 'react';
import PropTypes from 'prop-types';

const HotelSearchForm = ({
  onClickReset,
  onChange,
  onPriceSortChange,
  sort = 'recommended',
  search = '',
}) => (
  <div className="filters">
    Hotel name
    <input type="text" className="input" value={search} onChange={onChange} />
    Price
    <select
      name="price-sort"
      className="select"
      value={sort}
      onChange={onPriceSortChange}
    >
      <option value="recommended">Recommended</option>
      <option value="asc">Price low-to-high</option>
      <option value="desc">Price high-to-low</option>
    </select>
    <button className="button" onClick={onClickReset}>
      Reset
    </button>
  </div>
);

HotelSearchForm.propTypes = {
  onClickReset: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onPriceSortChange: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

export default HotelSearchForm;
