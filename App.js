import React, { Component } from 'react'
import store from './src/public/redux/store'
import { Provider } from 'react-redux';
import MainNavigator from './src/public/navigators/MainNavigator'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}

export default App