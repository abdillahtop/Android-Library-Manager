import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Container, Content, Text, } from 'native-base';

export default class History extends Component {

    render() {
        return (
            <Container>
                <Content style={{ marginHorizontal: 20 }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 20,
                        marginTop: 60
                    }}>
                        <Image style={{ height: 200, width: 120, marginTop: 60 }} source={require('../../assets/error.png')} />
                        <Text style={{ fontWeight: '900', fontSize: 24, color: '#444', marginTop: 20 }}>Dalam Pengembangan</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}
