import React, { useEffect, useState } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import ServantOrderItem from '../ServantOrderItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import { styles } from './style';
import {
    ArrowSmallDownIcon,
    ChevronDownIcon,
} from 'react-native-heroicons/solid';
import instance from '../../services/instance';
const filterOrderOption = ['All', 'My Serve'];

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

const ServantWorkTab = ({ navigation }) => {
    const [filter, setFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [orderList, setOrderList] = useState([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const [resId, setResId] = useState(null);

    const toggleSwitch = () => {};

    useEffect(() => {
        const setEnabled = async () => {
            const id = await AsyncStorage.getItem('profileID');
            try {
                const data = await instance.get(
                    `/Users/GetSpecificProfile?profileID=${id}`,
                );
                console.log(data.data);
                const isWoking = data.data[0].isWorking + '';
                console.log(isWoking);
                setIsEnabled(isWoking === '1');
            } catch (error) {
                console.log(error);
            }
        };
        setEnabled();
        const getOrderList = async () => {
            const resID = await AsyncStorage.getItem('resId');
            setResId(resID);
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
        <View className="flex-1 bg-orange-300">
            <View className="flex-row justify-between items-center my-2 ml-2">
                <SelectDropdown
                    data={filterOrderOption}
                    onSelect={(selectedItem, index) => {
                        setFilter(selectedItem);
                        console.log(selectedItem, index);
                    }}
                    buttonStyle={styles.buttonDropDown}
                    dropdownStyle={styles.dropDown}
                    defaultValue="All"
                    renderDropdownIcon={() => (
                        <ChevronDownIcon size={24} color="black" />
                    )}
                    buttonTextStyle={styles.textButtonDropdown}
                />
                <View className="flex-row">
                    <Text
                        className={`${
                            isEnabled ? 'text-green-500' : 'text-gray-600'
                        } font-bold text-lg`}>
                        {isEnabled ? 'Active' : 'Offline'}
                    </Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#e4e7ec' }}
                        thumbColor={isEnabled ? '#0aee28' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            {orderList && isEnabled && !isLoading && (
                <Animated.ScrollView
                    entering={FadeInDown}
                    exiting={FadeOutUp}
                    showsVerticalScrollIndicator={false}>
                    {orderList.map(foodItem => {
                        return (
                            <ServantOrderItem
                                navigation={navigation}
                                item={foodItem}
                            />
                        );
                    })}
                </Animated.ScrollView>
            )}
            {isLoading && (
                <View className="w-full items-center justify-center h-50">
                    <ActivityIndicator size={50} color="white" />
                </View>
            )}
            {!resId && (
                <View className="w-full items-center justify-center h-50">
                    <Text>You don't work in a restaurant yet!</Text>
                </View>
            )}
            {!orderList && (
                <View className="w-full items-center justify-center h-50">
                    <Text>No order yet!</Text>
                </View>
            )}
        </View>
    );
};

export default ServantWorkTab;
