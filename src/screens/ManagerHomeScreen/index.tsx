import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
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
} from 'react-native-heroicons/outline';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';

const ManagerHomeScreen = ({ navigation, id }) => {
    const [isHaveRestaurant, setIsHaveRestaurant] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [InfoRestaurant, setInfoRestaurant] = useState({});

    useEffect(() => {
        const getResInfo = async () => {
            const profileID = await AsyncStorage.getItem('profileID');
            try {
                const data = await instance.get(
                    `Restaurants/getRestaurantsForManager?profileID=${profileID}`,
                );
                console.log(data.data);
                if (data.data[0]) {
                    setInfoRestaurant(data.data[0]);
                } else {
                    setIsHaveRestaurant(false);
                }

                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getResInfo();
    }, []);

    return (
        <SafeAreaView className="flex flex-1 pb-20 bg-orange-300">
            <StatusBar backgroundColor="orange" />
            <View className="flex flex-1">
                <View className="p-2 flex-row justify-between items-center bg-[#FFA500]">
                    <View>
                        <Text className="text-lg text-black">Hi Foodie,</Text>
                        <Text className="text-xl font-bold text-gray-600">
                            Hungry Today?
                        </Text>
                    </View>
                    <View className="items-center justify-center">
                        <Image
                            className="h-16 w-16"
                            source={{
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}
                        />
                    </View>
                </View>
                {isLoading ? (
                    <View className="w-full items-center justify-center h-1/2">
                        <ActivityIndicator size={50} color="white" />
                    </View>
                ) : isHaveRestaurant ? (
                    <View className="flex items-center bg-orange-300 grow">
                        <Image
                            style={styles.image}
                            source={{
                                uri: InfoRestaurant
                                    ? InfoRestaurant.Avatar
                                    : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Dno%2Bimage%2Bavailable&psig=AOvVaw1oJe0vwkYp56DLPXS3EhcP&ust=1703045519431000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLCvpY3RmoMDFQAAAAAdAAAAABAD',
                            }}
                        />
                        <View>
                            <Text className="text-black p-5 text-4xl mt-3">
                                {InfoRestaurant.Name}
                            </Text>
                        </View>
                        <View className="w-full grow flex items-center justify-center">
                            <TouchableOpacity className="bg-red-500 w-11/12 flex flex-row my-2 rounded-lg items-center">
                                <View className="pl-4">
                                    <UserGroupIcon size={26} color="black" />
                                </View>
                                <Text className="py-4 px-2 text-xl">
                                    20 Employees
                                </Text>
                            </TouchableOpacity>
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
                ) : (
                    <View className="bg-orange-300 items-center justify-center grow">
                        <TouchableOpacity
                            className="border-blue-500 border-2 rounded-lg p-2"
                            onPress={() => {
                                navigation.navigate('AddRestaurant');
                            }}>
                            <Text className="text-blue-500 text-lg">
                                Add Your Restaurant
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default ManagerHomeScreen;
