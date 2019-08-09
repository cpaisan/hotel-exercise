import React, { useState, useEffect } from 'react';
import './App.style.scss';

import hotelResultService from '../../services/hotel-result/hotel-result.service';

// Components
import HotelSearchForm from '../HotelSearchForm';
import HotelList from '../HotelList';

/**
  @param {string} - search string
  @param {array} - array of hotels
  @return {array} - array of hotels filtered by name against the search string
*/
const filterHotels = (search = '', hotels = []) =>
  hotels.filter(({ hotelStaticContent: { name = '' } = {} }) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

/**
    @param {string} - sort string (asc, desc, recommended)
    @param {array} - array of hotels
    @param {array} - array of hotels in the order as received from the API
    @return {array} - array of hotels sorted by asc, desc, or recommended
  */
const sortHotelsByPrice = (sort = 'asc', hotels = [], pristineHotels = []) => {
  // Sort mutates the array so we create a shallow copy
  const sortedHotels = [...hotels];
  if (sort === 'recommended') return pristineHotels;
  if (sort === 'asc')
    return sortedHotels.sort(
      (
        { lowestAveragePrice: { amount: amountA } },
        { lowestAveragePrice: { amount: amountB } },
      ) => {
        if (amountA < amountB) return -1;
        if (amountA > amountB) return 1;
        return 0;
      },
    );
  // return hotels sorted by descending by default
  return sortedHotels.sort(
    (
      { lowestAveragePrice: { amount: amountA } },
      { lowestAveragePrice: { amount: amountB } },
    ) => {
      if (amountA < amountB) return 1;
      if (amountA > amountB) return -1;
      return 0;
    },
  );
};

/**
  @param {function} - function that sets search state
  @param {function} - function that sets sort state
  @return {undefined}
*/
const resetFilters = (setSearch, setSort) => {
  setSearch('');
  setSort('recommended');
};

const App = () => {
  const [pristineHotels, setPristineHotels] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recommended');

  useEffect(() => {
    hotelResultService.get().then(response => {
      const { results = {} } = response || {};
      const { hotels = [] } = results || {};
      setPristineHotels(hotels);
      setHotels(hotels);
    });
  }, []);

  const hotelsSortedByPriceArray = sortHotelsByPrice(
    sort,
    hotels,
    pristineHotels,
  );

  return (
    <div className="app-container">
      <div className="content">
        <HotelSearchForm
          onClickReset={() => resetFilters(setSearch, setSort)}
          onChange={({ target: { value = '' } }) => setSearch(value)}
          onPriceSortChange={({ target: { value } }) => setSort(value)}
          sort={sort}
          search={search}
        />
        <HotelList hotels={filterHotels(search, hotelsSortedByPriceArray)} />
      </div>
    </div>
  );
};

export default App;
