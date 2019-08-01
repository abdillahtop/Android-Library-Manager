import React, { Component } from 'react'
import { View, Text } from 'native-base'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <View style={{ marginHorizontal: 20 }}>
                    <Text>Ini Profilenya</Text>
                </View>

            </>
        )
    }
}