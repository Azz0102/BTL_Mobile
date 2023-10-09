import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './HomeScreen';
import Empty from '../Empty';
import Header from '../../components/Header';
import HomeScreen from '../HomeScreen';
import FoodDetails from '../FoodDetailScreen';

// import FoodDetailsScreen from './FoodDetailsScreen';

const HomenDetailsScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="HomeScreen"
                    component={HomeScreen}
                />
                <Stack.Screen
                    options={{
                        header: ({ navigation, route }) => (
                            <Header share={true} navigation={navigation} />
                        ),
                    }}
                    name="FoodDetails"
                    component={FoodDetails}
                />
            </Stack.Navigator>
        </>
    );
};

export default HomenDetailsScreen;
