import React, { Component } from 'react'
import store from './src/public/redux/store'
import { Provider } from 'react-redux';
import MainNavigator from './src/public/navigators/MainNavigator'
import axios from 'axios'

class App extends Component {
  render() {
    axios.defaults.headers.common['authorization'] = 'ThisIsHeader'
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}

export default App