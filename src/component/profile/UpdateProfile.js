import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Animated, { color } from 'react-native-reanimated';
import { connect } from 'react-redux';
import { updateUser } from '../../store/actions'
import ImagePickerComponent from '../common/imagePicker'
import { toast } from '../../shared';

const UpdateProfile = (props) => {
    const { user, updateUser } = props
    const { colors } = useTheme();
    const [currentUser, setCurrentUser] = useState(user)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        setCurrentUser(user)
    }, [user])

    const InputHandler = (value, name) => {
        const data = { ...userData }
        data[name] = value
        setUserData(data)
    }


    const onUpdate = () => {
        const obj = {};
        const data = { ...userData }
        for (const [key, value] of Object.entries(data)) {
            if (value) {
                obj[key] = value;
            }
        }
        if (Object.keys(obj).length) {
            console.log('obj', obj);
            const headers = {
                userid: currentUser._id
            }
            updateUser(obj, headers)
        }
    }


    const onImageHandler = (env) => {
        try {
            console.log('env', env);
            const image = `data:${env.mime};base64,${env.data}`
            console.log('image', image);
            setUserData({ ...userData, image })
        } catch (error) {
            console.log('error.message', error.message);
            toast('error', error.message)
        }
    };


    return (
        <View style={styles.container}>
            <Animated.View style={{ margin: 20, }}>
                <View style={{ alignItems: 'center' }}>
                    <View
                        style={{ height: 100, width: 100, borderRadius: 15, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <ImagePickerComponent
                                label={''}
                                openfrom={'add_profile_Image'}
                                handleImage={val => onImageHandler(val)}
                                displayImage={currentUser.image}
                            />
                        </View>
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>{currentUser.name}</Text>
                </View>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={(userData.name || userData.name === '') ? userData.name : currentUser.name}
                        onChangeText={(event) => InputHandler(event, 'name')}
                        style={[styles.textInput, { color: colors.text, }]}
                    />
                </View>
                <View style={styles.action}>
                    <Feather name="phone" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Phone"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        value={(userData.phone || userData.phone === '') ? userData.phone : currentUser.phone}
                        onChangeText={(event) => InputHandler(event, 'phone')}
                        style={[styles.textInput, { color: colors.text }]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="envelope-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#666666"
                        keyboardType="email-address"
                        autoCorrect={false}
                        value={currentUser.email}
                        editable={false}
                        // onChangeText={(event) => InputHandler(event, 'email')}
                        style={[styles.textInput, { color: colors.text }]}
                    />
                </View>
                <View style={styles.action}>
                    <Icon name="map-marker-outline" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Address"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        value={(userData.address || userData.address === '') ? userData.address : currentUser.address}
                        onChangeText={(event) => InputHandler(event, 'address')}
                        style={[styles.textInput, { color: colors.text }]}
                    />
                </View>
                <TouchableOpacity style={styles.commandButton} onPress={() => onUpdate()}>
                    <Text style={styles.panelButtonTitle}>Update</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};


const mapStateToProps = (props) => {
    const { users } = props;
    return {
        isUserExist: users.isUserExist,
        user: users.user,
    };
};

export default connect(mapStateToProps, { updateUser })(UpdateProfile);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#009387',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#009387',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },

});
