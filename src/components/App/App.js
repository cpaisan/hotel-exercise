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

const App = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    hotelResultService.get().then(response => {
      const { results = {} } = response || {};
      const { hotels = [] } = results || {};
      setHotels(hotels);
    });
  }, []);

  return (
    <div className="app-container">
      <div className="content">
        <HotelSearchForm
          search={search}
          onChange={({ target: { value = '' } }) => setSearch(value)}
        />
        <HotelList hotels={filterHotels(search, hotels)} />
      </div>
    </div>
  );
};

export default App;
