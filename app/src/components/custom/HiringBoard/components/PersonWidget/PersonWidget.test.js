import React from 'react';
import { shallow, mount } from 'enzyme';
import PersonWidget from './PersonWidget';
import { mockedData } from '../../../../../api/hiringBoardApi/__mocks__/getApplicants';

const stage = {
  stage: 3,
  title: 'Hired'
};

const buttonsConfig = {
  prev: false,
  next: true
};

describe('PersonWidget.test.js', () => {
  let person = mockedData[3];
  let updateData = jest.fn();
  let wrapper = mount(
    <PersonWidget
      person={person}
      stage={stage}
      buttonsConfig={buttonsConfig}
      updateData={updateData}
    />
  );

  it('shows person image', () => {
    expect(wrapper.find('img').prop('src')).toEqual(person.picture.medium);
  });

  it('tests buttons', () => {
    expect(wrapper.find('button').length).toBe(1);
    wrapper.setProps({ buttonsConfig:  {
        prev: true,
        next: true
      } });
    expect(wrapper.find('button').length).toBe(2);
  });

  it('tests click', () => {
    wrapper.find('button.prev').simulate('click');
    expect(updateData).toBeCalledWith(person.login.uuid, stage.stage, 'prev');

    wrapper.find('button.next').simulate('click');
    expect(updateData).toBeCalledWith(person.login.uuid, stage.stage, 'next');
  });
});
