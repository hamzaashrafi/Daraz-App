import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Orders from './orders'
const OrderDetails = (props) => {
    const { navigation } = props
    const { colors } = useTheme();
    const orderStack = createStackNavigator();
    return (
        <orderStack.Navigator>
            <orderStack.Screen
                name="Order history"
                component={Orders}
                options={{
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <Icon.Button
                                name="ios-arrow-back-outline"
                                size={25}
                                backgroundColor={colors.background}
                                color={colors.text}
                                onPress={() => navigation.goBack()}
                            />
                        </View>
                    )
                }}
            />
        </orderStack.Navigator>
    )
}

export default OrderDetails