import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, View } from 'react-native';
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
            if (user.favorite_product.includes(element._id)) {
                products.push(element)
            }
        }
        return products
    }
    return (
        <FavouriteStack.Navigator>
            <FavouriteStack.Screen
                name="Favourite"
                component={() => <CardComponent data={getFavoriteProduct()} navigation={navigation} />}
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
