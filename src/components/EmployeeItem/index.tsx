import React, { useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { UserMinusIcon } from 'react-native-heroicons/solid';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../services/instance';
import { UserCircleIcon } from 'react-native-heroicons/outline';

const EmPloyeeItem = ({ title, navigation, role, id, setList }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const handleDelete = async () => {
        try {
            const resID = await AsyncStorage.getItem('resId');
            const res = await instance.put(
                '/Restaurants/DeleteEmeployeeToRestaurant',
                {
                    profileID: id,
                    Restaurant_id: resID,
                },
            );
            console.log(res);
            setList(current =>
                current.filter(item => {
                    return item.ID !== id;
                }),
            );
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <TouchableOpacity
            style={styles.item}
            className="flex-row items-center rounded-lg bg-orange-500 justify-between"
            onPress={() => {
                navigation.navigate('UserInfo', {
                    id,
                });
            }}>
            <View className="flex-row items-center ">
                <UserCircleIcon size={36} color="black" />
                <View className="ml-2">
                    <Text style={styles.name}>{title}</Text>
                    <Text style={styles.role}>{role}</Text>
                </View>
            </View>
            <TouchableOpacity
                className="mr-2"
                onPress={() => {
                    setModalVisible(true);
                }}>
                <UserMinusIcon size={32} color="red" />
            </TouchableOpacity>
            <Modal
                isVisible={isModalVisible}
                onBackButtonPress={() => {
                    setModalVisible(false);
                }}
                onBackdropPress={() => {
                    setModalVisible(false);
                }}>
                <View className="flex-1 justify-center items-center">
                    <View className="bg-white p-4 rounded-lg flex">
                        <Text className="text-lg text-black">
                            Are you sure to delete this employee ?
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
                                    handleDelete();
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

export default EmPloyeeItem;
