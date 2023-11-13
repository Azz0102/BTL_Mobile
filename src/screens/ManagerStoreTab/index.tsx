import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Empty from '../Empty';
import Header from '../../components/Header';
import ManagerStoreScreen from '../ManagerStoreScreen';

// import FoodDetailsScreen from './FoodDetailsScreen';

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
            </Stack.Navigator>
        </>
    );
};

export default ManagerStoreTab;
