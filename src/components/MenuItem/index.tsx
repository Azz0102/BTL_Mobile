import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { MinusCircleIcon } from 'react-native-heroicons/solid';
import Modal from 'react-native-modal';
import instance from '../../services/instance';

const MenuItem = ({
    title,
    isEdit,
    navigation,
    description,
    avatar,
    price,
    id,
    type,
    menuid,
    setFoodList,
}) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const handleDeleteMenuItem = async () => {
        try {
            if (type === 'food') {
                const res = await instance.delete(
                    `Menu/DeleteFoodAndDrinkFromMenu?Menu_id=${menuid}&Food_id=${id}`,
                );
                setFoodList(current =>
                    current.filter(item => {
                        return item.Food_id !== id;
                    }),
                );
            } else {
                const res = await instance.delete(
                    `Menu/DeleteFoodAndDrinkFromMenu?Menu_id=${menuid}&Drink_id=${id}`,
                );
                setFoodList(current =>
                    current.filter(item => {
                        return item.Drink_id !== id;
                    }),
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableOpacity
            style={styles.item}
            className="flex-row items-center justify-between w-full m-0 border-b-stone-400 border-b-2"
            onPress={() => {
                navigation.navigate('MenuItemDetail', {
                    title,
                    description,
                    avatar,
                    price,
                    id,
                    type,
                });
            }}>
            <View className="flex-row items-center m-0">
                <Image
                    style={styles.avatar}
                    source={{
                        uri: avatar
                            ? avatar
                            : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F208839%2Fno-pictures-no-camera&psig=AOvVaw2EGl8TUUPI3HAeKCK5i_Nh&ust=1703000026757000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCf7NGnmYMDFQAAAAAdAAAAABAD',
                    }}
                    className="mr-4 h-20 w-20"
                />
                <View className="w-2/3">
                    <Text style={styles.name}>{title}</Text>
                    <Text style={styles.role}>{price}</Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.role}>
                        {description}
                    </Text>
                </View>
            </View>
            {isEdit && (
                <TouchableOpacity
                    className="mr-2"
                    onPress={() => {
                        setModalVisible(true);
                    }}>
                    <MinusCircleIcon size={32} color="red" />
                </TouchableOpacity>
            )}
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
                            Are you sure to delete this item ?
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
                                    handleDeleteMenuItem();
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

export default MenuItem;
