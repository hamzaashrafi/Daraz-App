import React, { Component } from 'react'
import Icons from 'react-native-vector-icons/Ionicons';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, FlatList } from 'native-base';
import { onSelectProduct } from '../../store/actions'
import { connect } from 'react-redux';
import { SafeAreaView, ActivityIndicator, View } from 'react-native';

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

    render() {
        const { data } = this.state
        const { isProductGetting } = this.props
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
                    data={data}
                    numColumns={2}
                    keyExtractor={(item) => item.price}
                    renderItem={({ item }) => {
                        return <Box
                            rounded="sm"
                            style={{ width: '45%', margin: 10, padding: 9, height: '95%', borderRadius: 20 }}
                            shadow={1}
                            _light={{ backgroundColor: 'gray.200' }}
                            onTouchEnd={() => this.onselect(item)}
                            _dark={{ backgroundColor: 'gray.700' }}>
                            <Box>
                                <AspectRatio ratio={10 / 9}>
                                    <Image source={{ uri: item.image }} style={{ borderRadius: 30 }} alt="image" />
                                </AspectRatio>
                                <Center position="absolute" top={0} right={0} px="1.5" py="1.5">
                                    <Icons name="ios-heart" color={'white'} size={25} />
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
}


const mapStateToProps = (props) => {
    const { products } = props;
    return {
        product_list: products.product_list,
        isProductGetting: products.isProductGetting
    };
};

export default connect(mapStateToProps, { onSelectProduct })(CardComponent);
