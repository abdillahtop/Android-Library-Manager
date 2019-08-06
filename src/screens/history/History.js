import React, { Component } from 'react'
import { View, Image, AsyncStorage, FlatList } from 'react-native'
import { Container, Content, Card, CardItem, Text, Left, Body } from 'native-base';
import { getLoaningUser } from '../../public/redux/action/loaning'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';

class History extends Component {
    constructor() {
        super();
        this.state = {
            loanings: []

        }
    }
    componentDidMount = async () => {
        const cardid = await AsyncStorage.getItem('Cardid')
        const token = await AsyncStorage.getItem('Token')
        const userid = await AsyncStorage.getItem('Userid')
        console.warn("id card:" + cardid, "token :" + token, "user id:" + userid)
        await this.props.dispatch(getLoaningUser(cardid, token, userid));
        this.setState({
            loanings: this.props.loaning
        });
    };

    formatDate(date) {
        let data = Date.parse(date);
        let newDate = new Date(data);
        let day = newDate.getDate();
        let months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        let month = months[newDate.getMonth()];
        let year = newDate.getFullYear();
        return `${day} ${month} ${year}`
    }

    render() {
        return (
            <Container>
                <Content style={{ marginHorizontal: 15 }}>
                    <View style={{ marginTop: 15 }}>
                        <FlatList
                            data={this.props.loaning}
                            keyExtractor={(item) => item.title}
                            renderItem={({ item, index }) => {
                                return (
                                    <ScrollView>
                                        <Card key={index} style={{ flex: 0 }}>
                                            {
                                                item.is_return === 'True'
                                                    ?
                                                    <CardItem
                                                        style={{ backgroundColor: '#00C890' }}
                                                    >
                                                        <Left>
                                                            <Image source={{ uri: 'https://api-library-abdi.herokuapp.com/' + item.image }} style={{ width: 70, height: 100 }} />
                                                            <Body>
                                                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
                                                                <Text style={{ color: 'white', fontSize: 14 }}>Penulis : {item.writter}</Text>
                                                                <Text style={{ color: 'white', fontSize: 14 }}>Peminjaman : {this.formatDate(item.borrow_date)}</Text>
                                                                <Text style={{ color: 'white', fontSize: 14 }}>Harus Kembali : {this.formatDate(item.expaired)}</Text>
                                                                <Text style={{ color: 'white', fontSize: 14 }}>Denda : {item.forfeit}</Text>
                                                            </Body>
                                                        </Left>
                                                    </CardItem>
                                                    :
                                                    item.is_return === 'False'
                                                        ?
                                                        <CardItem
                                                            style={{ backgroundColor: 'red' }}
                                                        >
                                                            <Left>
                                                                <Image source={{ uri: 'https://api-library-abdi.herokuapp.com/' + item.image }} style={{ width: 70, height: 100 }} />
                                                                <Body>
                                                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
                                                                    <Text style={{ color: 'white', fontSize: 14 }}>Penulis : {item.writter}</Text>
                                                                    <Text style={{ color: 'white', fontSize: 14 }}>Peminjaman : {this.formatDate(item.borrow_date)}</Text>
                                                                    <Text style={{ color: 'white', fontSize: 14 }}>Harus Kembali : {this.formatDate(item.expaired)}</Text>
                                                                    <Text style={{ color: 'white', fontSize: 14 }}>Denda : {item.forfeit}</Text>
                                                                </Body>
                                                            </Left>
                                                        </CardItem>
                                                        :
                                                        ''
                                            }
                                        </Card>
                                    </ScrollView>
                                );
                            }
                            }>
                        </FlatList>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        loaning: state.loaning.loaningList
    };
};

export default connect(mapStateToProps)(History);