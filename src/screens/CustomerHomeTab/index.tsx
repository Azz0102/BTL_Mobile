import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Empty from '../Empty';
import Header from '../../components/Header';
import CustomerHomeScreen from '../CustomerHomeScreen';
import RestaurantDetail from '../RestaurantDetail';
import OrderScreen from '../OrderScreen';
import OrderMenu from '../OrderMenu';
import OrderMenuItemDetail from '../OrderMenuItemDetail';

const CustomerHomeTab = () => {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="CustomerHomeScreen"
                    component={CustomerHomeScreen}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="RestaurantDetail"
                    component={RestaurantDetail}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="OrderScreen"
                    component={OrderScreen}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="OrderMenu"
                    component={OrderMenu}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="OrderMenuItemDetail"
                    component={OrderMenuItemDetail}
                />
            </Stack.Navigator>
        </>
    );
};

export default CustomerHomeTab;
