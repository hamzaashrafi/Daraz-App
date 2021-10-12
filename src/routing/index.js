import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginComponent, SignupComponent, DrawerContent, MainTabScreen } from '../component'
import { connect } from 'react-redux';

const Drawer = createDrawerNavigator();


const Routing = () => {

    return (
        <NavigationContainer >
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
