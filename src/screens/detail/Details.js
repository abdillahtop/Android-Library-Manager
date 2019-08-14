import React, { Component } from 'react'
import { View, Image, Text, AsyncStorage, Alert } from 'react-native'
import { H3, Button } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { postLoaning } from '../../public/redux/action/loaning'

class Detail extends Component {
    constructor() {
        super();
        this.state = {
            loanings: [],
            verified: ''
        }
        AsyncStorage.getItem('Verified', (error, result) => {
            if (result) {
                this.setState({
                    verified: result
                })
            }
        })
    }

    newLoan = async () => {
        const books = this.props.navigation.getParam('bookid')
        const data = {
            id_book: books.id_book,
            id_card: await AsyncStorage.getItem('Cardid'),
            name: await AsyncStorage.getItem('Name')
        }
        this.props.dispatch(postLoaning(data))
        this.setState({
            loanings: this.props.loaning
        })
        Alert.alert(
            'Success',
            'Berhasil Meminjam',
            [
                { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
            ],
            { cancelable: false },
        );
    }
    render() {
        const books = this.props.navigation.getParam('bookid')

        return (
            <>
                <ScrollView>
                    <View style={{ backgroundColor: 'grey', marginTop: 0 }}>
                        <Image
                            style={{ height: 200, width: 380 }}
                            source={{ uri: books.image }} />
                        <View style={{ backgroundColor: '#f8f7fb', borderRadius: 20, marginTop: -30 }}>
                            <View style={{ height: '100%', padding: 20, alignContent: 'center' }}>
                                <Image
                                    style={{ height: 240, width: 160, marginTop: -140, marginLeft: 80, borderRadius: 10 }}
                                    source={{ uri: books.image }} />
                                <H3 style={{
                                    fontWeight: "900", width: 250, color: '#4d4f4e', textAlign: 'center', marginLeft: 30, marginTop: 20
                                }}>{books.title}</H3>
                                <Text style={{ textAlign: 'center' }}>Penulis : {books.writter}</Text>
                                {books.status === "Tersedia"
                                    ?
                                    <Text
                                        style={{
                                            color: 'white', backgroundColor: '#2fcc80', justifyContent: 'center', textAlign: 'center', borderRadius: 20, paddingVertical: 5, marginTop: 20, height: 30, fontWeight: 'bold'
                                        }}>{books.status}</Text>
                                    :
                                    <Text
                                        style={{
                                            color: '#ec6511', backgroundColor: '#e9c1a7', justifyContent: 'center', textAlign: 'center', borderRadius: 20, paddingVertical: 5, marginTop: 20, height: 30, fontWeight: 'bold'
                                        }}>{books.status}</Text>
                                }
                                <Text style={{
                                    textAlign: 'justify', marginTop: 10
                                }}>{books.description}</Text>

                            </View>
                        </View>
                    </View >
                </ScrollView>
                {
                    this.state.verified === '1'
                        ?
                        books.status === "Tersedia"
                            ?
                            <Button style={{ justifyContent: 'center', textAlign: 'center', backgroundColor: '#2fcc80' }} onPress={() => this.newLoan()} >
                                <Text style={{ color: 'white' }}> PINJAM </Text>
                            </Button>
                            :
                            <Text style={{ marginTop: -20 }}> </Text>
                        :
                        this.state.verified === '0'
                            ?
                            <Button style={{ justifyContent: 'center', textAlign: 'center', color: '#2fcc80' }} disabled >
                                <Text style={{ color: 'white' }}> Harus Verified Dulu Bro </Text>
                            </Button>
                            :
                            <Button style={{ justifyContent: 'center', textAlign: 'center', backgroundColor: '#2fcc80' }} onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={{ color: 'white' }}>Login dulu Dong bro </Text>
                            </Button>

                }
            </>

        )
    }
}

const mapStateToProps = state => {
    return {
        loaning: state.loaning.loaningList
    };
};

export default connect(mapStateToProps)(Detail);