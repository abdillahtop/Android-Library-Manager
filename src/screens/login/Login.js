import React, { Component } from 'react'
import { Image, AsyncStorage, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import { Container, View, Item, Input, Button, Text, Label } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { postLogin } from '../../public/redux/action/users';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            signs: [],
            email: '',
            password: ''
        }
    }

    isLogin = async () => {
        if (this.state.email !== '' && this.state.password !== '') {

            let data = {
                email: this.state.email,
                password: this.state.password
            }
            await this.props.dispatch(postLogin(data))

            AsyncStorage.getItem('Token', (error, result) => {
                if (result) {
                    this.props.navigation.navigate('Home')
                } else {
                    alert('Terjadi Kesalahan saat Login')
                }
            })
        } else {
            alert('Warning, please insert Data in form')
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('Token', (error, result) => {
            if (result) {
                this.props.navigation.navigate('Home')
            }
        })
    }

    render() {

        return (
            <Container>
                <ScrollView>
                    <View style={{ alignItems: 'flex-end', paddingRight: 30, paddingTop: 20 }}>
                        <Ionicons
                            onPress={() => this.props.navigation.navigate('Home')}
                            name="ios-close"
                            size={30} color='#00C890'
                        />
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 20,
                    }}>
                        {/* <Icon name="heart" style={{ color: '#ED4A6A' }} /> */}
                        <Image style={{ height: 150, width: 150, marginTop: 35 }} source={require('../../assets/reading.png')} />
                        <Text style={{ fontWeight: '900', fontSize: 24, color: '#444', marginBottom: 20 }}>ACCESS LIBRARY</Text>
                        <Item floatingLabel style={{ marginBottom: 20 }}>
                            <Label style={{ paddingLeft: 20 }}>Email</Label>
                            <Input style={{ paddingLeft: 20 }} onChangeText={email => this.setState({ email })} />
                        </Item>
                        <Item floatingLabel style={{ marginBottom: 20 }}>
                            <Label style={{ paddingLeft: 20 }}>Password</Label>
                            <Input
                                secureTextEntry={true}
                                style={{ paddingLeft: 20 }}
                                onChangeText={password => this.setState({ password })} />
                        </Item>
                        <Button
                            full
                            onPress={this.isLogin}
                            style={{
                                backgroundColor: '#00C890',
                                marginBottom: 20
                            }}
                        >
                            <Text>Login</Text>
                        </Button>
                        <Text style={{ fontSize: 15, color: '#343634' }}>
                            If you did't have account, Sign Up Here
                        </Text>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        login: state.login
    }
}
export default connect(mapStateToProps)(Login)
