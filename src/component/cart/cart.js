import React from 'react';
import { connect } from 'react-redux'
import { Text, View, FlatList, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { onAddToCart, removeCartData, removeProductInCartData } from '../../store/actions'
import { Button } from 'native-base'

const Cart = (props) => {
    const { cartData, navigation, onAddToCart, removeCartData, removeProductInCartData } = props

    const getTotalPrice = () => {
        let price = 0
        for (let i = 0; i < cartData.length; i++) {
            const element = cartData[i];
            price = price + (element.qty * (element.price - (element.price * element.discount / 100)))
        }
        return price
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.containterStyle}>
                <FlatList
                    data={cartData}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={(index + 1 === cartData.length) ? styles.lastItemStyle : styles.containerStyle}>
                                <Image source={{ uri: item.image }} style={styles.imageStyle} />

                                <View style={styles.textStyle}>
                                    <Text style={{ color: '#2e2f30' }}>{item.name}</Text>
                                    <View style={styles.priceStyle}>
                                        <Text style={{ color: '#2e2f30', fontSize: 12 }}>Rs {item.qty * (item.price - (item.price * item.discount / 100))}</Text>
                                    </View>
                                </View>

                                <View style={styles.counterStyle}>
                                    <Icon.Button
                                        name="ios-remove"
                                        onPress={() => onAddToCart(item, '-')}
                                        size={20}
                                        color='#fff'
                                        backgroundColor='#fff'
                                        style={{ borderRadius: 20, backgroundColor: '#bbb', height: 35, width: 35 }}
                                        iconStyle={{ marginRight: 0, }}
                                    />
                                    <Text style={styles.text}>{item.qty}</Text>
                                    <Icon.Button
                                        name="ios-add"
                                        size={20}
                                        onPress={() => onAddToCart(item)}
                                        color='#fff'
                                        backgroundColor='#fff'
                                        style={{ borderRadius: 20, backgroundColor: '#bbb', height: 35, width: 35 }}
                                        iconStyle={{ marginRight: 0 }}
                                    />
                                    <Icon name="ios-trash" style={{ color: 'gray' }} size={25} onPress={() => removeProductInCartData(item._id)} />
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
            <View style={styles.footerContainerStyle}>
                <View style={styles.totalContainerStyle}>
                    <View style={styles.goodsStyle}>
                        <Icon name="ios-cart" size={20} style={{ marginRight: 8, color: 'black' }} />
                        <Text style={styles.text}>{cartData.length} Items</Text>
                    </View>

                    <View style={styles.totalStyle}>
                        <Text style={styles.text}>Total - </Text>
                        <Text style={styles.text}>Rs {getTotalPrice()}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainerStyle}>
                    <Button
                        background='#009387'
                        onPress={() => removeCartData()}
                        leftIcon={<Icon name="ios-trash-outline" size={20} style={{ color: '#fff' }} />}
                    >
                        Remove all
                    </Button>
                    <View style={styles.checkoutButtonStyle}>
                        <Text style={{ color: '#fff' }}>Order Now</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const mapStateToProps = (props) => {
    const { products } = props;
    return {
        cartData: products.cartData
    };
};

export default connect(mapStateToProps, { onAddToCart, removeCartData, removeProductInCartData })(Cart);

const styles = {
    containerStyle: {
        flexDirection: 'row',
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#e2e2e2',
        padding: 10,
        paddingLeft: 15,
        backgroundColor: '#fff'
    },
    containterStyle: {
        flex: 4,
        backgroundColor: '#DCDCDC'
    },
    lastItemStyle: {
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        paddingLeft: 15,
        backgroundColor: '#fff'
    },
    imageStyle: {
        width: 80,
        height: 50,
        marginRight: 20
    },
    textStyle: {
        flex: 0.7,
        justifyContent: 'center',
    },
    priceStyle: {
        backgroundColor: '#ddd',
        width: 90,
        alignItems: 'center',
        marginTop: 3,
        borderRadius: 3
    },
    counterStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    footerContainerStyle: {
        flex: 1,
        paddingRight: 15,
        paddingLeft: 15,
        borderTopWidth: 1,
        borderColor: '#e2e2e2',
    },
    buttonContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
    },
    closeButtonStyle: {
        backgroundColor: '#7f8c8d',
        padding: 10,
        paddingRight: 30,
        paddingLeft: 30,
        borderRadius: 3,
    },
    checkoutButtonStyle: {
        backgroundColor: '#f39c12',
        padding: 10,
        paddingRight: 60,
        paddingLeft: 60,
        borderRadius: 3,
    },
    totalContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15
    },
    goodsStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'black'
    }
};

