import React, { Component } from 'react'
import Icons from 'react-native-vector-icons/Ionicons';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, FlatList } from 'native-base';

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

    render() {
        const { data } = this.state
        return (
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={(item) => item.price}
                renderItem={({ item }) => {
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
        )
    }
}

export default CardComponent
