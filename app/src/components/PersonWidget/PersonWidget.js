import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class PersonWidget extends Component {
  static propTypes = {
    person: PropTypes.object.isRequired,
    buttonsConfig: PropTypes.object.isRequired,
    updateData: PropTypes.func.isRequired,
    stage: PropTypes.object.isRequired
  };

  handleClick = (action) => {
    const { updateData, stage, person } = this.props;

    updateData(person.login.uuid, stage.stage, action)
  };

  render() {
    const { person, buttonsConfig } = this.props;

    return (
      <div>
        <img src={person.picture.thumbnail} width="70" height="70" alt="photo"/>
        <span>{person.name.title}</span>
        <span>{person.name.first}</span>
        <span>{person.name.last}</span>
        { buttonsConfig.prev && <button onClick={() => this.handleClick('prev')}>Prev</button> }
        { buttonsConfig.next && <button onClick={() => this.handleClick('next')}>Next</button> }
      </div>
    );
  }
}

export default PersonWidget;
