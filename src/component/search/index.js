import React, { Component } from 'react'
import Icons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {
    Input,
    Icon,
    Center,
} from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View } from 'react-native';
import CardComponent from '../cards/card'

const SearchStack = createStackNavigator();

class SearchComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            product_list: [],
            isSearched: false,
            searchedProducts: []
        }
    }

    static getDerivedStateFromProps = (props, state) => {
        const { product_list } = props;
        return { product_list };
    };

    onSearch = (event) => {
        const { product_list } = this.state;
        let products = []
        if (event) {
            for (let i = 0; i < product_list.length; i++) {
                const element = product_list[i];
                for (var key in element) {
                    if (element[key] && element[key].toString().toLowerCase().indexOf(event.toLowerCase()) !== -1) {
                        products.push(element);
                        // stop when got value
                        break;
                    }
                }
            }
        } else {
            products = product_list
        }
        console.log('products', products);
        this.setState({ searchedProducts: products, isSearched: true })
    }

    render() {
        const { product_list, searchedProducts, isSearched } = this.state
        const { navigation } = this.props
        console.log('searchedProducts', searchedProducts);
        const data = isSearched ? searchedProducts : product_list
        return (
            <SearchStack.Navigator>
                <SearchStack.Screen
                    name="Search Product"
                    component={() => <SafeAreaView>
                        <Center px="2">
                            <Input
                                placeholder="Search"
                                onChangeText={this.onSearch}
                                InputRightElement={
                                    <Icon
                                        as={<Icons name="ios-search" color={'white'} size={26} />}
                                        size={26}
                                        m="2"
                                        color="muted.400" />} />
                        </Center>
                        {(data && data.length) ? <CardComponent data={data} navigation={navigation} /> : <Center px="2">Not Availabe</Center>}
                    </SafeAreaView>}
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
}


const mapStateToProps = (props) => {
    const { products } = props;
    return {
        product_list: products.product_list
    };
};

export default connect(mapStateToProps, {})(SearchComponent);
