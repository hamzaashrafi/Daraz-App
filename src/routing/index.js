import React, { Component, useEffect } from 'react'
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginComponent, SignupComponent, DrawerContent, MainTabScreen, ProductDetails } from '../component'
import { connect } from 'react-redux';
import { getOrders, getProducts } from '../store/actions'
import { View, ActivityIndicator } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from 'react-native-paper';
const Drawer = createDrawerNavigator();

const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        background: '#ffffff',
        text: '#333333',
        themeColor: '#009387'
    }
}

class Routing extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    static getDerivedStateFromProps = (props, state) => {
        const { getOrders, isUserExist, user, getProducts } = props
        const obj = {}
        if (!state.ishitVarifiedApi && isUserExist) {
            if (isUserExist) {
                getOrders({ userid: user._id })  // get orders
            }
            obj.ishitVarifiedApi = true
        }
        if (!state.ishitApi) {
            getProducts() // get products
            obj.ishitApi = true
        }
        return obj;
    };

    render() {
        const { isUserGetting, isProductGetting } = this.props
        return (
            <PaperProvider theme={CustomDefaultTheme}>
                <Spinner
                    visible={isUserGetting || isProductGetting}
                    textContent={'Loading...'}
                    textStyle={{ color: 'white' }}
                />
                <NavigationContainer theme={CustomDefaultTheme}>
                    <Drawer.Navigator
                        initialRouteName="Home"
                        drawerContent={props => <DrawerContent {...props} />}
                        screenOptions={{ headerShown: false }}
                    >
                        <Drawer.Screen name="Home" component={MainTabScreen} />
                        <Drawer.Screen name="Login" component={LoginComponent} />
                        <Drawer.Screen name="Signup" component={SignupComponent} />
                        <Drawer.Screen name="Details" component={ProductDetails} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </PaperProvider>
        )
    }
}
const mapStateToProps = (props) => {
    const { users, products } = props;
    return {
        isUserExist: users.isUserExist,
        user: users.user,
        isUserGetting: users.isUserGetting,
        isProductGetting: products.isProductGetting,
    };
};

export default connect(mapStateToProps, { getOrders, getProducts })(Routing);
