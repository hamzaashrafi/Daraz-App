import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    SafeAreaView,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { signup } from '../../store/actions'



export class SignupComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            user: {
                email: '',
                password: '',
                confirm_password: '',
            },
            data: {
                confirm_password: '',
                isValidEmail: false,
                secureTextEntry: true,
                confirm_secureTextEntry: true,
                isPasswordNotMatched: false
            }
        }
    }

    static getDerivedStateFromProps = (props, state) => {
        const { user } = state;
        const { navigation, isUserExist } = props;
        if (isUserExist) {
            navigation.goBack();
        }
        const data = { ...state.data }
        let isPasswordNotMatched = false
        if (user.password === user.confirm_password) {
            isPasswordNotMatched = false
        } else {
            isPasswordNotMatched = true
        }
        data.isPasswordNotMatched = isPasswordNotMatched
        return { data };
    };


    emailTextHandler = (val) => {
        const { data, user } = this.state
        if (this.validateEmail(val)) {
            this.setState({
                user: { ...user, email: val },
                data: { ...data, isValidEmail: true, }
            })
        } else {
            this.setState({
                user: { ...user, email: val },
                data: { ...data, isValidEmail: false, }
            })
        }
    }

    passwordTextHandler = (val, name) => {
        const { user, data } = this.state
        this.setState({
            user: { ...user, [name]: val },
            data: { ...data }
        })
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

    updateConfirmPasswordVisibilty = () => {
        const { data } = this.state
        this.setState({
            data: { ...data, confirm_secureTextEntry: !data.confirm_secureTextEntry },
        })
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    onSingup = () => {
        const { user, data } = this.state
        const { signup } = this.props
        if (data.isPasswordNotMatched) {
            Alert.alert('Wrong Input!', 'Password not match', [{ text: 'Okay' }]);
            return
        }
        if (user.email.length === 0 || user.password.length === 0) {
            Alert.alert('Wrong Input!', 'email or password field cannot be empty.', [{ text: 'Okay' }]);
            return;
        }
        console.log('user', user);
        signup(user);
    }

    render() {
        const { navigation } = this.props
        const { data, user } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Register Now!</Text>
                </View>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <ScrollView>
                        <Text style={styles.text_footer}>email</Text>
                        <View style={styles.action}>
                            <FontAwesome name="user-o" color="#05375a" size={20} />
                            <TextInput
                                placeholder="Your email"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => this.emailTextHandler(val)}
                            />
                            {data.isValidEmail ?
                                <Animatable.View animation="bounceIn">
                                    <Feather name="check-circle" color="green" size={20} />
                                </Animatable.View>
                                : null}
                        </View>
                        {data.isValidEmail
                            ? null
                            : <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Invalid Email</Text>
                            </Animatable.View>}
                        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
                        <View style={styles.action}>
                            <Feather name="lock" color="#05375a" size={20} />
                            <TextInput
                                placeholder="Your Password"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                style={styles.textInput}
                                value={user.password}
                                autoCapitalize="none"
                                onChangeText={(val) => this.passwordTextHandler(val, 'password')}
                            />
                            <TouchableOpacity onPress={this.updatePasswordVisibilty}>
                                {data.secureTextEntry
                                    ? <Feather name="eye-off" color="grey" size={20} />
                                    : <Feather name="eye" color="grey" size={20} />}
                            </TouchableOpacity>
                        </View>
                        {data.isPasswordNotMatched
                            ? <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Password Not Match</Text>
                            </Animatable.View> : null}
                        <Text style={[styles.text_footer, { marginTop: 35 }]}>Confirm Password</Text>
                        <View style={styles.action}>
                            <Feather name="lock" color="#05375a" size={20} />
                            <TextInput
                                placeholder="Confirm Your Password"
                                secureTextEntry={data.confirm_secureTextEntry ? true : false}
                                style={styles.textInput}
                                autoCapitalize="none"
                                value={user.confirm_password}
                                onChangeText={(val) => this.passwordTextHandler(val, 'confirm_password')}
                            />
                            <TouchableOpacity onPress={this.updateConfirmPasswordVisibilty}>
                                {data.secureTextEntry
                                    ? <Feather name="eye-off" color="grey" size={20} />
                                    : <Feather name="eye" color="grey" size={20} />}
                            </TouchableOpacity>
                        </View>
                        {data.isPasswordNotMatched
                            ? <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Password Not Match</Text>
                            </Animatable.View> : null}
                        <View style={styles.textPrivate}>
                            <Text style={styles.color_textPrivate}>By signing up you agree to our</Text>
                            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                            <Text style={styles.color_textPrivate}>{" "}and</Text>
                            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.signIn} onPress={() => this.onSingup()}>
                                <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                                    <Text style={[styles.textSign, { color: '#fff' }]}>Sign Up</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                style={[styles.signIn, { borderColor: '#009387', borderWidth: 1, marginTop: 15 }]}>
                                <Text style={[styles.textSign, { color: '#009387' }]}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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

export default connect(mapStateToProps, { signup })(SignupComponent);

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
        flex: Platform.OS === 'ios' ? 3 : 12,
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});
