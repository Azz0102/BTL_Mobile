import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './HomeScreen';
import Empty from '../Empty';
import Header from '../../components/Header';
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import HomeScreen from '../HomeScreen';
import FoodDetails from '../FoodDetailScreen';

// import FoodDetailsScreen from './FoodDetailsScreen';

const HomenDetailsScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <Button
                onPress={() => {
                    auth()
                        .signOut()
                        .then(() => {
                            GoogleSignin.revokeAccess();
                            console.log('User signed out!');
                        });
                }}
                title="Sign out"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
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
