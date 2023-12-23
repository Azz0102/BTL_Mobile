import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './HomeScreen';
import Empty from '../Empty';
import Header from '../../components/Header';
import UserProfile from '../UserProfile';
import ManagerHomeScreen from '../ManagerHomeScreen';
import AddRestaurantScreen from '../AddRestaurantScreen';

// import FoodDetailsScreen from './FoodDetailsScreen';

const ManagerHomeTab = () => {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="ManagerHomeScreen"
                    component={ManagerHomeScreen}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="AddRestaurant"
                    component={AddRestaurantScreen}
                />
            </Stack.Navigator>
        </>
    );
};

export default ManagerHomeTab;
