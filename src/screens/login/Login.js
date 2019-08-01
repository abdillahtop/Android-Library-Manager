import React, { Component } from 'react'
import { Image } from 'react-native';
import { Container, View, Item, Input, Button, Text, Label } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

export default class Login extends Component {

    state = {
        icon: "eye-off",
        password: true
    };

    _changeIcon() {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
            password: prevState.password
        }));
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 20,
                    }}>
                        {/* <Icon name="heart" style={{ color: '#ED4A6A' }} /> */}
                        <Image style={{ height: 150, width: 150, marginTop: 100 }} source={require('../../assets/reading.png')} />
                        <Text >ACCESS LIBRARY</Text>
                        <Item floatingLabel style={{ marginBottom: 20 }}>
                            <Label style={{ paddingLeft: 20 }}>Email</Label>
                            <Input style={{ paddingLeft: 20 }} />
                        </Item>
                        <Item floatingLabel style={{ marginBottom: 20 }}>
                            <Label style={{ paddingLeft: 20 }}>Password</Label>
                            <Input
                                secureTextEntry={this.state.password}
                                style={{ paddingLeft: 20 }} />
                        </Item>
                        <Button
                            full
                            onPress={() => this.props.navigation.navigate('Home')}
                            style={{
                                backgroundColor: '#00C890',
                                marginBottom: 20
                            }}
                        >
                            <Text>Login</Text>
                        </Button>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

// const styles = StyleSheet.create({
//     content: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     }
// })