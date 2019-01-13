import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import HiringBoardColumn from '../HiringBoardColumn/HiringBoardColumn';

const Wrapper = styled.div`
  display: flex;
`;

class HiringBoardTable extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    updateData: PropTypes.func.isRequired,
    boardConfig: PropTypes.array.isRequired
  };

  getButtonsConfig(stages, index) {
    return {
      prev: index !== 0,
      next: index !== stages.length - 1
    }
  }

  getColumnSpecificData(stages, index) {
    const { data } = this.props;

    if (index === 0) {
      return data.filter(person => !person.hiringStage || person.hiringStage === 1)
    } else {
      const columnStageNumber = stages.find(stage => stage.stage === index + 1).stage;
      return data.filter(person => person.hiringStage === columnStageNumber);
    }
  }

  getColumns() {
    const stages = this.props.boardConfig;

    return stages.map((stage, idx) => {
      return (
        <HiringBoardColumn
          key={stage.title}
          stage={stage}
          buttonsConfig={this.getButtonsConfig(stages, idx)}
          data={this.getColumnSpecificData(stages, idx)}
          updateData={this.props.updateData}
        />
      );
    })
  }

  render() {
    return (
      <Wrapper>
        { this.getColumns()}
      </Wrapper>
    );
  }
}

export default HiringBoardTable;
