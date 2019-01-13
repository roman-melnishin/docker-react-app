import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class HiringBoardFilters extends Component {
  static propTypes = {
    filtersConfig: PropTypes.array.isRequired,
    filterData: PropTypes.func.isRequired
  };

  state = this.getInitialState();

  getInitialState() {
    const filters = this.getInitialFiltersState();

    return {
      ...filters
    }
  }

  getInitialFiltersState() {
    return this.props.filtersConfig.reduce((acum, filter) => {
      acum[`${filter.field}Value`] = '';

      return acum;
    }, {});
  }

  onChange(filter, e) {
    this.setState({
      [`${filter.field}Value`]: e.target.value
    });

    this.props.filterData(filter.path, e.target.value);
  }

  getFilters() {
    return this.props.filtersConfig.map(filter => {
      return filter.type === 'input' && (
        <label key={filter.field}>
          {filter.field}
          <input
            value={this.state[`${filter.field}Value`]}
            onChange={(e) => this.onChange(filter, e)}
          />
        </label>
      )
    })
  }

  render() {
    return (
      <div>
        <h3>Filters</h3>
        { this.getFilters() }
      </div>
    );
  }
}

export default HiringBoardFilters;
