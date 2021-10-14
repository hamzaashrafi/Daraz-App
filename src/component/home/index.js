import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Home';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import { useTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = () => {
    const { colors } = useTheme();
    return <Tab.Navigator initialRouteName="Home" activeColor="#fff" screenOptions={{ tabBarColor: colors.themeColor }}>
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarBadge: 3,
                // tabBarColor: colors.themeColor,
                tabBarIcon: ({ color }) => (<Icon name="ios-home" color={color} size={26} />)
            }}
        />
        <Tab.Screen
            name="Search"
            component={DetailsScreen}
            options={{
                tabBarLabel: 'Search',
                // tabBarColor: colors.themeColor,
                tabBarIcon: ({ color }) => (<Icon name="ios-search" color={color} size={26} />)
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarLabel: 'Profile',
                // tabBarColor: colors.themeColor,
                tabBarIcon: ({ color }) => (<Icon name="ios-person" color={color} size={26} />)
            }}
        />
        <Tab.Screen
            name="Favourite"
            component={ProfileScreen}
            options={{
                tabBarLabel: 'Favourite',
                // tabBarColor: colors.themeColor,
                tabBarIcon: ({ color }) => (<Icon name="ios-heart" color={color} size={26} />)
            }}
        />
        <Tab.Screen
            name="Cart"
            component={ExploreScreen}
            options={{
                tabBarLabel: 'Cart',
                // tabBarColor: colors.themeColor,
                tabBarIcon: ({ color }) => (<Icon name="ios-cart" color={color} size={26} />)
            }}
        />
    </Tab.Navigator>
}

export default MainTabScreen;
