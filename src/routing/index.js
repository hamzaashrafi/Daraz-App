import React, { Component } from 'react'
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginComponent, SignupComponent, DrawerContent, MainTabScreen, ProductDetails } from '../component'
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';

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

const Routing = (props) => {
    const { isUserGetting } = props
    if (isUserGetting) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <PaperProvider theme={CustomDefaultTheme}>
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

const mapStateToProps = (props) => {
    const { users } = props;
    return {
        isUserExist: users.isUserExist,
        user: users.user,
        isUserGetting: users.isUserGetting,
    };
};

export default connect(mapStateToProps, {})(Routing);
