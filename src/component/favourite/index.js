import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, View } from 'react-native';
import CardComponent from '../cards/card'
import { useTheme } from 'react-native-paper';

const FavouriteStack = createStackNavigator();
const FavouriteComponent = (props) => {
    const { product_list, navigation } = props
    const { colors } = useTheme();
    // const product = product_list.filter(item => item.category === props.route.title)
    const product = product_list
    return (
        <FavouriteStack.Navigator>
            <FavouriteStack.Screen
                name="Favourite"
                component={() => <SafeAreaView >
                    <CardComponent data={product} />
                </SafeAreaView>}
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
    const { products } = props;
    return {
        product_list: products.product_list
    };
};

export default connect(mapStateToProps, {})(FavouriteComponent);
