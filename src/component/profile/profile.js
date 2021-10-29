import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';


const Profile = (props) => {
    const { navigation, user } = props
    const [currentUser, setCurrentUser] = useState(user)
    useEffect(() => {
        setCurrentUser(user)
    }, [user])
    console.log('currentUser', currentUser);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image source={{ uri: currentUser.image || 'https://api.adorable.io/avatars/80/abott@adorable.png', }} size={80} />
                    <View style={{ marginLeft: 20 }}>
                        {currentUser.name ? <Title style={[styles.title, { marginTop: 15, marginBottom: 5, }]}>{currentUser.name}</Title> : null}
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                {currentUser.address ? <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{currentUser.address}</Text>
                </View> : null}
                {currentUser.phone ? <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{currentUser.phone}</Text>
                </View> : null}
                {currentUser.email ? <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{currentUser.email}</Text>
                </View> : null}
            </View>
            <View >
                <TouchableRipple onPress={() => navigation.navigate('Favourite')}>
                    <View style={styles.menuItem}>
                        <Icon name="heart-outline" color="#FF6347" size={25} />
                        <Text style={styles.menuItemText}>Your Favorites</Text>
                    </View>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
};


const mapStateToProps = (props) => {
    const { users } = props;
    return {
        isUserExist: users.isUserExist,
        user: users.user,
    };
};

export default connect(mapStateToProps, {})(Profile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
