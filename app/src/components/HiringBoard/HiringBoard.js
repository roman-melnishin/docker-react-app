import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HiringBoardFilters from '../HiringBoardFilters/HiringBoardFilters';
import HiringBoardTable from '../HiringBoardTable/HiringBoardTable';

class HiringBoard extends Component {
  state = {
    data: []
  };

  bufferedData = [];

  async componentDidMount() {
    const { data } = await axios.get('https://randomuser.me/api/?nat=gb&results=5');

    this.setState({
      data: data.results
    });

    this.bufferedData = data.results;
  }

  getFiltersConfig() {
    return [
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

    const updatedData = [...filteredData, personToUpdate];

    this.setState({
      data: updatedData
    });

    this.bufferedData = updatedData;
  };

  filterData = (filterPath, value) => {
    let filteredData = [];

    if (value) {
      filteredData = this.bufferedData.filter(person => {
        return filterPath.split('.').reduce((acum, field) => {
          acum = acum[field];

          return acum;
        }, person).includes(value.toLowerCase());
      });
    } else {
      filteredData = this.bufferedData;
    }

    this.setState({
      data: filteredData
    });
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <HiringBoardFilters
            filterData={this.filterData}
            filtersConfig={this.getFiltersConfig()}
          />
          <HiringBoardTable
            boardConfig={this.getBoardConfig()}
            data={this.state.data}
            updateData={this.updateData}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default HiringBoard;
