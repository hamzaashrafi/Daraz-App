import React, { Component } from 'react'
import { connect, Provider } from 'react-redux';
import store from './src/store'
import Routing from './src/routing'
import { NativeBaseProvider, Box } from 'native-base';
import { StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth'
import { signout, resetSigninUserState, getProducts, getCartDate } from './src/store/actions'
import { getAppStorage } from './src/shared';
import { LogBox } from 'react-native';
import RNBootSplash from "react-native-bootsplash";
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }


  async componentDidMount() {
    setTimeout(() => {
    RNBootSplash.hide()
    }, 1000);
    LogBox.ignoreLogs(['Setting a timer for a long period of time'])
    auth().onAuthStateChanged(async userAuth => {
      console.log("userAuth ", userAuth)
      if (userAuth) {
        if (userAuth.emailVerified) {
          store.dispatch(resetSigninUserState(userAuth))
        } else {
          store.dispatch(signout())
        }
      }x  
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
