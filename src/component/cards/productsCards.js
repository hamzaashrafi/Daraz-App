import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    Center,
    HStack,
    Stack,
    FlatList,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onSelectProduct, addtofavorites } from '../../store/actions'
import FastImage from 'react-native-fast-image'

const ProductsCards = (props) => {
    const { product_list, onSelectProduct, isProductGetting, user, isUserExist, addtofavorites } = props
    const product = product_list.filter(item => item.category === props.route.title)
    const navigation = useNavigation();

    const onselect = async (item) => {
        await onSelectProduct(item);
        navigation.navigate('Details')
    }

    const addtofavorit = (item) => {
        if (isUserExist) {
            addtofavorites({ productID: item._id }, { userid: user._id })
        }
    }

    // if (isProductGetting) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size="large" />
    //         </View>
    //     );
    // }
    return (
        <SafeAreaView>
            <FlatList
                numColumns={2}
                keyExtractor={(item) => item._id}
                data={product}
                renderItem={({ item, index }) => {
                    const favorite = (user.favorite_product || []).find(pro => pro === item._id);
                    return <Box
                        rounded="sm"
                        key={index}
                        style={{ width: '45%', margin: 10, padding: 9, height: '95%', borderRadius: 20 }}
                        shadow={1}
                        _light={{ backgroundColor: 'gray.200' }}
                        _dark={{ backgroundColor: 'gray.700' }}>
                        <Box >
                            <TouchableOpacity onPress={() => onselect(item)} activeOpacity={20}>
                                <AspectRatio ratio={10 / 10}>
                                    <FastImage
                                        source={{
                                            uri: item.image,
                                            headers: { Authorization: item.image },
                                            priority: FastImage.priority.high
                                        }}
                                        resizeMethod="resize"
                                        resizeMode="cover"
                                        style={{ width: "100%", height: "100%", alignSelf: "center", resizeMode: "cover" }}
                                    />
                                </AspectRatio>
                            </TouchableOpacity>
                            <Center position="absolute" top={0} right={0} px="1.5" py="1.5">
                                <Icon name="ios-heart" color={favorite ? "#009387" : 'white'} onPress={() => addtofavorit(item)} size={25} />
                            </Center>
                        </Box>
                        <TouchableOpacity onPress={() => onselect(item)} activeOpacity={20}>
                            <Stack p="4" space={3}>
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
        </SafeAreaView>
    )
}

const mapStateToProps = (props) => {
    const { products, users } = props;
    return {
        product_list: products.product_list,
        isUserExist: users.isUserExist,
        user: users.user,
        isProductGetting: products.isProductGetting,
    };
};

export default connect(mapStateToProps, { onSelectProduct, addtofavorites })(ProductsCards);
