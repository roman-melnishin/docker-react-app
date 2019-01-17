import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  state = {
    value: this.props.value
  };


  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }


  render() {
    return (
      <input
        className={this.props.className}
        value={this.state.value}
        onChange={(e) => this.props.onChange(e)}
      />
    );
  }
}

export default Input;
