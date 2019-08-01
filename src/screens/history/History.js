import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Content, Text, } from 'native-base';

export default class History extends Component {

    render() {
        return (
            <Container>
                <Content style={{ marginHorizontal: 20 }}>
                    <View>
                        <Text style={{ fontSize: 50 }}>
                            Ini History
                        </Text>
                    </View>
                </Content>
            </Container>
        )
    }
}
