import React from 'react';
import { shallow } from 'enzyme';

import HotelList from './HotelList';

const hotelListArray = [
  {
    id: '907',
    rewards: {
      miles: 10000,
    },
    lowestAveragePrice: {
      currency: 'USD',
      symbol: '&#36;',
      amount: 579.0,
    },
    hotelStaticContent: {
      hotelId: 907,
      languageCode: 'en',
      mainImage: {
        category: 'EXTERIOR',
        url:
          'http://d2whcypojkzby.cloudfront.net/imageRepo/2/0/68/56/314/ExteriorCarsGone_S.jpg',
        source: 'SOURCE1',
      },
      name: 'Omni Chicago Hotel & Suites Magnificent Mile',
      neighborhoodName: 'Magnificent Mile',
      address: {
        line1: '676 North Michigan Avenue',
        line2: null,
        city: 'Chicago',
        stateName: 'Illinois',
        stateCode: 'IL',
        countryName: 'United States',
        countryCode: 'US',
        zipCode: '60611',
        latitude: 41.89475,
        longitude: -87.62465,
        timeZoneId: 'America/Chicago',
      },
      stars: 4,
      rating: 9,
      numberOfReviews: 685,
      brandCode: '1324',
      brandName: 'Omni Hotels',
      propertyType: 204,
      propertyTypeName: 'Hotel',
    },
  },
];

describe('<HotelList/>', () => {
  it('renders a list of hotels', () => {
    const wrapper = shallow(<HotelList hotels={hotelListArray} />);
    expect(wrapper.find('.hotel-card').length).toEqual(1);
    expect(wrapper.find('.hotel-name').text()).toEqual(
      'Omni Chicago Hotel & Suites Magnificent Mile',
    );
    expect(wrapper.find('.location').text()).toEqual('Magnificent Mile');
    expect(wrapper.find('.price').text()).toEqual('579');
    expect(wrapper.find('.rewards').text()).toEqual('10000 miles');
  });
});
