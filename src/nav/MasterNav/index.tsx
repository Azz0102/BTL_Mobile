import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginSignup from '../../screens/Login&SignUp';
import OnboardingScreen from '../../screens/OnBoardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from '../Tabs';
import DelCart from '../../screens/DelCart';
import Header from '../../components/Header';

const MasterNav = () => {
    const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(true);

    React.useEffect(() => {
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
    const Stack = createNativeStackNavigator();
    return (
        isAppFirstLaunched != null && (
            <Stack.Navigator>
                {isAppFirstLaunched && (
                    <Stack.Screen
                        options={{
                            headerShown: false,
                        }}
                        name="Onboarding"
                        component={OnboardingScreen}
                    />
                )}
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="Login&SignUp"
                    component={LoginSignup}
                />
                <Stack.Screen
                    options={{
                        gestureEnabled: false,
                        header: ({ route, navigation }) => (
                            <Header
                                title="Checkout"
                                back={false}
                                logout={false}
                            />
                        ),
                    }}
                    name="DeliveryCart"
                    component={DelCart}
                />
                <Stack.Screen
                    options={{
                        gestureEnabled: false,
                        headerShown: false,
                    }}
                    name="Main"
                    component={Tabs}
                />
            </Stack.Navigator>
        )
    );
};

export default MasterNav;
