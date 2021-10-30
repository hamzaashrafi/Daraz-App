import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux';

class Orders extends Component {

    constructor(props) {
        super(props)

        this.state = {
            order_list: []
        }
    }


    static getDerivedStateFromProps = (props, state) => {
        const { order_list } = props;
        return { order_list };
    };



    render() {
        const { order_list } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={order_list}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => {
                        return <View key={index} style={{ marginBottom: (index + 1 === order_list.length) ? 10 : 0 }}>
                            <View style={styles.orderHead}>
                                <View style={styles.inRow}>
                                    <Text style={styles.green}> Order #{item.order_id} </Text>
                                    <Text style={styles.black}> Rs {item.price} </Text>
                                </View>
                                <View style={styles.inRow}>
                                    <Text style={styles.gray}> {new Date(item.create_at).toLocaleString()}</Text>
                                    <Text style={styles.gray}> {item.items.length} items </Text>
                                </View>
                            </View>
                            <View style={styles.orderBody} >
                                {item.items.map((data, idx) => {
                                    return <View style={styles.item} key={idx}>
                                        <View style={styles.inRow}>
                                            <Text style={styles.gray}> {data.data.name}  </Text>
                                            <Text style={styles.gray}> X {data.qty}  </Text>
                                        </View>
                                        <Text style={styles.gray}> Rs {data.qty * (data.data.price - (data.data.price * data.data.discount / 100))} </Text>
                                    </View>
                                })}
                            </View>
                        </View>
                    }} />
            </SafeAreaView >
        )
    }
}

const mapStateToProps = (props) => {
    const { products, users } = props;
    return {
        order_list: products.order_list || [],
        isOrderGetting: products.isOrderGetting,
        isUserExist: users.isUserExist,
    };
};

export default connect(mapStateToProps, {})(Orders);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        // paddingBottom: 10
    },
    green: {
        color: 'green'
    },
    black: {
        color: 'black'
    },
    gray: {
        color: 'gray'
    },
    inRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    orderHead: {
        backgroundColor: '#fff',
        margin: 20,
        marginBottom: 0,
        padding: 20,
        borderRadius: 15,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    orderBody: {
        backgroundColor: '#fff',
        margin: 20,
        marginBottom: 0,
        marginTop: 0,
        padding: 20,
        borderRadius: 15,
    },
    item: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})