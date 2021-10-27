import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Box, AspectRatio, Image, Center } from 'native-base'
import Icons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { onAddToCart } from '../../store/actions'


const Details = (props) => {
    const { selectedProduct, onAddToCart } = props

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView style={{ height: '90%' }}>
                <Box>
                    <AspectRatio ratio={10 / 8}>
                        <Image source={{ uri: selectedProduct.image }} alt="image" />
                    </AspectRatio>
                    <Center position="absolute" top={0} right={0} px="1.5" py="1.5">
                        <Icons name="ios-heart" color={'white'} size={40} />
                    </Center>
                </Box>
                <View style={styles.section}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.name}>{selectedProduct.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                                Rs {selectedProduct.price}
                            </Text>
                            <Text style={{ marginHorizontal: 2 }}>Rs {selectedProduct.price - (selectedProduct.price * selectedProduct.discount / 100)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ marginHorizontal: 2, color: 'red' }}>{selectedProduct.discount}% off</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.section, styles.sectionLarge]}>
                    <Text style={styles.sectionContent}>{selectedProduct.description}</Text>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => onAddToCart(selectedProduct)}
                style={[styles.addToCartBtn, { borderColor: '#009387', borderWidth: 1, marginTop: 15 }]}
            >
                <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.addToCartBtn}>
                    <Text style={[styles.addToCartBtnTxt, { color: '#fff' }]}>Add to cart</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View >
    );
};


const mapStateToProps = (props) => {
    const { products } = props;
    return {
        selectedProduct: products.selectedProduct
    };
};

export default connect(mapStateToProps, { onAddToCart })(Details);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'justify',
    },
    sectionLarge: {
        minHeight: 100,
    },
    addToCartBtn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    addToCartBtnTxt: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
