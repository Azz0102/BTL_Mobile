import { Modal, Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    HomeIcon as HomeO,
    ShoppingCartIcon as CartO,
    UserIcon as UserO,
    TruckIcon as DelO,
    BuildingStorefrontIcon as StoreO,
    ChatBubbleLeftRightIcon as ChatO,
} from 'react-native-heroicons/outline';
import {
    HomeIcon as HomeS,
    ShoppingCartIcon as CartS,
    UserIcon as UserS,
    TruckIcon as DelS,
    ChatBubbleLeftRightIcon as ChatS,
    BuildingStorefrontIcon as StoreS,
} from 'react-native-heroicons/solid';
import Header from '../../components/Header';
import HomenDetailsScreen from '../../screens/HomenDetailsScreen';
import CartScreen from '../../screens/CartScreen';
// import {firebase} from '../Firebase/firebaseConfig';
// import firestore from '@react-native-firebase/firestore';
// import {firebase as firebaseAuth} from '@react-native-firebase/auth';
import UsernScreens from '../../screens/UsernScreens';
import DelnScreens from '../../screens/DelnScreens';
import ManagerHomeTab from '../ManagerHomeTab';
import ManagerStoreTab from '../ManagerStoreTab';
import ChatScreen from '../ChatScreen';

const Tab = createBottomTabNavigator();

const ManagerScreen = ({ navigation }) => {
    return (
        <Tab.Navigator initialRouteName="Manager">
            <Tab.Screen
                options={{
                    gestureEnabled: false,
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        shadowColor: '#7F5DF0',
                        shadowOffset: {
                            width: 0,
                            height: 10,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.5,
                        elevation: 5,
                        height: 80,
                        bottom: 0,
                        borderTopLeftRadius: 70,
                        borderTopRightRadius: 70,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`relative ${
                                focused ? 'bg-orange-100' : ''
                            } p-3 rounded-full`}>
                            {focused ? (
                                <HomeS size={28} color="orange" />
                            ) : (
                                <HomeO size={28} color="orange" />
                            )}
                        </View>
                    ),
                }}
                name="ManagerHomeTab"
                component={ManagerHomeTab}
            />
            <Tab.Screen
                name="Restaurant"
                component={ManagerStoreTab}
                options={{
                    gestureEnabled: false,
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        shadowColor: '#7F5DF0',
                        shadowOffset: {
                            width: 0,
                            height: 10,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.5,
                        elevation: 5,
                        height: 80,
                        bottom: 0,
                        borderTopLeftRadius: 70,
                        borderTopRightRadius: 70,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`relative ${
                                focused ? 'bg-orange-100' : ''
                            } p-3 rounded-full`}>
                            {focused ? (
                                <StoreS size={28} color="orange" />
                            ) : (
                                <StoreO size={28} color="orange" />
                            )}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Message"
                component={ChatScreen}
                options={{
                    tabBarShowLabel: false,
                    headerStyle: {
                        elevation: 0,
                    },
                    header: ({ navigation }) => (
                        <Header
                            navigation={navigation}
                            share={false}
                            title=""
                        />
                    ),
                    headerShown: false,
                    headerShadowVisible: false,
                    tabBarStyle: {
                        position: 'absolute',
                        shadowColor: '#7F5DF0',
                        shadowOffset: {
                            width: 0,
                            height: 10,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.5,
                        elevation: 5,
                        height: 80,
                        bottom: 0,
                        borderTopLeftRadius: 70,
                        borderTopRightRadius: 70,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`relative ${
                                focused ? 'bg-orange-100' : ''
                            } p-3 rounded-full`}>
                            {focused ? (
                                <ChatS size={28} color="orange" />
                            ) : (
                                <ChatO size={28} color="orange" />
                            )}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        shadowColor: '#7F5DF0',
                        shadowOffset: {
                            width: 0,
                            height: 10,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.5,
                        elevation: 5,
                        height: 80,
                        bottom: 0,
                        borderTopLeftRadius: 70,
                        borderTopRightRadius: 70,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View
                            className={`relative ${
                                focused ? 'bg-orange-100' : ''
                            } p-3 rounded-full`}>
                            {focused ? (
                                <UserS size={28} color="orange" />
                            ) : (
                                <UserO size={28} color="orange" />
                            )}
                        </View>
                    ),
                }}
                name="User"
                component={UsernScreens}
            />
        </Tab.Navigator>
    );
};

export default ManagerScreen;
