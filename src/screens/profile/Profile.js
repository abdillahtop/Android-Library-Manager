import React, { Component } from 'react'
import { Image, AsyncStorage } from 'react-native'
import { View, Text, Button } from 'native-base'
import { Logout } from '../../public/redux/action/users';
import { connect } from 'react-redux'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            cardid: '',
            userid: ''
        }
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

    isLogout() {
        this.props.dispatch(Logout(this.state.userid))
        this.setState({
            users: this.props.user
        })
        alert('Berhasil Logout')
    }

    render() {
        return (
            <>
                <View style={{ marginHorizontal: 20, marginTop: 125 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../assets/man.png')} style={{ height: 125, width: 125 }} />
                        <Text style={{ fontSize: 24, marginTop: 10, fontWeight: 'bold' }}>{this.state.name}</Text>
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