import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, View, Text } from 'react-native';
import CardComponent from '../cards/card'
import { useTheme } from 'react-native-paper';

const FavouriteStack = createStackNavigator();
const FavouriteComponent = (props) => {
    const { product_list, navigation, user } = props
    const { colors } = useTheme();
    const getFavoriteProduct = () => {
        const products = []
        for (let i = 0; i < product_list.length; i++) {
            const element = product_list[i];
            if (user && user.favorite_product && user.favorite_product.includes(element._id)) {
                products.push(element)
            }
        }
        return products
    }
    return (
        <FavouriteStack.Navigator>
            <FavouriteStack.Screen
                name="Favourite"
                component={() => getFavoriteProduct().length
                    ? <CardComponent data={getFavoriteProduct()} navigation={navigation} />
                    : <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 250, marginHorizontal: 50 }}>
                        <Text style={{ color: 'black' }}>Your Favorite List is Empty</Text>
                        <Text style={{ color: 'gray', textAlign: 'center' }}>Save your favorite product so you can always find it here and make order easier</Text>
                    </View>
                }
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
        </FavouriteStack.Navigator>

    )
}

const mapStateToProps = (props) => {
    const { products, users } = props;
    return {
        product_list: products.product_list,
        user: users.user,
    };
};

export default connect(mapStateToProps, {})(FavouriteComponent);
