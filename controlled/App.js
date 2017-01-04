// @flow

import React from 'react'
import { isChrome, isFirefox, isSafari, isIE, isEdge, isOpera } from './BrowserDetection'

// if now is in composition session
let isOnComposition = false

// for safari use only, innervalue can't setState when compositionend occurred
let isInnerChangeFromOnChange = false

class App extends React.Component {
  state: {inputValue: string, innerValue: string}

  constructor() {
    super()
    this.state = {
      inputValue: '',
      innerValue: '',
    }
  }

  handleChange = (e: Event) => {
     // console.log('change type ', e.type, ', target ', e.target, ', target.value ', e.target.value)

    // Flow check
    if (!(e.target instanceof HTMLInputElement)) return

    if (isInnerChangeFromOnChange) {
      this.setState({ inputValue: e.target.value, innerValue: e.target.value })
      isInnerChangeFromOnChange = false
      return
    }

    // when is on composition, change inputValue only
    // when not in composition change inputValue and innerValue both
    if (!isOnComposition) {
      this.setState({
        inputValue: e.target.value,
        innerValue: e.target.value,
      })
    } else {
      this.setState({ inputValue: e.target.value })
    }
  }

  handleComposition = (e: Event) => {
     // console.log('type ', e.type, ', target ', e.target, ',target.value ', e.target.value, ', data', e.data)

     // Flow check
    if (!(e.target instanceof HTMLInputElement)) return

    if (e.type === 'compositionend') {
      // Chrome is ok for only setState innerValue
      // Opera, IE and Edge is like Chrome
      if (isChrome || isIE || isEdge || isOpera) {
        this.setState({ innerValue: e.target.value })
      }

      // Firefox need to setState inputValue again...
      if (isFirefox) {
        this.setState({ innerValue: e.target.value, inputValue: e.target.value })
      }

      // Safari think e.target.value in composition event is keyboard char,
      //  but it will fired another change after compositionend
      if (isSafari) {
         // do change in the next change event
        isInnerChangeFromOnChange = true
      }

      isOnComposition = false
    } else {
      isOnComposition = true
    }
  }


  render() {
    return (
      <div>
        <div>
          <input
            value={this.state.inputValue}
            placeholder="Controlled input"
            onChange={this.handleChange}
            onCompositionUpdate={this.handleComposition}
            onCompositionEnd={this.handleComposition}
            onCompositionStart={this.handleComposition}
          />
        </div>
        <div>
          <input
            placeholder="Uncontrolled input"
            onChange={this.handleChange}
            onCompositionUpdate={this.handleComposition}
            onCompositionEnd={this.handleComposition}
            onCompositionStart={this.handleComposition}
          />
        </div>
        <h1>
          input: {this.state.inputValue}
        </h1>
        <h1 style={{ color: 'red' }}>
          inner: {this.state.innerValue}
        </h1>
      </div>
    )
  }
}

export default App
