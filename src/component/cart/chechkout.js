import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { generateOrderId, toast } from '../../shared'
import { onDispatchOrder } from '../../store/actions'

const Chechkout = (props) => {
    const { cartData, navigation, isUserExist, onDispatchOrder, user } = props
    const [inputValues, setInputValues] = useState({})

    const getTotalPrice = () => {
        let price = 0
        for (let i = 0; i < cartData.length; i++) {
            const element = cartData[i];
            price = price + (element.qty * (element.price - (element.price * element.discount / 100)))
        }
        return price
    }

    const InputHandler = (value, name) => {
        console.log(value, name);
        const data = { ...inputValues }
        data[name] = value
        setInputValues(data)
    }


    const onOrder = () => {
        try {
            if (!isUserExist) throw new Error('Login or SignUp First')
            console.log('inputValues', inputValues);
            if (!inputValues.card || !inputValues.expiration || !inputValues.cvv) {
                throw new Error('Required Fields are missing')
            }
            if (cartData && cartData.length) {
                const items = []
                for (let i = 0; i < cartData.length; i++) {
                    const element = cartData[i];
                    items.push({
                        qty: element.qty,
                        data: element._id
                    })
                }
                const orderObj = {
                    customer: user._id,
                    order_id: generateOrderId(),
                    price: getTotalPrice(),
                    items: items,
                }
                console.log('orderObj', orderObj);
                onDispatchOrder(orderObj, { userid: user._id }, () => navigation.navigate('Cart Screen'))
            }
        } catch (error) {
            console.log(error.reason || error.message);
            toast('error', error.reason || error.message);
        }
    }

    return (
        <View style={styles.mainDiv}>
            <Text style={styles.heading2}>
                Pay with
            </Text>
            <TextInput
                style={styles.textFeild}
                placeholder={'Credit Card or Debit Card'}
                onChangeText={(event) => InputHandler(event, 'card')}
            />
            <TextInput
                style={styles.textFeild}
                placeholder={'Expiration'}
                onChangeText={(event) => InputHandler(event, 'expiration')}
            />
            <TextInput
                style={styles.textFeild}
                placeholder={'CVV'}
                onChangeText={(event) => InputHandler(event, 'cvv')}
            />
            <View>
                <TouchableOpacity style={styles.checkoutButtonStyle} onPress={() => onOrder()}>
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Order Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps = (props) => {
    const { products, users } = props;
    return {
        cartData: products.cartData,
        isUserExist: users.isUserExist,
        user: users.user,
    };
};

export default connect(mapStateToProps, { onDispatchOrder })(Chechkout);


const styles = StyleSheet.create({
    textFeild: { backgroundColor: 'lightgray', borderRadius: 10, padding: 10, borderBottomColor: '#6f6f6f', marginBottom: 40 },
    mainDiv: { padding: 10, paddingBottom: 0, borderBottomWidth: 1, borderBottomColor: '#e1e1e1', marginBottom: 5 },
    heading2: { color: 'black', fontSize: 20, textAlign: 'left', paddingBottom: 20 },
    checkoutButtonStyle: {
        backgroundColor: '#f39c12',
        padding: 10,
        paddingRight: 60,
        paddingLeft: 60,
        borderRadius: 3,
    },
})