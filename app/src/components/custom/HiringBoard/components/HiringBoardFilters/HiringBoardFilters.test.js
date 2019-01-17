import React from 'react';
import { shallow, mount } from 'enzyme';
import HiringBoardFilters from './HiringBoardFilters';

const filtersConfig = [
  {
    field: 'city',
    path: 'location.city',
    type: 'input'
  },
  {
    field: 'name',
    path: 'name.first',
    type: 'input'
  }
];

const filtersInitialState = {
  'cityValue': '',
  'nameValue': ''
};

describe('HiringBoardFilters.test.js', () => {
  let wrapper;
  let filterData = jest.fn();

  it('tests getFilters function', () => {
    wrapper = mount(
      <HiringBoardFilters
        filtersConfig={filtersConfig}
        filterData={filterData}
      />
    );

    expect(wrapper.find('input')).toHaveLength(filtersConfig.length)
  });

  it('tests getInitialFiltersState function', () => {
    expect(wrapper.instance().getInitialFiltersState()).toEqual(filtersInitialState);
  });

  it('tests onChange function', () => {
    const value = 'test';

    wrapper.instance().onChange(filtersConfig[0], { target: { value } });

    expect(wrapper.state()[filtersConfig[0].field + 'Value']).toBe(value);
    expect(filterData).toBeCalledWith(filtersConfig[0].path, value);
  });
});
