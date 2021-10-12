import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';


class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                email: '',
                password: '',
            },
            data: {
                isValidEmail: false,
                secureTextEntry: true,
                confirm_secureTextEntry: true,
            }
        }
    }

    static getDerivedStateFromProps = (props, state) => {
        const { navigation, isUserExist } = props;
        if (isUserExist) {
            navigation.goBack();
        }
        return {};
    };

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    emailTextHandler = (val) => {
        const { data, user } = this.state

        if (this.validateEmail(val)) {
            this.setState({
                user: { ...user, email: val },
                data: { ...data, isValidEmail: true }
            })
        } else {
            this.setState({
                user: { ...user, email: val },
                data: { ...data, isValidEmail: false }
            })
        }
    }

    passwordTextHandler = (val) => {
        const { data, user } = this.state
        if (val.trim().length >= 8) {
            this.setState({
                user: { ...user, password: val },
                data: { ...data, isValidPassword: true }
            })
        } else {
            this.setState({
                user: { ...user, password: val },
                data: { ...data, isValidPassword: false }
            })
        }
    }

    updatePasswordVisibilty = () => {
        const { data } = this.state
        this.setState({
            data: {
                ...data,
                secureTextEntry: !data.secureTextEntry
            }
        })
    }

    onLogin = () => {
        const { user } = this.state
        if (!this.validateEmail(user.email)) {
            return
        }
        if (user.email.length === 0 || user.password.length === 0) {
            Alert.alert('Wrong Input!', 'email or password field cannot be empty.', [{ text: 'Okay' }]);
            return;
        }
        console.log('user', user);
        // signIn(foundUser);
    }

    render() {
        const { navigation } = this.props
        const { data } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Welcome!</Text>
                </View>
                <Animatable.View animation="fadeInUpBig" style={[styles.footer, { backgroundColor: '#ffffff' }]}>
                    <Text style={[styles.text_footer, { color: '#333333' }]}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color={'#333333'} size={20} />
                        <TextInput
                            placeholder="Your Email"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, { color: '#333333' }]}
                            autoCapitalize="none"
                            onChangeText={(val) => this.emailTextHandler(val)}
                        />
                        {data.isValidEmail ?
                            <Animatable.View animation="bounceIn">
                                <Feather name="check-circle" color="green" size={20} />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidEmail ?
                        null
                        : <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Invalid Email</Text>
                        </Animatable.View>
                    }
                    <Text style={[styles.text_footer, { color: '#333333', marginTop: 35 }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather name="lock" color={'#333333'} size={20} />
                        <TextInput
                            placeholder="Your Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={[styles.textInput, { color: '#333333' }]}
                            autoCapitalize="none"
                            onChangeText={(val) => this.passwordTextHandler(val)}
                        />
                        <TouchableOpacity onPress={this.updatePasswordVisibilty}>
                            {data.secureTextEntry
                                ? <Feather name="eye-off" color="grey" size={20} />
                                : <Feather name="eye" color="grey" size={20} />}
                        </TouchableOpacity>
                    </View>
                    {data.isValidPassword
                        ? null
                        : <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                        </Animatable.View>}
                    <TouchableOpacity>
                        <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                    </TouchableOpacity>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.signIn} onPress={() => this.onLogin()}>
                            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                                <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Signup')}
                            style={[styles.signIn, { borderColor: '#009387', borderWidth: 1, marginTop: 15 }]}
                        >
                            <Text style={[styles.textSign, { color: '#009387' }]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
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

export default connect(mapStateToProps, {})(LoginComponent);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
