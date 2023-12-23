import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderItem from '../OrderItem';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import instance from '../../services/instance';

const HistoryOrderTab = ({ navigation }) => {
    const [filter, setfilter] = useState('none');
    const [isLoading] = useState(false);

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
        };

        getOrderList();
    }, []);
    const filterfoodData = [
        {
            id: 1,
            foodName: 'Poha',
            available: true,
            foodImageUrl:
                'https://res.cloudinary.com/dfsucyg30/image/upload/v1690964445/nxuiyqocgn0av3w7uszi.png',
            foodPrice: '25$',
            time: '2s',
        },
        {
            id: 2,
            foodName: 'Samosa',
            available: true,
            foodImageUrl:
                'https://res.cloudinary.com/dfsucyg30/image/upload/v1690964504/vanzrpqb0nwrmtxa9mau.png',
            foodPrice: '50$',
            time: '5s',
        },
        {
            id: 3,
            foodName: 'Egg Rice',
            available: true,
            foodImageUrl:
                'https://res.cloudinary.com/dfsucyg30/image/upload/v1690968955/dfk4fhclsuf9clv9hpkv.png',
            foodPrice: '15$',
            time: '5s',
        },
        {
            id: 4,
            foodName: 'Hamburger',
            available: true,
            foodImageUrl:
                'https://res.cloudinary.com/dfsucyg30/image/upload/v1690968994/hwq1jyyg0omlilmgppip.png',
            foodPrice: '30$',
            time: '5s',
        },
        {
            id: 5,
            foodName: 'Pizza',
            available: true,
            foodImageUrl:
                'https://res.cloudinary.com/dfsucyg30/image/upload/v1690969066/yg4xrarfclursjdwe3bg.png',
            foodPrice: '25$',
            time: '5s',
        },
        {
            id: 6,
            foodName: 'Pizza',
            available: true,
            foodImageUrl:
                'https://res.cloudinary.com/dfsucyg30/image/upload/v1690969066/yg4xrarfclursjdwe3bg.png',
            foodPrice: '25$',
            time: '5s',
        },
        {
            id: 7,
            foodName: 'Pizza',
            available: true,
            foodImageUrl:
                'https://res.cloudinary.com/dfsucyg30/image/upload/v1690969066/yg4xrarfclursjdwe3bg.png',
            foodPrice: '25$',
            time: '5s',
        },
    ];
    return (
        <SafeAreaView className="flex-1 bg-gray-300">
            {!isLoading && (
                <Animated.ScrollView
                    entering={FadeInDown}
                    exiting={FadeOutUp}
                    showsVerticalScrollIndicator={false}>
                    {orderList.map(foodItem => {
                        if (
                            foodItem.Order_status !== 0 &&
                            foodItem.Payment_Status !== 0
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

export default HistoryOrderTab;
