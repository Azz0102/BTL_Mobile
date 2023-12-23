import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { TrashIcon } from 'react-native-heroicons/solid';
import Modal from 'react-native-modal';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserCircleIcon } from 'react-native-heroicons/outline';

const ProfileItem = ({ title, id, navigation, role }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const handleDeleteProfile = async () => {
        try {
            const res = await instance.delete(
                `Users/deleteProfile?profileID=${id}`,
            );
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectProfile = async () => {
        try {
            const data = await instance.get(
                `/Users/GetSpecificProfile?profileID=${id}`,
            );
            console.log(data.data);
            const isWoking = data.data[0].isWorking + '';
            const resID = data.data[0].RestaurantID + '';
            if (role === 'Servant') {
                try {
                    await AsyncStorage.setItem('profileID', id.toString());
                    await AsyncStorage.setItem(
                        'profile_token',
                        data.data[0].token,
                    );
                    await AsyncStorage.setItem(
                        'codename',
                        data.data[0].CodeName,
                    );
                    await AsyncStorage.setItem('isWorking', isWoking);
                    await AsyncStorage.setItem('resId', resID);
                    await AsyncStorage.setItem('role', data.data[0].Role);
                } catch (error) {
                    console.log(error);
                }
                navigation.navigate('Servant');
            } else if (role === 'Manager') {
                try {
                    await AsyncStorage.setItem('profileID', id.toString());
                    await AsyncStorage.setItem(
                        'profile_token',
                        data.data[0].token,
                    );
                    await AsyncStorage.setItem(
                        'codename',
                        data.data[0].CodeName,
                    );
                    await AsyncStorage.setItem('isWorking', isWoking);
                    await AsyncStorage.setItem('role', data.data[0].Role);
                    await AsyncStorage.setItem('resId', resID);
                } catch (error) {
                    console.log(error);
                }
                navigation.navigate('Manager');
            } else if (role === 'Customer') {
                try {
                    await AsyncStorage.setItem('profileID', id.toString());
                    await AsyncStorage.setItem(
                        'profile_token',
                        data.data[0].token,
                    );
                    await AsyncStorage.setItem(
                        'codename',
                        data.data[0].CodeName,
                    );
                    await AsyncStorage.setItem('isWorking', isWoking);
                    await AsyncStorage.setItem('role', data.data[0].Role);
                    await AsyncStorage.setItem('resId', resID);
                } catch (error) {
                    console.log(error);
                }
                navigation.navigate('Customer');
            } else if (role === 'Chef') {
                try {
                    await AsyncStorage.setItem('profileID', id.toString());
                    await AsyncStorage.setItem(
                        'profile_token',
                        data.data[0].token,
                    );
                    await AsyncStorage.setItem(
                        'codename',
                        data.data[0].CodeName,
                    );
                    await AsyncStorage.setItem('isWorking', isWoking);
                    await AsyncStorage.setItem('role', data.data[0].Role);
                    await AsyncStorage.setItem('resId', resID);
                } catch (error) {
                    console.log(error);
                }
                navigation.navigate('Chef');
            } else if (role === 'Cashier') {
                try {
                    await AsyncStorage.setItem('profileID', id.toString());
                    await AsyncStorage.setItem(
                        'profile_token',
                        data.data[0].token,
                    );
                    await AsyncStorage.setItem(
                        'codename',
                        data.data[0].CodeName,
                    );
                    await AsyncStorage.setItem('isWorking', isWoking);
                    await AsyncStorage.setItem('role', data.data[0].Role);
                    await AsyncStorage.setItem('resId', resID);
                } catch (error) {
                    console.log(error);
                }
                navigation.navigate('Cashier');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <TouchableOpacity
            style={styles.item}
            className="flex-row items-center rounded-lg bg-orange-500 justify-between"
            onPress={handleSelectProfile}>
            <View className="flex-row items-center">
                <UserCircleIcon size={40} color="black" />
                <View className="ml-2">
                    <Text style={styles.name}>{id}</Text>
                    <Text style={styles.role}>{role}</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    className="rounded-full bg-red-600 p-2"
                    onPress={() => {
                        setModalVisible(true);
                    }}>
                    <TrashIcon size={36} color="white" />
                </TouchableOpacity>
            </View>
            <Modal
                isVisible={isModalVisible}
                onBackButtonPress={() => {
                    setModalVisible(false);
                }}
                onBackdropPress={() => {
                    setModalVisible(false);
                }}>
                <View className="flex-1 justify-center items-center">
                    <View className="bg-white p-4 rounded-lg flex w-72">
                        <Text className="text-lg text-black self-center">
                            Are you sure to delete this profile ?
                        </Text>
                        <View className="flex flex-row justify-between m-2">
                            <TouchableOpacity
                                className="bg-slate-500 w-1/4 justify-center items-center rounded-lg p-2 mt-2"
                                onPress={() => {
                                    setModalVisible(false);
                                }}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-red-600 w-1/4 justify-center items-center rounded-lg p-2 mt-2"
                                onPress={() => {
                                    handleDeleteProfile();
                                    setModalVisible(false);
                                }}>
                                <Text>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
};

export default ProfileItem;
