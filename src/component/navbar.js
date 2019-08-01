import React, { Component } from 'react'
import { Content, Footer, FooterTab, Button, Text } from 'native-base';


export default class Navbar extends Component {

    render() {
        return (
            <>
                <Content style={{
                    marginHorizontal: 20,

                }}>
                    <Text>
                        COba dulu gaes
                            </Text>
                </Content>
                <Footer>
                    <FooterTab style={{
                        backgroundColor: '#00C890'
                    }}>
                        <Button vertical active style={{ backgroundColor: '#00C890' }}>
                            <Text style={{
                                color: 'white'
                            }}>Home</Text>
                        </Button>
                        <Button
                            vertical onPress={() => this.props.navigation.navigate('History')}>
                            <Text style={{
                                color: 'white'
                            }}>History</Text>
                        </Button>
                        <Button vertical>
                            <Text style={{
                                color: 'white'
                            }}>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </>
        )
    }
}
