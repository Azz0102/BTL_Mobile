import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderItem from '../OrderItem';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActiveOrderTab = ({ navigation }) => {
    const [filter, setfilter] = useState('none');
    const [isLoading, setIsLoading] = useState(true);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        const getOrderList = async () => {
            const profileID = await AsyncStorage.getItem('profileID');
            try {
                const res = await instance.get(
                    `/Orders/GetOrder?profileID=${profileID}`,
                );
                console.log(res.data);
                setOrderList(res.data);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        getOrderList();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gray-300">
            {isLoading ? (
                <View className="w-full items-center justify-center h-50">
                    <ActivityIndicator size={50} color="white" />
                </View>
            ) : (
                <Animated.ScrollView
                    entering={FadeInDown}
                    exiting={FadeOutUp}
                    showsVerticalScrollIndicator={false}>
                    {orderList.map(foodItem => {
                        if (
                            foodItem.Order_status === 0 ||
                            foodItem.Payment_Status === 0
                        ) {
                            return (
                                <OrderItem
                                    navigation={navigation}
                                    item={foodItem}
                                />
                            );
                        }
                    })}
                </Animated.ScrollView>
            )}
        </SafeAreaView>
    );
};

export default ActiveOrderTab;
