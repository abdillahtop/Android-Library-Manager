import React, { Component } from 'react'
import { Image, Alert } from 'react-native';
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

    isLogin(data) {
        this.props.dispatch(postLogin(data))
        this.setState({
            signs: this.props.sign

        })
        this.props.navigation.navigate('Register')
        Alert.alert(
            'Success',
            'Berhasil Login',
            [
                { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
            ],
            { cancelable: false },
        );
    }

    render() {
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        console.warn(data)
        return (
            <Container>
                <ScrollView>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 20,
                    }}>
                        {/* <Icon name="heart" style={{ color: '#ED4A6A' }} /> */}
                        <Image style={{ height: 150, width: 150, marginTop: 30 }} source={require('../../assets/reading.png')} />
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
                            onPress={() => this.isLogin(data)}
                            style={{
                                backgroundColor: '#00C890',
                                marginBottom: 20
                            }}
                        >
                            <Text>Login</Text>
                        </Button>
                        <Button
                            full
                            onPress={() => this.props.navigation.navigate('Register')}
                            style={{
                                backgroundColor: '#00C890',
                                marginBottom: 20
                            }}
                        >
                            <Text>Sign Up</Text>
                        </Button>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        sign: state.sign.userList
    };
};

export default connect(mapStateToProps)(Login);
