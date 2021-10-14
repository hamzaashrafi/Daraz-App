import React, { Component } from 'react'
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginComponent, SignupComponent, DrawerContent, MainTabScreen } from '../component'
import { connect } from 'react-redux';

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

const Routing = () => {

    return (
        <PaperProvider theme={CustomDefaultTheme}>
            <NavigationContainer theme={CustomDefaultTheme}>
                <Drawer.Navigator
                    initialRouteName="Home"
                    drawerContent={props => <DrawerContent {...props} />}
                    screenOptions={{ headerShown: false }}>
                    <Drawer.Screen name="Home" component={MainTabScreen} />
                    <Drawer.Screen name="Login" component={LoginComponent} />
                    <Drawer.Screen name="Signup" component={SignupComponent} />
                    {/* <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} /> */}
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
    };
};

export default connect(mapStateToProps, {})(Routing);
