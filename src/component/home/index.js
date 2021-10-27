import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeComponent from './Home';
import { useTheme } from 'react-native-paper';
import { FavouriteComponent, SearchComponent, ProfileComponent, CartComponent } from '../'
import { connect } from 'react-redux';

const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = (props) => {
    const { cartData } = props
    const { colors } = useTheme();
    return <Tab.Navigator initialRouteName="Home" activeColor="#fff" screenOptions={{ tabBarColor: colors.themeColor }}>
        <Tab.Screen
            name="Home"
            component={HomeComponent}
            options={{
                tabBarLabel: 'Home',
                tabBarBadge: 3,
                tabBarIcon: ({ color }) => (<Icon name="ios-home" color={color} size={26} />)
            }}
        />
        <Tab.Screen
            name="Search"
            component={SearchComponent}
            options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color }) => (<Icon name="ios-search" color={color} size={26} />)
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileComponent}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (<Icon name="ios-person" color={color} size={26} />)
            }}
        />
        <Tab.Screen
            name="Favourite"
            component={FavouriteComponent}
            options={{
                tabBarLabel: 'Favourite',
                tabBarIcon: ({ color }) => (<Icon name="ios-heart" color={color} size={26} />)
            }}
        />
        <Tab.Screen
            name="Cart"
            component={CartComponent}
            options={{
                tabBarLabel: 'Cart',
                tabBarBadge: cartData.length || null,
                tabBarIcon: ({ color }) => (<Icon name="ios-cart" color={color} size={26} />)
            }}
        />
    </Tab.Navigator>
}


const mapStateToProps = (props) => {
    const { products } = props;
    return {
        cartData: products.cartData
    };
};

export default connect(mapStateToProps, {})(MainTabScreen);
