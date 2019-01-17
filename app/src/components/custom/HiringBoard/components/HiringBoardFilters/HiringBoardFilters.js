import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from '../../../..'

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
        <Label key={filter.field}>
          <Span>{filter.field}</Span>
          <StyledInput
            value={this.state[`${filter.field}Value`]}
            onChange={(e) => this.onChange(filter, e)}
          />
        </Label>
      )
    })
  }

  render() {
    return (
      <Wrapper>
        <Header>Filters</Header>
        { this.getFilters() }
      </Wrapper>
    );
  }
}

export default HiringBoardFilters;

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

const Header = styled.h3`
  color: #172b4d;
  font-size: 29px;
  font-weight: 600;
  font-style: normal;
  line-height: 32px;
  letter-spacing: -.29px;
  margin: 0 0 15px;
`;

const StyledInput = styled(props => <Input {...props} />)`
  border-radius: 3px 3px 3px 3px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1;
  height: 30px;
  max-width: none;
  padding: 5px 24px 5px 10px;
  transition: width 100ms ease-in-out;
  width: 160px;
  background-color: #f4f5f7;
  border: 1px solid #dfe1e6;
  color: #172b4d;

  &:focus {
    background-color: #fff;
    border: 1px solid #4c9aff;
    outline: 0;
    box-shadow: 0 0 0 1px #4c9aff;
  }
`;

const Span = styled.span`
  margin-right: 6px;
  font-size: 14px;
`;

const Label = styled.label`
  margin-right: 15px;
`;
