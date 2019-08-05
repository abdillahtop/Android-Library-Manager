import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { H3, Toast } from 'native-base'
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class Detail extends Component {
    render() {
        const books = this.props.navigation.getParam('bookid')
        return (
            <>
                <ScrollView>
                    <View style={{ backgroundColor: 'grey', marginTop: 0 }}>
                        <Image
                            style={{ height: 200, width: 380 }}
                            source={{ uri: books.image }} />
                        <View style={{ backgroundColor: '#f8f7fb', borderRadius: 20, marginTop: -30 }}>
                            <View style={{ height: '100%', padding: 20, alignContent: 'center' }}>
                                <Image
                                    style={{ height: 240, width: 160, marginTop: -140, marginLeft: 80, borderRadius: 10 }}
                                    source={{ uri: books.image }} />
                                <H3 style={{
                                    fontWeight: "900", width: 250, color: '#4d4f4e', textAlign: 'center', marginLeft: 30, marginTop: 20
                                }}>{books.title}</H3>

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
                    onPress={() =>
                        Toast.show({
                            text: "Wrong password!",
                            buttonText: "Okay",
                            duration: 3000
                        })}
                    style={{
                        color: "#2fcc80", height: 30
                    }}
                />
            </>

        )
    }
}