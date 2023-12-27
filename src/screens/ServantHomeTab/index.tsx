import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Empty from '../Empty';
import Header from '../../components/Header';
import RestaurantDetail from '../RestaurantDetail';
import OrderScreen from '../OrderScreen';
import OrderMenu from '../OrderMenu';
import OrderMenuItemDetail from '../OrderMenuItemDetail';
import ServantHomeScreen from '../ServantHomeScreen';
import CustomerOrderDetail from '../CustomerOrderDetail';
import UserInfo from '../UserInfo';

const ServantHomeTab = () => {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="ServantHomeScreen"
                    component={ServantHomeScreen}
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
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="UserInfo"
                    component={UserInfo}
                />
            </Stack.Navigator>
        </>
    );
};

export default ServantHomeTab;
