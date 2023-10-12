import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    ClockIcon,
    HeartIcon,
    MinusCircleIcon,
    PlusCircleIcon,
} from 'react-native-heroicons/solid';

const FoodDetails = ({ route }) => {
    const item = route.params.item;
    return (
        <SafeAreaView className="flex-1 px-2 pb-20 flex-col">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="relative">
                    <Image
                        source={{ uri: item.foodImageUrl }}
                        className="w-full h-80 rounded-3xl"
                    />
                    <TouchableOpacity className="absolute top-5 right-5">
                        <HeartIcon size={35} color="red" />
                    </TouchableOpacity>
                </View>
                <View className="pb-10 border-dashed border-b-2 border-gray-300">
                    <View className="flex-row items-center px-5 pt-5 pb-2 justify-between">
                        <Text className="text-gray-800 font-bold text-2xl ">
                            {item.foodName}
                        </Text>
                        <View className="flex-row bg-white rounded-full p-1 items-center">
                            <ClockIcon size={15} color="orange" />
                            <Text className="text-xs"> {item.time} mins</Text>
                        </View>
                    </View>
                    <Text className="text-gray-500 px-5">
                        {item.foodDescription}
                    </Text>
                </View>
                <View className="mb-7">
                    <View className="flex-row items-center justify-between p-5">
                        <View className="flex-row gap-2 items-center">
                            <TouchableOpacity>
                                <MinusCircleIcon
                                    size={30}
                                    color="rgb(55 65 81)"
                                />
                            </TouchableOpacity>
                            <Text className="text-md text-gray-700 font-bold">
                                300
                            </Text>
                            <TouchableOpacity>
                                <PlusCircleIcon
                                    size={30}
                                    color="rgb(55 65 81)"
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className="text-3xl text-gray-600 font-extrabold">
                                ₹{item.foodPrice}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        shadowColor: '#ffa500',
                        shadowOffset: {
                            width: 0,
                            height: 11,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 11.78,
                        elevation: 15,
                    }}
                    className="py-5 justify-center items-center mx-5 mb-5 rounded-2xl bg-orange-400">
                    <Text className="text-white font-extrabold">
                        +Add To Cart
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FoodDetails;
