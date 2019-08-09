import React from 'react';
import { shallow } from 'enzyme';

import HotelSearchForm from './HotelSearchForm';

describe('<HotelSearchForm/>', () => {
  let onClickResetMock;
  let onChangeMock;
  let onPriceSortChangeMock;
  let wrapper;
  beforeAll(() => {
    onClickResetMock = jest.fn();
    onChangeMock = jest.fn();
    onPriceSortChangeMock = jest.fn();
  });

  it('renders the component', () => {
    wrapper = shallow(
      <HotelSearchForm
        onClickReset={onClickResetMock}
        onChange={onChangeMock}
        onPriceSortChange={onPriceSortChangeMock}
        sort="recommended"
        search=""
      />,
    );
    expect(wrapper.find('.filters').exists()).toBe(true);
  });

  it('should pass the upstream sort value to the select input', () => {
    wrapper = shallow(
      <HotelSearchForm
        onClickReset={onClickResetMock}
        onChange={onChangeMock}
        onPriceSortChange={onPriceSortChangeMock}
        sort="asc"
        search=""
      />,
    );
    expect(wrapper.find('.select').props().value).toEqual('asc');
  });

  it('should pass the upstream search value to the search input', () => {
    const searchText = 'Foo bar';
    wrapper = shallow(
      <HotelSearchForm
        onClickReset={onClickResetMock}
        onChange={onChangeMock}
        onPriceSortChange={onPriceSortChangeMock}
        sort="asc"
        search={searchText}
      />,
    );
    expect(wrapper.find('.input').props().value).toEqual(searchText);
  });

  it('should call onClickReset when the reset button is clicked', () => {
    wrapper = shallow(
      <HotelSearchForm
        onClickReset={onClickResetMock}
        onChange={onChangeMock}
        onPriceSortChange={onPriceSortChangeMock}
        sort="asc"
        search=""
      />,
    );
    wrapper.find('.button').simulate('click');
    expect(onClickResetMock.mock.calls.length).toBe(1);
  });

  it('should call onChange when a user types into the search input', () => {
    const onChangeEvent = { target: { value: 'Bar baz' } };
    wrapper = shallow(
      <HotelSearchForm
        onClickReset={onClickResetMock}
        onChange={onChangeMock}
        onPriceSortChange={onPriceSortChangeMock}
        sort="asc"
        search=""
      />,
    );
    wrapper.find('.input').simulate('change', onChangeEvent);
    expect(onChangeMock.mock.calls.length).toEqual(1);
    expect(onChangeMock).toHaveBeenCalledWith(onChangeEvent);
  });

  it('should call onPriceSortChange when a new select option is selected', () => {
    const onPriceSortChangeEvent = { target: { value: 'desc' } };
    wrapper = shallow(
      <HotelSearchForm
        onClickReset={onClickResetMock}
        onChange={onChangeMock}
        onPriceSortChange={onPriceSortChangeMock}
        sort="asc"
        search=""
      />,
    );
    wrapper.find('.select').simulate('change', onPriceSortChangeEvent);
    expect(onPriceSortChangeMock.mock.calls.length).toEqual(1);
    expect(onPriceSortChangeMock).toHaveBeenCalledWith(onPriceSortChangeEvent);
  });
});
