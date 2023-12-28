import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
    UserGroupIcon,
    ClockIcon,
    MapPinIcon,
    PhoneIcon,
    InformationCircleIcon,
    BuildingStorefrontIcon,
} from 'react-native-heroicons/outline';
import BottomSlider from '../../components/BottomSlider';
import ServantHomeTab from '../ServantHomeTab';
import ServantWorkTab from '../../components/ServantWorkTab';
import ChefWorkTab from '../../components/ChefWorkTab';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './style';
import instance from '../../services/instance';
import IdToAdd from '../../components/IdToAdd';

const ChefHomeScreen = ({ navigation }) => {
    const [isHaveRestaurant, setIsHaveRestaurant] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [InfoRestaurant, setInfoRestaurant] = useState({});
    const [userAvatar, setUserAvatar] = useState('');
    const [userName, setUserName] = useState('');

    const [isSelectedTab, setIsSelectedTab] = useState(0);
    useEffect(() => {
        const getResInfo = async () => {
            const profileID = await AsyncStorage.getItem('profileID');
            try {
                const data = await instance.get(
                    `Restaurants/getRestaurantsForManager?profileID=${profileID}`,
                );
                console.log(data.data);
                setInfoRestaurant(data.data[0]);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getResInfo();
        const getUserInfo = async () => {
            const name = await AsyncStorage.getItem('userName');
            const avatar = await AsyncStorage.getItem('userAvatar');

            setUserName(name);
            setUserAvatar(avatar);
        };

        getUserInfo();
    }, []);

    const handleSelectedTab = () => {
        if (isSelectedTab === 0) {
            return (
                <View className="flex items-center bg-orange-300 grow">
                    {isLoading ? (
                        <View className="w-full items-center justify-center h-1/2">
                            <ActivityIndicator size={50} color="white" />
                        </View>
                    ) : (
                        <View className="w-full h-full items-center">
                            <Image
                                style={styles.image}
                                source={{ uri: InfoRestaurant.Avatar }}
                            />
                            <View>
                                <Text className="text-black p-2 text-4xl mt-1">
                                    {InfoRestaurant.Name}
                                </Text>
                            </View>
                            <View className="w-full grow flex items-center justify-center">
                                <TouchableOpacity className="bg-red-500 w-11/12 flex flex-row my-2 rounded-lg items-center">
                                    <View className="pl-4">
                                        <ClockIcon size={26} color="black" />
                                    </View>
                                    <Text className="py-4 px-2 text-xl">
                                        {InfoRestaurant.Time}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="bg-red-500 w-11/12 flex flex-row my-2 rounded-lg items-center">
                                    <View className="pl-4">
                                        <MapPinIcon size={26} color="black" />
                                    </View>
                                    <Text className="py-4 px-2 text-xl w-5/6">
                                        {InfoRestaurant.Address}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="bg-red-500 w-11/12 flex flex-row my-2 rounded-lg items-center">
                                    <View className="pl-4">
                                        <PhoneIcon size={26} color="black" />
                                    </View>
                                    <Text className="py-4 px-2 text-xl">
                                        {InfoRestaurant.PhoneNumber}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            );
        } else if (isSelectedTab === 1) {
            return <ChefWorkTab navigation={navigation} />;
        }
    };

    return (
        <SafeAreaView className="flex flex-1 pb-20 bg-orange-300">
            <StatusBar backgroundColor="orange" />
            <View className="flex flex-1">
                <View className="p-2 flex-row justify-between items-center bg-[#FFA500]">
                    <View>
                        <Text className="text-lg text-black">
                            Hi {userName}
                        </Text>
                        <Text className="text-xl font-bold text-gray-600">
                            How Are You Today?
                        </Text>
                    </View>
                    <View className="items-center justify-center">
                        <Image
                            className="h-16 w-16"
                            source={{
                                uri: userAvatar,
                            }}
                        />
                    </View>
                </View>
                {InfoRestaurant ? (
                    <View className="flex flex-1 mt-2">
                        <View className="flex flex-row">
                            <TouchableOpacity
                                className="flex overflow-hidden w-1/2 items-center"
                                onPress={() => {
                                    setIsSelectedTab(0);
                                }}>
                                <View className="flex flex-row items-center justify-center">
                                    <InformationCircleIcon
                                        size="26"
                                        color="black"
                                    />
                                    <Text className="text-black mx-2 mb-1 text-lg">
                                        Restaurant Info
                                    </Text>
                                </View>
                                <BottomSlider
                                    isSelected={isSelectedTab}
                                    index={0}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex overflow-hidden w-1/2 items-center"
                                onPress={() => {
                                    setIsSelectedTab(1);
                                }}>
                                <View className="flex flex-row items-center justify-center">
                                    <BuildingStorefrontIcon
                                        size="26"
                                        color="black"
                                    />
                                    <Text className="text-black mx-2 mb-1 text-lg">
                                        Work
                                    </Text>
                                </View>
                                <BottomSlider
                                    isSelected={isSelectedTab}
                                    index={1}
                                />
                            </TouchableOpacity>
                        </View>
                        {handleSelectedTab()}
                    </View>
                ) : (
                    <IdToAdd />
                )}
            </View>
        </SafeAreaView>
    );
};

export default ChefHomeScreen;
