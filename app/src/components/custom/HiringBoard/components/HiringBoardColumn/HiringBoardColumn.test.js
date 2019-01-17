import React from 'react';
import { shallow, mount } from 'enzyme';
import HiringBoardColumn from './HiringBoardColumn';
import { mockedData } from '../../../../../api/hiringBoardApi/__mocks__/getApplicants';

const stage = {
  stage: 2,
  title: 'Interviewing'
};

const buttonsConfig = {
  prev: true,
  next: true
};

describe('HiringBoardColumn.test.js', () => {
  let wrapper;

  it('tests getTitle function', () => {
    wrapper = mount(
      <HiringBoardColumn
        stage={stage}
        buttonsConfig={buttonsConfig}
        data={mockedData}
        updateData={() => {}}
      />
    );

    expect(wrapper.instance().getTitle().props.children).toBe(wrapper.props().stage.title);
  });

  it('tests getContent function', () => {
    expect(wrapper.instance().getContent()).toHaveLength(mockedData.length);
  });
});
