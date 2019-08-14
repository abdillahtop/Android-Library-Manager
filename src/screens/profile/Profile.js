import React, { Component } from 'react'
import { Image, AsyncStorage, Alert } from 'react-native'
import { View, Text, Button } from 'native-base'
import { Logout } from '../../public/redux/action/users';
import { connect } from 'react-redux'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            name: '',
            cardid: '',
            userid: '',
            verified: ''
        }
        AsyncStorage.getItem('data', (error, result) => {
            if (result) {
                this.setState({
                    data: result
                })
            }
        })

        AsyncStorage.getItem('Verified', (error, result) => {
            if (result) {
                this.setState({
                    verified: result
                })
            }
        })

        AsyncStorage.getItem('Name', (error, result) => {
            if (result) {
                this.setState({
                    name: result
                })
            }
        })

        AsyncStorage.getItem('Cardid', (error, result) => {
            if (result) {
                this.setState({
                    cardid: result
                })
            }
        })

        AsyncStorage.getItem('Userid', (error, result) => {
            if (result) {
                this.setState({
                    userid: result
                })
            }
        })
    }

    componentWillMount() {
        AsyncStorage.getItem('Token', (error, result) => {
            if (error) {
                this.props.navigation.navigate('Login')
            }
        })
    }

    isLogout() {
        this.props.dispatch(Logout(this.state.userid))
        this.setState({
            users: this.props.user
        })
        Alert.alert(
            'Success',
            'Berhasil Logout',
            [
                { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
            ],
            { cancelable: false },
        );
    }

    render() {
        console.warn("veridfapalaied", this.state.cardid)
        console.warn("veridfied", this.state.verified)
        return (
            <>
                <View style={{ marginHorizontal: 20, marginTop: 125 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../assets/man.png')} style={{ height: 125, width: 125 }} />
                        <Text style={{ fontSize: 24, marginTop: 10, fontWeight: 'bold' }}>{this.state.name} </Text>
                        <Text style={{ fontSize: 18, marginTop: 5 }}>
                            {
                                this.state.verified === '1'
                                    ?
                                    <Text>User telah Verified</Text>
                                    :
                                    <Text>User Belum Verified</Text>
                            }
                        </Text>
                        <Text style={{ fontSize: 18, marginTop: 5 }}>[ {this.state.cardid} ]</Text>
                        <Button
                            style={{ height: 30, marginTop: 20 }}
                            onPress={() => this.isLogout()}
                            bordered danger>
                            <Text>Logout</Text>
                        </Button>
                    </View>
                </View>

            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        login: state.login
    }
}
export default connect(mapStateToProps)(Profile)