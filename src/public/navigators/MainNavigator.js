import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
} from 'react-navigation';

import Histori from '../../screens/history/History'
import Donate from '../../screens/home/Add'
import Login from '../../screens/login/Login'
import Register from '../../screens/login/Register'
import Profile from '../../screens/profile/Profile'
import Home from '../../screens/home/Home';
import Detail from '../../screens/detail/Details';

const HomeScreen = createStackNavigator(
    {
        Home: { screen: Home },
        Donate: { screen: Donate },
        Detail: { screen: Detail },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#00C890',
            },
            headerTintColor: 'white',
            title: 'BOOK',
        },
    }
);

const BorrowScreen = createStackNavigator(
    {
        Borrow: { screen: Histori },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#00C890',
            },
            headerTintColor: 'white',
            title: 'BORROW',
        },
    }
);

const ProfileScreen = createStackNavigator(
    {
        Login: { screen: Login },
        Register: { screen: Register },
        Profile: { screen: Profile },
        // Register: {screen: Register},

    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#00C890',
            },
            headerTintColor: 'white',
            title: 'PROFILE',
        },
    }
);


const switchNavigator = createBottomTabNavigator(
    {

        Home: { screen: HomeScreen },
        Borrow: { screen: BorrowScreen },
        Profile: { screen: ProfileScreen },

    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-home`
                } else if (routeName === 'Borrow') {
                    iconName = `md-bookmarks`;
                } else if (routeName === 'Profile') {
                    iconName = `ios-contact`;
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#00C890',
            inactiveTintColor: 'gray',
        },
    }
);

export default createAppContainer(switchNavigator);