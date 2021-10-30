import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Cart from './cart'
import Chechkout from './chechkout'
const CartComponent = (props) => {
    const { navigation } = props
    const { colors } = useTheme();
    const cartStack = createStackNavigator();
    return (
        <cartStack.Navigator>
            <cartStack.Screen
                name="Cart Screen"
                component={Cart}
                options={{
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <Icon.Button
                                name="ios-menu"
                                size={25}
                                backgroundColor={colors.background}
                                color={colors.text}
                                onPress={() => navigation.openDrawer()}
                            />
                        </View>
                    )
                }}
            />
            <cartStack.Screen
                name="Chechkout"
                component={Chechkout}
                options={{
                    title: 'Chechkout',
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <Icon.Button
                                name="ios-arrow-back-outline"
                                size={25}
                                backgroundColor={colors.background}
                                color={colors.text}
                                onPress={() => navigation.navigate('Cart Screen')}
                            />
                        </View>
                    )
                }}
            />
        </cartStack.Navigator>
    )
}

export default CartComponent