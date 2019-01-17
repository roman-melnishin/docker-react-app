import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import HiringBoardFilters from './components/HiringBoardFilters/HiringBoardFilters';
import HiringBoardTable from './components/HiringBoardTable/HiringBoardTable';
import getApplicants from '../../../api/hiringBoardApi/getApplicants';

class HiringBoard extends Component {
  state = {
    data: [],
    loading: true
  };

  bufferedData = [];

  activeFilters = {};

  async componentDidMount() {
    const data = await getApplicants();

    this.setState({
      data,
      loading: false
    });

    this.bufferedData = data;
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
    const activeFilters = Object.keys(this.activeFilters);
    const filteredData = this.state.data.filter(person => person.login.uuid !== personId);
    const personToUpdate = this.state.data.find(person => person.login.uuid === personId);

    personToUpdate.hiringStage = this.getUpdatedStageNumber(currentStage, action);

    const updatedData = [...filteredData, personToUpdate];

    this.setState({ data: updatedData });

    if (activeFilters.length) {
      const filteredBufferedData = this.bufferedData.filter(person => person.login.uuid !== personId);

      this.bufferedData = [...filteredBufferedData, personToUpdate];
    } else { // without filters
      this.bufferedData = updatedData;
    }
  };

  filterData = (filterPath, value) => {
    let filteredData = [];

    if (value) {
      this.activeFilters[filterPath] = value;
    } else {
      delete this.activeFilters[filterPath];
    }

    const activeFilters = Object.keys(this.activeFilters);

    if (activeFilters.length) {
      filteredData = this.bufferedData.filter(person => {
        let isValid = true;

        activeFilters.forEach(filterPath => {
          if (isValid) {
            isValid = filterPath.split('.').reduce((acum, field) => {
              acum = acum[field];

              return acum;
            }, person).includes(this.activeFilters[filterPath].toLowerCase());
          }
        });

        return isValid;
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
      <Wrapper>
        {
          this.state.loading
            ? <Loader className="loader">Loading...</Loader>
            : (
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
            )
        }
      </Wrapper>
    );
  }
}

export default HiringBoard;

const Wrapper = styled.div`
  width: 60%;
  margin: 100px auto;
  background: #fff;
  padding: 20px;
  font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif;
  border-radius: 7px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border-radius: 50%;
  width: 5em;
  height: 5em;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(0, 63, 107, 0.7);
  border-right: 1.1em solid rgba(0, 63, 107, 0.7);
  border-bottom: 1.1em solid rgba(0, 63, 107, 0.7);
  border-left: 1.1em solid #ffffff;
  transform: translateZ(0);
  animation: ${rotate} 1.1s infinite linear;
  
  ::after {
    border-radius: 50%;
    width: 5em;
    height: 5em;
  }
`;
