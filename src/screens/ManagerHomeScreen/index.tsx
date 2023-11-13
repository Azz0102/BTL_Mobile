import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
    UserGroupIcon,
    ClockIcon,
    MapPinIcon,
    PhoneIcon,
} from 'react-native-heroicons/outline';

const ManagerHomeScreen = ({ navigation }) => {
    const [isHaveRestaurant, setIsHaveRestaurant] = useState(true);

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
                {isHaveRestaurant ? (
                    <View className="flex items-center bg-orange-300 grow">
                        <View>
                            <Text className="text-black p-5 text-4xl mt-24">
                                Name Restaurant
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
                                    10 AM - 10 PM
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-red-500 w-11/12 flex flex-row my-2 rounded-lg items-center">
                                <View className="pl-4">
                                    <MapPinIcon size={26} color="black" />
                                </View>
                                <Text className="py-4 px-2 text-xl">
                                    144 Xuân Thủy
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-red-500 w-11/12 flex flex-row my-2 rounded-lg items-center">
                                <View className="pl-4">
                                    <PhoneIcon size={26} color="black" />
                                </View>
                                <Text className="py-4 px-2 text-xl">
                                    0931338635
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View className="bg-orange-200 items-center justify-center grow">
                        <TouchableOpacity className="border-blue-500 border-2 rounded-lg p-2">
                            <Text className="text-black">
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
