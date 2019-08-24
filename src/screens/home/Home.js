import React, { Component } from 'react'
import { StyleSheet, FlatList, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Input, Card, CardItem, Fab, Item } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            page: 1,
            isLoading: false,
            refreshing: false
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true }, this.getData)
    }

    getData = async () => {
        const url = 'https://api-library-abdi.herokuapp.com/book/all?limit=6&page=' + this.state.page;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.warn('dari respon json', responseJson.totalPage)
                this.setState({
                    data: this.state.data.concat(responseJson.result)
                })
            })

    }

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    marginHorizontal: 13,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => { this.props.navigation.navigate('Detail', { bookid: item }) }}>
                <Card
                    style={{ height: 'auto', width: 140 }}>
                    <CardItem cardBody>
                        <Image
                            style={{ height: 200, width: 140 }}
                            source={{ uri: item.image }} />
                    </CardItem>
                </Card>
            </TouchableOpacity>

        )
    }

    handleLoadMore = () => {
        const url = 'https://api-library-abdi.herokuapp.com/book/all?limit=6&page=' + this.state.page;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.warn("Page :", responseJson.totalPage)
                if (this.state.page !== responseJson.totalPage) {
                    this.setState(
                        { page: this.state.page + 1, isLoading: true },
                        this.getData
                    )
                } else {
                    this.setState(
                        this.renderFooter
                    )
                }
                console.warn('Page', this.state.page)
            })

    }

    makeRequest = () => {
        const url = 'https://api-library-abdi.herokuapp.com/book/all?limit=6&page=1'
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    data: responseJson.result,
                    refreshing: false
                })
            })
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true,
        }, () => {
            this.makeRequest();
        })
    }

    renderFooter = () => {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    render() {
        return (
            <View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <Item rounded style={{ marginBottom: 20, width: '90%', marginTop: 30 }}>
                        <Input style={{ paddingLeft: 20, height: 40 }} placeholder="Search..." />
                    </Item>
                </View>
                <FlatList
                    style={styles.container}
                    data={this.state.data}
                    renderItem={this.renderRow}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
                <Fab
                    style={{ backgroundColor: '#00C890' }}
                    position='bottomRight'
                    onPress={() => this.props.navigation.navigate('Donate')}>
                    <Ionicons size={30} name="ios-add" />

                </Fab>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#fff'
    },
    item: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    itemImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    itemText: {
        fontSize: 16,
        padding: 5
    },
    loader: {
        marginTop: 10,
        alignItems: 'center'
    }
})