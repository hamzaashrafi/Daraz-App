import React, { Component } from 'react'
import { connect, Provider } from 'react-redux';
import store from './src/store'
import Routing from './src/routing'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Routing />
      </Provider>
    )
  }
}

export default App;
