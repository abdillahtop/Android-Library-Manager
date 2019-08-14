import React, { Component } from 'react';
import { Alert } from 'react-native'
import { Input, Item, View, H3, Button, Text } from 'native-base';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { postRegister } from '../../public/redux/action/users';
import Ionicons from 'react-native-vector-icons/Ionicons';

class AddBook extends Component {
    constructor() {
        super();
        this.state = {
            registers: [],
        }
    }

    newUser(data) {
        this.props.dispatch(postRegister(data))
        this.setState({
            registers: this.props.register
        })
        Alert.alert(
            'Success',
            'Berhasil Registrasi',
            [
                { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
            ],
            { cancelable: false },
        );
    }

    render() {
        const data = {
            id_card: this.state.id_card,
            email: this.state.email,
            fullname: this.state.fullname,
            password: this.state.password
        }
        return (
            <ScrollView>
                <View>
                    <View style={{ paddingLeft: 30, paddingTop: 20 }}>
                        <Ionicons
                            onPress={() => this.props.navigation.navigate('Login')}
                            name="ios-arrow-dropleft"
                            size={35} color='#00C890'
                        />
                    </View>
                    <H3 style={{ textAlign: 'center', marginVertical: 20 }}>REGISTER</H3>
                    <View style={{ marginHorizontal: 15 }}>
                        <Item regular style={{ marginVertical: 8 }}>
                            <Input placeholder="Id Card..." placeholderIconColor="#f8f7fb" onChangeText={id_card => this.setState({ id_card })} style={{ paddingLeft: 10, height: 40 }} />
                        </Item>
                        <Item regular style={{ marginVertical: 8 }}>
                            <Input placeholder="Email..." placeholderIconColor="#f8f7fb" onChangeText={email => this.setState({ email })} style={{ paddingLeft: 10, height: 40 }} />
                        </Item>
                        <Item regular style={{ marginVertical: 8 }}>
                            <Input placeholder="Fullname..." onChangeText={fullname => this.setState({ fullname })}
                                placeholderIconColor="#f8f7fb" style={{ paddingLeft: 10, height: 40 }} />
                        </Item>
                        <Item regular style={{ marginVertical: 8 }}>
                            <Input secureTextEntry={true} placeholder="Password..." onChangeText={password => this.setState({ password })}
                                placeholderIconColor="#f8f7fb" style={{ paddingLeft: 10, height: 40 }} />
                        </Item>

                        <Button
                            onPress={() => { this.newUser(data) }}
                            style={{ backgroundColor: '#00C890', marginVertical: 20, justifyContent: 'center', textAlign: 'center' }}>
                            <Text style={{ fontWeight: '900' }}>REGISTER</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView >
        )
    }

}


const mapStateToProps = state => {
    return {
        register: state.register
    };
};

export default connect(mapStateToProps)(AddBook);
