import React, { Component } from 'react';
import { Alert } from 'react-native'
import { Input, Item, View, H3, Form, Textarea, Button, Text, Row, Col, Thumbnail } from 'native-base';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import { postBook } from '../../public/redux/action/book';
import ImagePicker from 'react-native-image-picker';

class AddBook extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
            title: '',
            writter: '',
            image: null,
            location: '',
            description: '',
            id_category: 0
        }
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true
        }

        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ image: response })
            }
        })
    }

    donateBook() {
        if (this.state.title === '' && this.state.writter === '' && this.state.image === null && this.state.location === '' && this.state.description === '' && this.state.id_category === 0) {
            alert('Lengkapi Form')
        } else {
            let inputData = new FormData()
            inputData.append('title', this.state.title)
            inputData.append('writter', this.state.writter)
            inputData.append('image', {
                name: this.state.image.fileName,
                type: this.state.image.type || null,
                uri: this.state.image.uri
            })
            console.warn("Image:" + this.state.image.fileName)
            inputData.append('location', this.state.location)
            inputData.append('description', this.state.description)
            inputData.append('id_category', this.state.id_category)

            this.props.dispatch(postBook(inputData))
            this.setState({
                books: this.props.book
            })
        }


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
        const { image } = this.state
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
                            <Input placeholder='Category...' onChangeText={id_category => this.setState({ id_category })}
                                placeholderIconColor='#f8f7fb' style={{ paddingLeft: 10, height: 40 }} />
                        </Item>
                        <Item regular style={{ marginVertical: 8 }}>
                            <Input placeholder='Location...' onChangeText={location => this.setState({ location })}
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
                        <Row style={{ marginVertical: 10, borderColor: 'white', marginHorizontal: 20 }}>
                            <Col>
                                <Button style={{ marginLeft: -20, height: 40, width: 130 }} onPress={this.handleChoosePhoto} bordered success ><Text style={{ textAlign: 'center' }}>Choose Image</Text></Button>
                            </Col>
                            <Col>
                                {
                                    image && (
                                        <Thumbnail square large source={{ uri: image.uri }} style={{ marginLeft: 'auto' }} resizeMode='cover' />
                                    )
                                }
                            </Col>
                        </Row>
                        <Form>
                            <Textarea rowSpan={5} bordered placeholder='Description' onChangeText={description => this.setState({ description })} />
                        </Form>
                        <Button
                            onPress={() => { this.donateBook() }}
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
