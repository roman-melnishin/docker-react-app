import React from 'react';
import { shallow, mount } from 'enzyme';
import HiringBoardTable from './HiringBoardTable';
import HiringBoardColumn from '../HiringBoardColumn/HiringBoardColumn';
import { mockedData } from '../../../../../api/hiringBoardApi/__mocks__/getApplicants';

const boardConfig = [
  {
    stage: 1,
    title: 'Applied'
  },
  {
    stage: 2,
    title: 'Interviewing'
  },
  {
    stage: 3,
    title: 'Hired'
  }
];

describe('HiringBoardTable.test.js', () => {
  let wrapper;

  it('renders board columns according to config', () => {
    wrapper = shallow(
      <HiringBoardTable
        boardConfig={boardConfig}
        data={mockedData}
        updateData={() => {}}
      />
    );

    expect(wrapper.find(HiringBoardColumn)).toHaveLength(3);
  });

  it('tests getButtonsConfig function', () => {
    expect(wrapper.instance().getButtonsConfig(boardConfig, 0)).toEqual({ prev: false, next: true });
    expect(wrapper.instance().getButtonsConfig(boardConfig, 1)).toEqual({ prev: true, next: true });
    expect(wrapper.instance().getButtonsConfig(boardConfig, boardConfig.length - 1)).toEqual({ prev: true, next: false });
  });

  it('tests getColumnSpecificData function', () => {
    expect(wrapper.instance().getColumnSpecificData(boardConfig, 0)).toHaveLength(2);
    expect(wrapper.instance().getColumnSpecificData(boardConfig, 1)).toHaveLength(1);
    expect(wrapper.instance().getColumnSpecificData(boardConfig, 2)).toHaveLength(2);
  });

  it('tests getColumns function', () => {
    expect(wrapper.instance().getColumns()).toHaveLength(boardConfig.length)
  });

});
