import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { signout } from '../../store/actions'

// const paperTheme = useTheme();


class DrawerContent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isUserExist: false,
            user: {}
        }
    }

    static getDerivedStateFromProps = (props, state) => {
        const { isUserExist, user } = props;
        return { isUserExist, user };
    };


    render() {
        const { isUserExist, user } = this.state
        const { signout } = this.props
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {isUserExist ? <DrawerContentScrollView {...this.props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <TouchableOpacity activeOpacity={20} onPress={() => { this.props.navigation.navigate('Profile') }}>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                    <Avatar.Image
                                        source={{ uri: user.image || 'https://api.adorable.io/avatars/50/abott@adorable.png' }}
                                        size={50}
                                    />
                                    <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                        <Title style={styles.title}>{user.name}</Title>
                                        {/* <Caption style={styles.caption}>@j_doe</Caption> */}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="home-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Home"
                                onPress={() => { this.props.navigation.navigate('Home') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="account-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Profile"
                                onPress={() => { this.props.navigation.navigate('Profile') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="heart-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Favourite"
                                onPress={() => { this.props.navigation.navigate('Favourite') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="card-search-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Search"
                                onPress={() => { this.props.navigation.navigate('Search') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="format-list-bulleted"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Orders"
                                onPress={() => { this.props.navigation.navigate('Orders') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="cart-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Cart"
                                onPress={() => { this.props.navigation.navigate('Cart') }}
                            />
                        </Drawer.Section>
                    </View>

                </DrawerContentScrollView> : <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Login</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>}
                {isUserExist ? <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="exit-to-app"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Sign Out"
                        onPress={() => signout()}
                    />
                </Drawer.Section> : null}
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (props) => {
    const { users } = props;
    return {
        isUserExist: users.isUserExist,
        user: users.user,
    };
};

export default connect(mapStateToProps, { signout })(DrawerContent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 700,
        alignItems: 'center',
        marginTop: 50,
        padding: 15
    },
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
