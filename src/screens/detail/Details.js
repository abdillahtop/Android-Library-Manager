import React, { Component } from 'react'
import { View, Image, Text, AsyncStorage } from 'react-native'
import { H3 } from 'native-base'
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { postLoaning } from '../../public/redux/action/loaning'

class Detail extends Component {
    constructor() {
        super();
        this.state = {
            loanings: []
        }
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
    }
    render() {
        const books = this.props.navigation.getParam('bookid')

        return (
            <>
                <ScrollView>
                    <View style={{ backgroundColor: 'grey', marginTop: 0 }}>
                        <Image
                            style={{ height: 200, width: 380 }}
                            source={{ uri: 'https://api-library-abdi.herokuapp.com/' + books.image }} />
                        <View style={{ backgroundColor: '#f8f7fb', borderRadius: 20, marginTop: -30 }}>
                            <View style={{ height: '100%', padding: 20, alignContent: 'center' }}>
                                <Image
                                    style={{ height: 240, width: 160, marginTop: -140, marginLeft: 80, borderRadius: 10 }}
                                    source={{ uri: 'https://api-library-abdi.herokuapp.com/' + books.image }} />
                                <H3 style={{
                                    fontWeight: "900", width: 250, color: '#4d4f4e', textAlign: 'center', marginLeft: 30, marginTop: 20
                                }}>{books.title}</H3>
                                <Text style={{ textAlign: 'center' }}>Penulis : {books.writter}</Text>

                                <Text
                                    style={{
                                        color: 'white', backgroundColor: '#2fcc80', justifyContent: 'center', textAlign: 'center', borderRadius: 20, paddingVertical: 5, marginTop: 20
                                    }}>{books.status}</Text>

                                <Text style={{
                                    textAlign: 'justify', marginTop: 10
                                }}>{books.description}</Text>

                            </View>
                        </View>
                    </View >
                </ScrollView>
                <Button
                    title="Pinjam"
                    type="outline"
                    onPress={() => this.newLoan()}
                    style={{
                        color: "#2fcc80", height: 30
                    }}
                />
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