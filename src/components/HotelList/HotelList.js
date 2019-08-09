import React from 'react';
import PropTypes from 'prop-types';

const HotelList = ({ hotels = [] }) => (
  <div className="hotel-list">
    {hotels.map(hotel => {
      const {
        id,
        hotelStaticContent = {},
        lowestAveragePrice = {},
        rewards = {},
      } = hotel;
      const { mainImage: { url = '' } = {}, name = '', neighborhoodName } =
        hotelStaticContent || {};
      const { symbol, amount } = lowestAveragePrice || {};
      const { miles } = rewards || {};
      return (
        <div className="hotel-card" key={id}>
          <div
            className="image"
            style={{
              backgroundImage: `url(${url})`,
            }}
          />
          <div className="hotel-details">
            <div className="hotel-name">{name}</div>
            <div className="location">{neighborhoodName}</div>
          </div>
          <div className="price-details">
            <span className="price">
              <span
                dangerouslySetInnerHTML={{
                  __html: symbol,
                }}
              />
              {amount}
            </span>
            <span className="rewards">{miles} miles</span>
            <button className="button">Select</button>
          </div>
        </div>
      );
    })}
  </div>
);

HotelList.propTypes = {
  hotels: PropTypes.array,
};

export default HotelList;
