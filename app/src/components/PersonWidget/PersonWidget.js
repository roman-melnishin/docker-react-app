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
      <Wrapper>
        <Container>
          <Image src={person.picture.medium} alt="photo"/>
          <Contacts>
            <div><Text>{person.name.first}</Text> from <Text>{person.location.city}</Text></div>
            <div>Tel: {person.phone}</div>
            {/*<div>{person.email}</div>*/}
          </Contacts>
        </Container>
        <ButtonContainer>
          { buttonsConfig.prev && <Button onClick={() => this.handleClick('prev')}><Chevron className="left" /></Button> }
          { buttonsConfig.next && <Button onClick={() => this.handleClick('next')}><Chevron className="right" /></Button> }
        </ButtonContainer>
      </Wrapper>
    );
  }
}

export default PersonWidget;

const Image = styled.img`
  border-radius: 4px;
  margin: 0 10px 10px 0;
`;

const ButtonContainer = styled.div`
  text-align: right;
`;

const Button = styled.button`
  margin: 0 5px 3px 0;
  cursor: pointer;
  padding: 6px;
  border-radius: 3px;
  
  &:focus {
    outline: none;
  }
  
  &:hover {
    background-color: #F4F5F7;
  }
`;

const Contacts = styled.div`
  font-size: 14px;
  
  div {
    margin-bottom: 5px;
  }
`;

const Wrapper = styled.div`
  margin: 0 20px 20px 0;
  padding: 10px;
  box-shadow: 0px 1px 5px 0px rgba(9, 30, 66, 0.25);
`;

const Text = styled.span`
  text-transform: capitalize;
`;

const Container = styled.div`
  display: flex;
`;

const Chevron = styled.span`
  cursor: pointer;
  position: relative;
  top: -2px;
  ::before {
    border-style: solid;
    border-width: 0.22em 0.22em 0 0;
    content: '';
    display: inline-block;
    height: 1em;
    left: 0.15em;
    position: relative;
    top: 0.15em;
    transform: rotate(-45deg);
    vertical-align: top;
    width: 1em;
  }
  
  &.right::before {
    left: -3px;
    transform: rotate(45deg);
  }
  
  &.left::before {
    left: 3px;
    transform: rotate(-135deg);
  }
`;
