import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { styles } from './style';
import { ClockIcon, MapPinIcon } from 'react-native-heroicons/outline';
import { AirbnbRating } from '@rneui/themed';

const DATA = {
    time: '10 am - 11pm',
    location: '144 Xuân Thủy',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at felis at quam gravida commodo nec sit amet urna. Ut in vehicula massa. Fusce a pretium risus, ut bibendum enim. ',
};

const RestaurantDetail = ({ navigation, route }: { navigation: any }) => {
    const { item } = route.params;
    console.log(item);
    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none',
            },
        });
        return () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    position: 'absolute',
                    shadowColor: '#7F5DF0',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    elevation: 5,
                    height: 80,
                    bottom: 0,
                    borderTopLeftRadius: 70,
                    borderTopRightRadius: 70,
                },
            });
        };
    }, [navigation]);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1">
            <ScrollView className="flex-1 bg-gray-200">
                <View className="w-full h-56 relative bg-white mb-6">
                    <ImageBackground
                        style={styles.image}
                        resizeMode="stretch"
                        source={{
                            uri: JSON.stringify(item.Avatar).replace(/"/g, ''),
                        }}
                    />
                </View>
                <View className="w-full items-center">
                    <View className="w-full">
                        <View className=" border-b-stone-500 border-b-2 items-center">
                            <Text className="text-black text-base">
                                {JSON.stringify(item.Description).replace(
                                    /"/g,
                                    '',
                                )}
                            </Text>
                            <View className="mb-2">
                                <AirbnbRating
                                    size={20}
                                    reviewSize={20}
                                    isDisabled={true}
                                    defaultRating={3}
                                />
                            </View>
                        </View>
                        <View className="m-2 flex-row items-center">
                            <ClockIcon size={26} color="black" />
                            <Text className="ml-2 text-black text-base">
                                {JSON.stringify(item.Time).replace(/"/g, '')}
                            </Text>
                        </View>
                        <View className="m-2 flex-row items-center">
                            <MapPinIcon size={26} color="black" />
                            <Text className="ml-2 text-black text-base w-5/6">
                                {JSON.stringify(item.Address).replace(/"/g, '')}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        className="mt-10 border-2 border-yellow-500 rounded-lg items-center w-1/2"
                        onPress={() => {
                            navigation.navigate('OrderScreen', { id: item.ID });
                        }}>
                        <Text className="text-yellow-500 m-2 text-xl">
                            Order Now!
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RestaurantDetail;
