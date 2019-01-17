import React from 'react';
import HiringBoardFilters from './components/HiringBoardFilters/HiringBoardFilters';
import HiringBoardTable from './components/HiringBoardTable/HiringBoardTable';
import HiringBoard from './HiringBoard';
import { shallow } from 'enzyme';
import { mockedData } from '../../../api/hiringBoardApi/__mocks__/getApplicants';

jest.mock('../../../api/hiringBoardApi/getApplicants');

describe('HiringBoard.test.js', () => {
  let wrapper;

  it('fetches applicants from randomuser and renders them on mount', done => {
    wrapper = shallow(<HiringBoard />);
    expect(wrapper.state('loading')).toEqual(true);

    setTimeout(() => {
      wrapper.update();

      expect(wrapper.state('loading')).toEqual(false);
      expect(wrapper.state('data')).toHaveLength(5);
      expect(wrapper.find(HiringBoardFilters).exists()).toEqual(true);
      expect(wrapper.find(HiringBoardTable).exists()).toEqual(true);
      expect(wrapper.instance().bufferedData).toEqual(wrapper.state('data'));

      done();
    });
  });

  it('tests getUpdatedStageNumber function', () => {
    wrapper = shallow(<HiringBoard />);
    expect(wrapper.instance().getUpdatedStageNumber(1, 'next')).toBe(2);
    expect(wrapper.instance().getUpdatedStageNumber(2, 'prev')).toBe(1);
  });

  it('tests updateData function without active filters', () => {
    wrapper = shallow(<HiringBoard />);
    wrapper.setState({ data: mockedData });
    const person = mockedData[3];
    const personId = person.login.uuid;

    wrapper.instance().updateData(person.login.uuid, 2, 'next');
    expect(wrapper.state('data').find(person => person.login.uuid === personId).hiringStage).toBe(3);
    expect(wrapper.instance().bufferedData).toEqual(wrapper.state('data'));

    wrapper.instance().updateData(person.login.uuid, 3, 'prev');
    expect(wrapper.state('data').find(person => person.login.uuid === personId).hiringStage).toBe(2);
    expect(wrapper.instance().bufferedData).toEqual(wrapper.state('data'));
  });

  it('tests updateData function with active filters', () => {
    wrapper = shallow(<HiringBoard />);
    wrapper.setState({ data: mockedData });
    const person = mockedData[3];
    const personId = person.login.uuid;

    wrapper.instance().activeFilters = [{ 'name.first': 'test' }];
    wrapper.instance().updateData(person.login.uuid, 2, 'next');
    expect(wrapper.state('data').find(person => person.login.uuid === personId).hiringStage).toBe(3);
    expect(wrapper.instance().bufferedData).not.toEqual(wrapper.state('data'));
  });

  it('tests filterData function', () => {
    wrapper = shallow(<HiringBoard />);

    expect(wrapper.instance().activeFilters).toEqual({});
    wrapper.instance().filterData('name.first', 'test');
    expect(wrapper.instance().activeFilters).toEqual({ 'name.first': 'test' });

    wrapper.instance().filterData('name.first', '');
    expect(wrapper.instance().activeFilters).toEqual({});
  });
});
