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
    FlatList
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onSelectProduct } from '../../store/actions'

const ProductsCards = (props) => {
    const { product_list, onSelectProduct, isProductGetting } = props
    const product = product_list.filter(item => item.category === props.route.title)
    const navigation = useNavigation();

    const onselect = async (item) => {
        await onSelectProduct(item);
        navigation.navigate('Details')
    }
    if (isProductGetting) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <SafeAreaView>
            <FlatList
                numColumns={2}
                keyExtractor={(item) => item._id}
                data={product}
                renderItem={({ item }) => {
                    return <Box
                        rounded="sm"
                        style={{ width: '45%', margin: 10, padding: 9, height: '100%', borderRadius: 20 }}
                        shadow={1}
                        _light={{ backgroundColor: 'gray.200' }}
                        onTouchEnd={() => onselect(item)}
                        _dark={{ backgroundColor: 'gray.700' }}>
                        <Box >
                            <AspectRatio ratio={10 / 10}>
                                <Image source={{ uri: item.image }} style={{ borderRadius: 30 }} alt="image" />
                            </AspectRatio>
                            <Center position="absolute" top={0} right={0} px="1.5" py="1.5">
                                <Icon name="ios-heart" color={'white'} size={25} />
                            </Center>
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading size="sm" ml="-1">{item.name}</Heading>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                                        Rs {item.price}
                                    </Text>
                                    <Text style={{ marginHorizontal: 2 }}>Rs {item.price - (item.price * item.discount / 100)}</Text>
                                </View>
                                <Text
                                    fontSize="xs"
                                    _light={{ color: 'violet.500' }}
                                    _dark={{ color: 'violet.300' }}
                                    fontWeight="500"
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
                    </Box>
                }}
            />
        </SafeAreaView>
    )
}

const mapStateToProps = (props) => {
    const { products } = props;
    return {
        product_list: products.product_list,
        isProductGetting: products.isProductGetting
    };
};

export default connect(mapStateToProps, { onSelectProduct })(ProductsCards);
