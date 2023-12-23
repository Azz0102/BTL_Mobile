import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Empty from '../Empty';
import Header from '../../components/Header';
import CustomerHomeScreen from '../CustomerHomeScreen';
import RestaurantDetail from '../RestaurantDetail';
import OrderScreen from '../OrderScreen';
import OrderMenu from '../OrderMenu';
import OrderMenuItemDetail from '../OrderMenuItemDetail';
import CustomerOrderTabScreen from '../CustomerOrderTabScreen';
import CustomerOrderDetail from '../CustomerOrderDetail';
import CustomerPayment from '../CustomerPayment';

const CustomerOrderTab = () => {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="CustomerOrderTabScreen"
                    component={CustomerOrderTabScreen}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="CustomerOrderDetail"
                    component={CustomerOrderDetail}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="CustomerPayment"
                    component={CustomerPayment}
                />
            </Stack.Navigator>
        </>
    );
};

export default CustomerOrderTab;
