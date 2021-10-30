import React, { Component } from 'react'
import Icons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import Search from './search'
const SearchStack = createStackNavigator();

const SearchComponent = (props) => {
    const { navigation } = props
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen
                name="Search Product"
                component={(prop) => <Search {...prop} />}
                options={{
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <Icons.Button
                                name="ios-menu"
                                size={25}
                                backgroundColor='#ffffff'
                                color='#333333'
                                onPress={() => navigation.openDrawer()}
                            />
                        </View>
                    )
                }}
            />
        </SearchStack.Navigator>

    )
}


const mapStateToProps = (props) => {
    const { products } = props;
    return {
        product_list: products.product_list
    };
};

export default connect(mapStateToProps, {})(SearchComponent);
