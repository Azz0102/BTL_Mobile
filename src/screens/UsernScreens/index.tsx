import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import HomeScreen from './HomeScreen';
import Empty from '../Empty';
import Header from '../../components/Header';
import UserProfile from '../UserProfile';

// import FoodDetailsScreen from './FoodDetailsScreen';

const UsernScreens = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={UserProfile}
        />
        <Stack.Screen
          options={{
            header: ({navigation, route}) => (
              <Header share={true} navigation={navigation} />
            ),
          }}
          name="FoodDetails"
          component={Empty}
        />
      </Stack.Navigator>
    </>
  );
};

export default UsernScreens;
