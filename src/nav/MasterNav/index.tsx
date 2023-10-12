import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginSignup from '../../screens/Login&SignUp';
import OnboardingScreen from '../../screens/OnBoardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from '../Tabs';
import DelCart from '../../screens/DelCart';
import Header from '../../components/Header';
import SignUp from '../../screens/SignUp';
import Login from '../../screens/Login';
import auth from '@react-native-firebase/auth';

const MasterNav = () => {
    const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        async function getFirstLaunch() {
            const appData = await AsyncStorage.getItem('isAppFirstLaunched');
            if (appData == null) {
                setIsAppFirstLaunched(true);
                AsyncStorage.setItem('isAppFirstLaunched', 'false');
            } else {
                setIsAppFirstLaunched(false);
            }
        }
        getFirstLaunch();
    }, []);

    function onAuthStateChanged(user: any) {
        setUser(user);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const Stack = createNativeStackNavigator();
    return (
        isAppFirstLaunched != null && (
            <Stack.Navigator>
                {/* {isAppFirstLaunched ? (
                    <Stack.Screen
                        options={{
                            headerShown: false,
                        }}
                        name="Onboarding"
                        component={OnboardingScreen}
                    />
                ) :  */}
                {user ? (
                    <Stack.Screen
                        options={{
                            gestureEnabled: false,
                            headerShown: false,
                        }}
                        name="Main"
                        component={Tabs}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            options={{
                                gestureEnabled: false,
                                headerShown: false,
                            }}
                            name="Login"
                            component={Login}
                        />
                        <Stack.Screen
                            options={{
                                gestureEnabled: false,
                                headerShown: false,
                            }}
                            name="SignUp"
                            component={SignUp}
                        />
                    </>
                )}
                {/* <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="Login&SignUp"
                    component={LoginSignup}
                /> */}
            </Stack.Navigator>
        )
    );
};

export default MasterNav;
