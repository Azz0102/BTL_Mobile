import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './HomeScreen';
import Empty from '../Empty';
import Header from '../../components/Header';
import UserProfile from '../UserProfile';
import ManagerHomeScreen from '../ManagerHomeScreen';
import AddRestaurantScreen from '../AddRestaurantScreen';
import UpdateUser from '../UpdateUser';

// import FoodDetailsScreen from './FoodDetailsScreen';

const ProfileTab = () => {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="UserProfile"
                    component={UserProfile}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="UpdateUser"
                    component={UpdateUser}
                />
            </Stack.Navigator>
        </>
    );
};

export default ProfileTab;
