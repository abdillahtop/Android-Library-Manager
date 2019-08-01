import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
} from 'react-navigation';

import Histori from '../../screens/history/History'
import Login from '../../screens/login/Login'
import Profile from '../../screens/profile/Profile'
import Home from '../../screens/home/Home';
import Detail from '../../screens/detail/Details';

const HomeScreen = createStackNavigator(
    {
        Home: { screen: Home },
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

// const AddStack = createStackNavigator(
//   {
//     Add: { screen: AddScreen },
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: 'black',
//       },
//       headerTintColor: 'white',
//       title: 'ADD',
//     },
//   }
// );

const BorrowScreen = createStackNavigator(
    {
        Borrow: { screen: Histori },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTintColor: 'white',
            title: 'BORROW',
        },
    }
);

const ProfileScreen = createStackNavigator(
    {
        Profile: { screen: Profile },
        // Register: {screen: Register},

    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTintColor: 'white',
            title: 'PROFILE',
        },
    }
);


const switchNavigator = createBottomTabNavigator(
    {

        Home: { screen: HomeScreen },
        // Add: { screen: AddStack },
        Borrow: { screen: BorrowScreen },
        Profile: { screen: ProfileScreen },

    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-home`;
                } else if (routeName === 'Search') {
                    iconName = `ios-search`;
                } else if (routeName === 'Add') {
                    iconName = `ios-add-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Borrow') {
                    iconName = `md-bookmarks`;
                } else if (routeName === 'Profile') {
                    iconName = `ios-contact`;
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
        },
    }
);

export default createAppContainer(switchNavigator);