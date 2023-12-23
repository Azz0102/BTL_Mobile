import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

import TableItem from '../TableItem';
import OrderItem from '../OrderItem';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'Third Item1',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'Third Item2',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d75',
        title: 'Third Item3',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d76',
        title: 'Third Item4',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d77',
        title: 'Third Item5',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d78',
        title: 'Third Item6',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d79',
        title: 'Third Item7',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d70',
        title: 'Third Item8',
    },
];

const OrderTab = ({ navigation }) => {
    const [orderList, setOrderList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getOrderList = async () => {
            const resID = await AsyncStorage.getItem('resId');
            try {
                const res = await instance.get(
                    `/Orders/GetOrderByRestaurant?Restaurant_id=${resID}`,
                );
                console.log(res.data);
                setOrderList(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        getOrderList();
    }, []);
    return (
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOutDown}
            className="flex-1">
            {isLoading ? (
                <View className="w-full items-center justify-center h-50">
                    <ActivityIndicator size={50} color="white" />
                </View>
            ) : (
                <ScrollView className="w-full h-full">
                    {orderList.map(foodItem => {
                        return (
                            <OrderItem
                                navigation={navigation}
                                item={foodItem}
                            />
                        );
                    })}
                </ScrollView>
            )}
        </Animated.View>
    );
};

export default OrderTab;
