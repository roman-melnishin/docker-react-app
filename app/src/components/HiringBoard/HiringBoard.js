import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HiringBoardFilters from '../HiringBoardFilters/HiringBoardFilters';
import HiringBoardTable from '../HiringBoardTable/HiringBoardTable';

class HiringBoard extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const { data } = await axios.get('https://randomuser.me/api/?nat=gb&results=5');

    this.setState({
      data: data.results
    });
  }

  getFiltersConfig() {
    return [
      {
        field: 'city',
        type: 'input'
      },
      {
        field: 'name',
        type: 'input'
      }
    ]
  }

  getBoardConfig() {
    return [
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
  }

  getUpdatedStageNumber(currentStageNumber, action) {
    return action === 'next' ? currentStageNumber + 1 : currentStageNumber - 1;
  }

  updateData = (personId, currentStage, action) => {
    const filteredData = this.state.data.filter(person => person.login.uuid !== personId);
    const personToUpdate = this.state.data.find(person => person.login.uuid === personId);

    personToUpdate.hiringStage = this.getUpdatedStageNumber(currentStage, action);

    this.setState({
      data: [...filteredData, personToUpdate]
    })
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        {
          data.length === 0
            ? <span>Loading...</span>
            : (
              <React.Fragment>
                <HiringBoardFilters filters={this.getFiltersConfig()} />
                <HiringBoardTable
                  boardConfig={this.getBoardConfig()}
                  data={this.state.data}
                  updateData={this.updateData}
                />
              </React.Fragment>
            )
        }
      </div>
    );
  }
}

export default HiringBoard;
