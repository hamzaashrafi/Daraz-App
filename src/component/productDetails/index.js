import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Details from './details'
const ProductDetails = (props) => {
    const { navigation } = props
    const { colors } = useTheme();
    const productStack = createStackNavigator();
    return (
        <productStack.Navigator>
            <productStack.Screen
                name="Product Details"
                component={Details}
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
        </productStack.Navigator>
    )
}

export default ProductDetails