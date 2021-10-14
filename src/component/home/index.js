import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
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
            name="Notifications"
            component={DetailsScreen}
            options={{
                tabBarLabel: 'Updates',
                // tabBarColor: colors.themeColor,
                tabBarIcon: ({ color }) => (<Icon name="ios-notifications" color={color} size={26} />)
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
            name="Explore"
            component={ExploreScreen}
            options={{
                tabBarLabel: 'Explore',
                // tabBarColor: colors.themeColor,
                tabBarIcon: ({ color }) => (<Icon name="ios-aperture" color={color} size={26} />)
            }}
        />
    </Tab.Navigator>
}

export default MainTabScreen;
