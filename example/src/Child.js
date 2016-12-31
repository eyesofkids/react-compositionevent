// @flow

import React from 'react'

import Cinput from './Cinput'

class Child extends React.Component {

  handleChange = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) {
      this.props.onItemInput(e)
    }
  }

  render() {
    return (
      <div>
        <Cinput placeholder={this.props.placeholder} onChange={this.handleChange}/>
      </div>
    )
  }
}

Child.propTypes = {
  placeholder: React.PropTypes.string.isRequired,
  onItemInput: React.PropTypes.func.isRequired,
}

export default Child
