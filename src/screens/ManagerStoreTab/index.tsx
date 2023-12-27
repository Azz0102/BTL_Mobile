import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Empty from '../Empty';
import Header from '../../components/Header';
import ManagerStoreScreen from '../ManagerStoreScreen';
import AddEmployee from '../AddEmployee';
import EmployeeDetail from '../EmployeeDetail';
import MenuItemDetail from '../MenuItemDetail';
import AddMenuItemScreen from '../AddMenuItemScreen';
import CustomerOrderDetail from '../CustomerOrderDetail';
import UserInfo from '../UserInfo';

const ManagerStoreTab = () => {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="ManagerStoreScreen"
                    component={ManagerStoreScreen}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="AddRestaurant"
                    component={Empty}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="AddEmployee"
                    component={AddEmployee}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="EmployeeDetail"
                    component={EmployeeDetail}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="MenuItemDetail"
                    component={MenuItemDetail}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="AddMenuItemScreen"
                    component={AddMenuItemScreen}
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
                    name="UserInfo"
                    component={UserInfo}
                />
            </Stack.Navigator>
        </>
    );
};

export default ManagerStoreTab;
