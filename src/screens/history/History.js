import React, { Component } from 'react'
import { View, Image, AsyncStorage, FlatList, ActivityIndicator, Alert } from 'react-native'
import { Container, Content, Card, CardItem, Text, Left, Body } from 'native-base';
import { getLoaningUser } from '../../public/redux/action/loaning'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';

class History extends Component {
    constructor() {
        super();
        this.state = {
            loanings: [],
            showloading: true

        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                showloading: false
            })
        }, 1000);
    }

    componentDidMount = async () => {
        const cardid = await AsyncStorage.getItem('Cardid')
        const token = await AsyncStorage.getItem('Token')
        const userid = await AsyncStorage.getItem('Userid')
        console.warn("id card:" + cardid, "token :" + token, "user id:" + userid)
        if (token !== null) {
            await this.props.dispatch(getLoaningUser(cardid, token, userid));
            this.setState({
                loanings: this.props.loaning
            });
        } else {
            Alert.alert(
                'Gagal!',
                'Anda Belum Login...',
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
                ],
                { cancelable: false },
            );
        }
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
                    {this.state.showloading
                        ?
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            marginTop: 250
                        }}>
                            <ActivityIndicator />
                        </View>
                        :

                        <View style={{ marginTop: 15 }}>


                            <FlatList
                                data={this.props.loaning}
                                keyExtractor={(item) => item.title}
                                renderItem={({ item, index }) => {
                                    return (
                                        <ScrollView showsHorizontalScrollIndicator={false}>

                                            <Card key={index} style={{ flex: 0 }}>
                                                {
                                                    item.is_return === 'True'
                                                        ?
                                                        <CardItem
                                                            style={{ backgroundColor: '#00C890' }}
                                                        >
                                                            <Left>
                                                                <Image source={{ uri: item.image }} style={{ width: 70, height: 100 }} />
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
                                                                style={{ backgroundColor: '#e9c1a7' }}
                                                            >
                                                                <Left>
                                                                    <Image source={{ uri: item.image }} style={{ width: 70, height: 100 }} />
                                                                    <Body>
                                                                        <Text style={{ color: '#ec6511', fontWeight: 'bold' }}>{item.title}</Text>
                                                                        <Text style={{ color: '#ec6511', fontSize: 14 }}>Penulis : {item.writter}</Text>
                                                                        <Text style={{ color: '#ec6511', fontSize: 14 }}>Peminjaman : {this.formatDate(item.borrow_date)}</Text>
                                                                        <Text style={{ color: '#ec6511', fontSize: 14 }}>Harus Kembali : {this.formatDate(item.expaired)}</Text>
                                                                        <Text style={{ color: '#ec6511', fontSize: 14 }}>Denda : {item.forfeit}</Text>
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
                    }
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