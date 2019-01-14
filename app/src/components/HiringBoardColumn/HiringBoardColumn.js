import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PersonWidget from '../PersonWidget/PersonWidget';

const Wrapper = styled.div`
  flex: 1;
`;

class HiringBoardColumn extends Component {
  static propTypes = {
    stage: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    buttonsConfig: PropTypes.object.isRequired,
    updateData: PropTypes.func.isRequired
  };

  getTitle() {
    return <Title>{this.props.stage.title}</Title>
  }

  getContent() {
    const { data, buttonsConfig, updateData, stage } = this.props;

    return data.map((person) => {
      return (
        <PersonWidget
          key={person.login.uuid}
          person={person}
          buttonsConfig={buttonsConfig}
          updateData={updateData}
          stage={stage}
        />
      );
    });
  }

  render() {
    return (
      <Wrapper>
        { this.getTitle() }
        <div>
          { this.getContent() }
        </div>
      </Wrapper>
    );
  }
}

export default HiringBoardColumn;

const Title = styled.div`
  font-weight: normal;
  background: #F4F5F7;
  border-radius: 4px;
  padding: 10px;
  font-size: 15px;
  margin: 0 20px 20px 0;
`;
