import React, { Component } from 'react';
import { Alert } from 'react-native'
import { Input, Item, View, H3, Form, Textarea, Button, Text } from 'native-base';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { postBook } from '../../public/redux/action/book';

class AddBook extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
            title: '',
            writer: '',
            image: '',
            description: '',
            id_category: 0
        }
    }

    donateBook(data) {
        this.props.dispatch(postBook(data))
        this.setState({
            books: this.props.book
        })
        Alert.alert(
            'Success',
            'Terima Kasih Telah Mendonasi :)',
            [
                { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
            ],
            { cancelable: false },
        );
    }

    render() {
        const data = {
            title: this.state.title,
            writter: this.state.writter,
            image: this.state.image,
            description: this.state.description,
            id_category: this.state.id_category,
        }
        return (
            <ScrollView>
                <View>
                    <H3 style={{ textAlign: 'center', marginVertical: 20 }}>Menyumbang Buku</H3>
                    <View style={{ marginHorizontal: 15 }}>
                        <Item regular style={{ marginVertical: 8 }}>
                            <Input placeholder='Title book...' placeholderIconColor='#f8f7fb' onChangeText={title => this.setState({ title })} style={{ paddingLeft: 10, height: 40 }} />
                        </Item>
                        <Item regular style={{ marginVertical: 8 }}>
                            <Input placeholder='Author...' placeholderIconColor='#f8f7fb' onChangeText={writter => this.setState({ writter })} style={{ paddingLeft: 10, height: 40 }} />
                        </Item>
                        <Item regular style={{ marginVertical: 8 }}>
                            <Input placeholder='URL image...' onChangeText={image => this.setState({ image })}
                                placeholderIconColor="#f8f7fb" style={{ paddingLeft: 10, height: 40 }} />
                        </Item>
                        <Item regular style={{ marginVertical: 8 }}>
                            <Input placeholder='Category...' onChangeText={id_category => this.setState({ id_category })}
                                placeholderIconColor='#f8f7fb' style={{ paddingLeft: 10, height: 40 }} />
                        </Item>
                        {/* <Item picker reguler>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                onChangeText={id_category => this.setState({ id_category })}
                            >
                                <Picker.Item label="Anak - Anak" value="1" />
                                <Picker.Item label="Novel" value="2" />
                                <Picker.Item label="Teknik" value="3" />
                                <Picker.Item label="Arsitektur & Design" value="4" />
                                <Picker.Item label="Pengetahuan" value=" 5" />
                            </Picker>
                        </Item> */}
                        <Form>
                            <Textarea rowSpan={5} bordered placeholder='Description' onChangeText={description => this.setState({ description })} />
                        </Form>
                        <Button
                            onPress={() => { this.donateBook(data) }}
                            style={{ backgroundColor: '#00C890', marginVertical: 20, justifyContent: 'center', textAlign: 'center' }}>
                            <Text style={{ fontWeight: '900' }}>Donate</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView >
        )
    }

}


const mapStateToProps = state => {
    return {
        book: state.book.bookList
    };
};

export default connect(mapStateToProps)(AddBook);
