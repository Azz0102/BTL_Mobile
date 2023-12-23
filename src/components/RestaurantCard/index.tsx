import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { HeartIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import Toast from 'react-native-root-toast';

const RestaurantCard = ({ uri, title, time, navigation, item }) => {
    return (
        <View>
            <TouchableOpacity
                className="rounded-lg overflow-hidden mb-3 relative w-full"
                onPress={() => {
                    navigation.navigate('RestaurantDetail', { item });
                }}>
                <Image
                    resizeMode="stretch"
                    source={{
                        uri: uri,
                    }}
                    width={190}
                    height={160}
                />
                <View className="pl-3 pr-2 py-2 flex-row bg-orange-50 items-center justify-center">
                    <View>
                        <Text className="text-md font-bold text-gray-400">
                            {title}
                        </Text>
                        <View className="items-center">
                            <Text className="font-bold text-sm text-orange-400">
                                {time}
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="absolute top-2 bg-red-100 justify-center items-center rounded-full left-2">
                    <TouchableOpacity>
                        <HeartIcon size={25} color="red" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default RestaurantCard;
