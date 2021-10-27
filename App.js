import React, { Component } from 'react'
import { connect, Provider } from 'react-redux';
import store from './src/store'
import Routing from './src/routing'
import { NativeBaseProvider, Box } from 'native-base';
import { StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth'
import { signout, resetSigninUserState, getProducts, getCartDate } from './src/store/actions'
import { getAppStorage } from './src/shared';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }


  async componentDidMount() {
    store.dispatch(getProducts())
    auth().onAuthStateChanged(async userAuth => {
      console.log("userAuth ", userAuth)
      if (userAuth) {
        if (userAuth.emailVerified) {
          store.dispatch(resetSigninUserState(userAuth))
        } else {
          store.dispatch(signout())
        }
      }
    });
    const cartData = await getAppStorage('cartData') || []
    store.dispatch(getCartDate(cartData))

  }


  render() {
    return (
      <Provider store={store}>
        <StatusBar style="auto" />
        <NativeBaseProvider >
          <Routing />
        </NativeBaseProvider>
      </Provider>
    )
  }
}

export default App;
