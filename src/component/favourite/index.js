import React, { Component } from 'react'
import { connect } from 'react-redux';

import { SafeAreaView } from 'react-native';
import CardComponent from '../cards/card'
const FavouriteComponent = (props) => {
    const { product_list } = props
    // const product = product_list.filter(item => item.category === props.route.title)
    const product = product_list
    return (
        <SafeAreaView >
            <CardComponent data={product} />
        </SafeAreaView>
    )
}

const mapStateToProps = (props) => {
    const { products } = props;
    return {
        product_list: products.product_list
    };
};

export default connect(mapStateToProps, {})(FavouriteComponent);
