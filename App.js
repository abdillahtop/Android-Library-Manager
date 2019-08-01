import React, { Component } from 'react'
import axios from 'axios'
import store from './src/public/redux/store'
import { Provider } from 'react-redux';
import MainNavigator from './src/public/navigators/MainNavigator'

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