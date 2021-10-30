import React, { Component } from 'react'
import Icons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {
    Input,
    Icon,
    Center,
} from 'native-base';
import { SafeAreaView, View, Text } from 'react-native';
import CardComponent from '../cards/card'


class Search extends Component {

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
            <SafeAreaView style={{ marginBottom: 100 }}>
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
                {(data && data.length)
                    ? <CardComponent data={data} navigation={navigation} />
                    : <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 250 }}><Text style={{ color: 'red' }}>Not Availabe</Text></View>}
            </SafeAreaView>
        )
    }
}


const mapStateToProps = (props) => {
    const { products } = props;
    return {
        product_list: products.product_list
    };
};

export default connect(mapStateToProps, {})(Search);
