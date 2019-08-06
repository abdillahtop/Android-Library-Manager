import React, { Component } from 'react'
import { View, Image, FlatList } from 'react-native'
import { Container, Content, Item, Input, Card, CardItem, Fab } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getBook } from '../../public/redux/action/book'
import { connect } from 'react-redux'

class Home extends Component {

    constructor() {
        super();
        this.state = {
            books: []
        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(getBook());
        this.setState({
            books: this.props.book,
        });
    };

    render() {
        return (
            <>
                <Container>
                    <ScrollView>
                        <Content>
                            <View style={{
                                backgroundColor: '#F8F7B'
                            }}>
                                <View style={{ alignItems: 'center', flex: 1 }}>
                                    <Item rounded style={{ marginBottom: 20, width: '90%', marginTop: 30 }}>
                                        <Input style={{ paddingLeft: 20, height: 40 }} placeholder="Search..." />
                                    </Item>
                                </View>
                                <View style={{ marginHorizontal: 10 }}>
                                    <FlatList
                                        data={this.props.book.bookList}
                                        numColumns={2}
                                        keyExtractor={(item) => item.id_book}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity
                                                    style={{
                                                        marginHorizontal: 13,
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                    onPress={() => { this.props.navigation.navigate('Detail', { bookid: item }) }}>
                                                    <Card
                                                        style={{ height: 'auto', width: 140 }}
                                                        key={index}>
                                                        <CardItem cardBody>
                                                            <Image
                                                                style={{ height: 200, width: 140 }}
                                                                source={{ uri: 'https://api-library-abdi.herokuapp.com/' + item.image }} />
                                                        </CardItem>
                                                    </Card>
                                                </TouchableOpacity>
                                            );
                                        }
                                        }>
                                    </FlatList>
                                </View>
                            </View>
                        </Content>
                    </ScrollView>
                    {/* <Button
                        title="+"
                        type="outline"
                        onPress={() => { this.props.navigation.navigate('Donate') }}
                    /> */}
                </Container>
                <Fab
                    style={{ backgroundColor: '#00C890' }}
                    position='bottomRight'
                    onPress={() => this.props.navigation.navigate('Donate')}>
                    <Ionicons size={30} name="ios-add" />

                </Fab>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        book: state.book,
    };
};

export default connect(mapStateToProps)(Home);
