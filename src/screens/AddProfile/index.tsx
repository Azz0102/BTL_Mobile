import React, { useState } from 'react';
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { styles } from './style';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from 'react-native-heroicons/solid';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const roles = ['Customer', 'Manager', 'Chef', 'Servant', 'Cashier'];

const AddProfile = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [role, setRole] = useState('');

    console.log(auth().currentUser);

    const handleNext = async () => {
        if (role === 'Servant') {
            try {
                const data = await instance.post('/Users/createProfile', {
                    UserID: auth().currentUser?.uid,
                    Role: 'Servant',
                });
                await AsyncStorage.setItem('profile_token', data.data[0].token);
                await AsyncStorage.setItem('codename', data.data[0].CodeName);
                await AsyncStorage.setItem(
                    'profileID',
                    data.data[0].ID.toString(),
                );
            } catch (error) {
                console.log(error);
            }
            await AsyncStorage.setItem('active', 'false');
            navigation.navigate('Servant');
        } else if (role === 'Manager') {
            try {
                const data = await instance.post('/Users/createProfile', {
                    UserID: auth().currentUser?.uid,
                    Role: 'Manager',
                });
                console.log(data.data);
                await AsyncStorage.setItem('profile_token', data.data[0].token);
                await AsyncStorage.setItem('codename', data.data[0].CodeName);
                await AsyncStorage.setItem(
                    'profileID',
                    data.data[0].ID.toString(),
                );
            } catch (error) {
                console.log(error);
            }
            navigation.navigate('Manager');
        } else if (role === 'Customer') {
            try {
                const data = await instance.post('/Users/createProfile', {
                    UserID: auth().currentUser?.uid,
                    Role: 'Customer',
                });
                await AsyncStorage.setItem('profile_token', data.data[0].token);
                await AsyncStorage.setItem('codename', data.data[0].CodeName);
                await AsyncStorage.setItem(
                    'profileID',
                    data.data[0].ID.toString(),
                );
            } catch (error) {
                console.log(error);
            }
            navigation.navigate('Customer');
        } else if (role === 'Chef') {
            try {
                const data = await instance.post('/Users/createProfile', {
                    UserID: auth().currentUser?.uid,
                    Role: 'Chef',
                });
                await AsyncStorage.setItem('profile_token', data.data[0].token);
                await AsyncStorage.setItem('codename', data.data[0].CodeName);
                await AsyncStorage.setItem(
                    'profileID',
                    data.data[0].ID.toString(),
                );
            } catch (error) {
                console.log(error);
            }
            navigation.navigate('Chef');
        } else if (role === 'Cashier') {
            try {
                const data = await instance.post('/Users/createProfile', {
                    UserID: auth().currentUser?.uid,
                    Role: 'Chef',
                });
                await AsyncStorage.setItem('profile_token', data.data[0].token);
                await AsyncStorage.setItem('codename', data.data[0].CodeName);
                await AsyncStorage.setItem(
                    'profileID',
                    data.data[0].ID.toString(),
                );
            } catch (error) {
                console.log(error);
            }
            navigation.navigate('Cashier');
        }
    };

    return (
        <View
            style={{
                // Paddings to handle safe area
                paddingTop:
                    Platform.OS === 'ios'
                        ? insets.top
                        : initialWindowMetrics?.insets.top,
                paddingBottom:
                    Platform.OS === 'ios'
                        ? insets.bottom
                        : initialWindowMetrics?.insets.bottom,
                paddingLeft:
                    Platform.OS === 'ios'
                        ? insets.left
                        : initialWindowMetrics?.insets.left,
                paddingRight:
                    Platform.OS === 'ios'
                        ? insets.right
                        : initialWindowMetrics?.insets.right,
            }}
            className="flex-1 bg-white justify-center">
            <Text className="text-center text-2xl font-bold mb-2 text-slate-800">
                Which role are you?
            </Text>
            <SelectDropdown
                data={roles}
                onSelect={(selectedItem, index) => {
                    setRole(selectedItem);
                    console.log(selectedItem, index);
                }}
                buttonStyle={styles.buttonDropDown}
                dropdownStyle={styles.dropDown}
            />
            {/* <Text className="text-center text-2xl font-bold mb-2 text-slate-800 mt-4">
                Your Phone Number
            </Text>
            <View className="w-full items-center">
                <TextInput
                    style={styles.phoneNumberInput}
                    keyboardType="numeric"
                    onChangeText={onChangeNumber}
                    value={number}
                />
            </View> */}
            <View className="flex flex-row justify-between mx-4 mt-4">
                <TouchableOpacity
                    className="flex flex-row items-center bg-orange-400 p-2 rounded-full"
                    onPress={() => navigation.navigate('ListProfile')}>
                    <ChevronLeftIcon size={28} color="black" />
                    <Text className="text-slate-800 mx-2 font-bold">Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex flex-row items-center bg-orange-400 p-2 rounded-full"
                    onPress={handleNext}>
                    <Text className="text-slate-800 mx-2 font-bold">Next</Text>
                    <ChevronRightIcon size={28} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddProfile;
