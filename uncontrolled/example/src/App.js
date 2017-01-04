// @flow

import React from 'react'

import Cinput from './Cinput'
import Child from './Child'

class App extends React.Component {
  state: {inputValue: string}
  constructor() {
    super()
    this.state = {
      inputValue: '',
    }
  }

  handleChange = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        inputValue: e.target.value,
      })
    }
  }

  render() {
    return (
      <div>
        <div>
          <input placeholder="Normal input" onChange={this.handleChange}/>
        </div>
        <div>
          <Cinput placeholder="Cinput(in it)" onChange={this.handleChange}/>
        </div>
        <div>
          <Child placeholder="Cinput(in Child)" onItemInput={this.handleChange}/>
        </div>
        <h1>
          {this.state.inputValue}
        </h1>
      </div>
    )
  }
}

export default App
