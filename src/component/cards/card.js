import React, { Component } from 'react'
import Icons from 'react-native-vector-icons/Ionicons';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, FlatList } from 'native-base';
import { onSelectProduct, addtofavorites } from '../../store/actions'
import { connect } from 'react-redux';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image'

class CardComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }

    static getDerivedStateFromProps = (props, state) => {
        const { data } = props;
        return { data };
    };


    onselect = async (item) => {
        const { onSelectProduct, navigation } = this.props
        await onSelectProduct(item);
        navigation.navigate('Details')
    }

    addtofavorites = (item) => {
        const { addtofavorites, isUserExist, user } = this.props
        if (isUserExist) {
            addtofavorites({ productID: item._id }, { userid: user._id })
        }
    }

    render() {
        const { data } = this.state
        const { isProductGetting, user } = this.props
        // if (isProductGetting) {
        //     return (
        //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //             <ActivityIndicator size="large" />
        //         </View>
        //     );
        // }
        return (
            <SafeAreaView>
                {data && data.length
                    ? <FlatList
                        data={data}
                        numColumns={2}
                        keyExtractor={(item) => item.price}
                        renderItem={({ item, index }) => {
                            const favorite = (user.favorite_product || []).find(pro => pro === item._id);
                            console.log('favorite', favorite);
                            return <Box
                                key={index}
                                rounded="sm"
                                style={{ width: '45%', margin: 10, padding: 9, height: '95%', borderRadius: 20 }}
                                shadow={1}
                                _light={{ backgroundColor: 'gray.200' }}
                                _dark={{ backgroundColor: 'gray.700' }}>
                                <Box>
                                    <TouchableOpacity onPress={() => this.onselect(item)} activeOpacity={20}>
                                        <AspectRatio ratio={10 / 9}>
                                            <FastImage
                                                source={{
                                                    uri: item.image,
                                                    headers: { Authorization: item.image },
                                                    priority: FastImage.priority.high
                                                }}
                                                resizeMethod="resize"
                                                resizeMode="cover"
                                                style={{ width: "100%", height: "100%", borderRadius: 30, alignSelf: "center", resizeMode: "cover" }}
                                            />
                                        </AspectRatio>
                                    </TouchableOpacity>
                                    <Center position="absolute" top={0} right={0} px="1.5" py="1.5">
                                        <Icons name="ios-heart" onPress={() => this.addtofavorites(item)} color={favorite ? "#009387" : 'white'} size={25} />
                                    </Center>
                                </Box>
                                <TouchableOpacity onPress={() => this.onselect(item)} activeOpacity={20}>
                                    <Stack p="4" space={3} >
                                        <Stack space={2}>
                                            <Heading size="sm" ml="-1">{item.name}</Heading>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                                <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: 12, textDecorationStyle: 'solid' }}>
                                                    Rs {item.price} /
                                                </Text>
                                                <Text style={{ marginHorizontal: 2 }}>Rs {item.price - (item.price * item.discount / 100)}</Text>
                                            </View>
                                            <Text
                                                fontSize="xs"
                                                _light={{ color: 'violet.500' }}
                                                _dark={{ color: 'violet.300' }}
                                                fontWeight="500"
                                                numberOfLines={1}
                                                ml="-0.5"
                                                mt="-1">
                                                {item.description}
                                            </Text>
                                        </Stack>
                                        <HStack alignItems="center" space={4} justifyContent="space-between">
                                            <HStack alignItems="center">
                                                <Text color="gray.500" fontWeight="400">{item.category}</Text>
                                            </HStack>
                                        </HStack>
                                    </Stack>
                                </TouchableOpacity>
                            </Box>
                        }}
                    />
                    : <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 250, marginHorizontal: 50 }}>
                        <Text style={{ color: 'black' }}>No Product Found </Text>
                        <Text style={{ color: 'gray', textAlign: 'center' }}>Check your internet or no product found in our store</Text>
                    </View>}
            </SafeAreaView>
        )
    }
}


const mapStateToProps = (props) => {
    const { products, users } = props;
    return {
        product_list: products.product_list,
        isProductGetting: products.isProductGetting,
        isUserExist: users.isUserExist,
        user: users.user,
    };
};

export default connect(mapStateToProps, { onSelectProduct, addtofavorites })(CardComponent);
