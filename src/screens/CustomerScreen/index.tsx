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
    ClipboardDocumentListIcon as ClipO,
} from 'react-native-heroicons/outline';
import {
    HomeIcon as HomeS,
    ShoppingCartIcon as CartS,
    UserIcon as UserS,
    TruckIcon as DelS,
    ChatBubbleLeftRightIcon as ChatS,
    BuildingStorefrontIcon as StoreS,
    ClipboardDocumentListIcon as ClipS,
} from 'react-native-heroicons/solid';
import Header from '../../components/Header';
import UsernScreens from '../../screens/UsernScreens';
import DelnScreens from '../../screens/DelnScreens';
import CustomerHomeTab from '../CustomerHomeTab';
import CustomerOrderTab from '../CustomerOrderTab';

const Tab = createBottomTabNavigator();

const CustomerScreen = ({ navigation }) => {
    return (
        <Tab.Navigator initialRouteName="Customer">
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
                name="CustomerHomeTab"
                component={CustomerHomeTab}
            />
            <Tab.Screen
                name="Order"
                component={CustomerOrderTab}
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
                                <ClipS size={28} color="orange" />
                            ) : (
                                <ClipO size={28} color="orange" />
                            )}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Message"
                component={DelnScreens}
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

export default CustomerScreen;
