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
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
const FavouriteComponent = (props) => {
    const { product_list } = props
    // const product = product_list.filter(item => item.category === props.route.title)
    const product = product_list
    const { colors } = useTheme();
    return (
        <SafeAreaView >
            <FlatList
                numColumns={2}
                keyExtractor={(item) => item.price}
                data={product}
                renderItem={({ item }) => {
                    console.log('item', item);
                    return <Box
                        rounded="sm"
                        style={{ width: '45%', margin: 10, padding: 5, height: '100%' }}
                        shadow={1}
                        _light={{ backgroundColor: 'gray.50' }}
                        _dark={{ backgroundColor: 'gray.700' }}>
                        <Box>
                            <AspectRatio ratio={10 / 9}>
                                <Image
                                    source={{
                                        uri:
                                            'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                                    }}
                                    alt="image"
                                />
                            </AspectRatio>
                            <Center position="absolute" top={0} right={0} px="1.5" py="1.5">
                                <Icon name="ios-heart" color={'white'} size={25} />
                            </Center>
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading size="sm" ml="-1">{item.name}</Heading>
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
        product_list: products.product_list
    };
};

export default connect(mapStateToProps, {})(FavouriteComponent);
