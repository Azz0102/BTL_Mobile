import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { ClipboardDocumentListIcon } from 'react-native-heroicons/outline';
import {
    ChevronDownIcon,
    BanknotesIcon,
    CheckIcon,
    ChevronUpIcon,
} from 'react-native-heroicons/solid';
import Modal from 'react-native-modal';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import instance from '../../services/instance';
import { styles } from './style';

const DATA = [1, 2, 3, 4, 5];

const OrderItem = ({ item, navigation }) => {
    const [isOrderListOpen, setIsOrderListOpen] = useState(false);
    const [orderInfo, setOrderInfo] = useState([]);
    const [total, setTotal] = useState(0);
    const [listFood, setListFood] = useState([]);
    const [listDrink, setListDrink] = useState([]);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await instance.get(
                    `/Orders/GetSpecificOrder?Order_id=${JSON.stringify(
                        item.Order_id,
                    )}`,
                );
                console.log(res.data);
                setOrderInfo(res.data);
                if (res.data) {
                    res.data.map(async (item, index) => {
                        if (item.FoodID) {
                            try {
                                const result = await instance.get(
                                    `/Food/GetFood?FoodID=${item.FoodID}`,
                                );
                                console.log(result.data);
                                setTotal(current => {
                                    const sum =
                                        current +
                                        result.data[0].Food_Price *
                                            item.Quantity;
                                    return sum;
                                });
                                if (listFood) {
                                    setListFood(current => {
                                        let newList = [...current];
                                        newList.push(result.data[0]);
                                        return newList;
                                    });
                                } else {
                                    setListFood(result.data);
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        } else {
                            try {
                                const result = await instance.get(
                                    `/Drinks/GetDrink?Drink_id=${item.Drink_id}`,
                                );
                                setTotal(current => {
                                    const sum =
                                        current +
                                        result.data[0].Drink_price *
                                            item.Quantity;
                                    return sum;
                                });
                                if (listDrink) {
                                    setListDrink(current => {
                                        let newList = [...current];
                                        newList.push(result.data[0]);
                                        return newList;
                                    });
                                } else {
                                    setListDrink(result.data[0]);
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        getOrder();
    }, [item.Order_id]);
    return (
        <TouchableOpacity
            className="flex items-center justify-between m-2 border-stone-500 border-2 rounded-xl p-2"
            onPress={() => {
                navigation.navigate('CustomerOrderDetail', {
                    orderID: JSON.stringify(item.Order_id),
                    listFood,
                    listDrink,
                    total,
                });
            }}>
            <View className="w-full flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <ClipboardDocumentListIcon size={30} color="black" />
                    <Text className="text-black text-base ml-1">
                        {item.Order_id}
                    </Text>
                </View>
                <View>
                    {item.Order_status !== 0 && item.Payment_Status !== 0 ? (
                        <View className="bg-green-600 rounded-full p-1 items-center flex-row w-23 justify-center self-end">
                            <CheckIcon color="white" size={20} />
                            <Text className="text-white text-xs ml-1">
                                Complete
                            </Text>
                        </View>
                    ) : (
                        <View className="bg-red-600 rounded-full p-1 items-center flex-row w-20 justify-center self-end">
                            <ActivityIndicator color="white" />
                            <Text className="text-white text-xs ml-1">
                                Waiting
                            </Text>
                        </View>
                    )}
                    <View className="flex-row mt-1">
                        <BanknotesIcon size={20} color="green" />
                        <Text className="text-black ml-1">
                            {total.toLocaleString()} VND
                        </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                className="w-full items-center border-2 border-black rounded-xl mt-2"
                onPress={() => {
                    setIsOrderListOpen(!isOrderListOpen);
                }}>
                <View className="w-full flex-row justify-between">
                    <Text className="text-black m-2">Order Item</Text>
                    {isOrderListOpen ? (
                        <View className="m-2">
                            <ChevronUpIcon size={26} color="black" />
                        </View>
                    ) : (
                        <View className="m-2">
                            <ChevronDownIcon size={26} color="black" />
                        </View>
                    )}
                </View>
                {listFood && isOrderListOpen && (
                    <Animated.View
                        entering={FadeInUp}
                        exiting={FadeOutDown}
                        className="w-full">
                        {listFood.map(data => {
                            return (
                                <View className="flex-row w-full items-center my-1 justify-between">
                                    <View className="flex-row items-center ml-1">
                                        <Image
                                            source={{ uri: data.food_Avatar }}
                                            style={styles.image}
                                        />
                                        <Text className="text-black ml-2">
                                            {data.Name}
                                        </Text>
                                    </View>
                                    <View className="flex-row mr-1">
                                        {orderInfo.map(item => {
                                            if (item.FoodID === data.Food_id) {
                                                return (
                                                    <Text className="text-black mr-2 text-base ">
                                                        x {item.Quantity}
                                                    </Text>
                                                );
                                            }
                                        })}
                                        {item.Order_status !== 0 ? (
                                            <View className="bg-green-600 rounded-full p-1 items-center flex-row w-23 justify-center self-end">
                                                <CheckIcon
                                                    color="white"
                                                    size={20}
                                                />
                                                <Text className="text-white text-xs ml-1">
                                                    Complete
                                                </Text>
                                            </View>
                                        ) : (
                                            <View className="bg-red-600 rounded-full p-1 items-center flex-row w-20 justify-center self-end">
                                                <ActivityIndicator color="white" />
                                                <Text className="text-white text-xs ml-1">
                                                    Waiting
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                        {listDrink.map(data => {
                            return (
                                <View className="flex-row w-full items-center my-1 justify-between">
                                    <View className="flex-row items-center ml-1">
                                        <Image
                                            source={{ uri: data.Avatar }}
                                            style={styles.image}
                                        />
                                        <Text className="text-black ml-2">
                                            {data.Drink_name}
                                        </Text>
                                    </View>
                                    <View className="flex-row mr-1">
                                        {orderInfo.map(item => {
                                            if (
                                                item.DrinkID === data.Drink_id
                                            ) {
                                                return (
                                                    <Text className="text-black mr-2 text-base ">
                                                        x {item.Quantity}
                                                    </Text>
                                                );
                                            }
                                        })}
                                        {item.Order_status !== 0 ? (
                                            <View className="bg-green-600 rounded-full p-1 items-center flex-row w-23 justify-center self-end">
                                                <CheckIcon
                                                    color="white"
                                                    size={20}
                                                />
                                                <Text className="text-white text-xs ml-1">
                                                    Complete
                                                </Text>
                                            </View>
                                        ) : (
                                            <View className="bg-red-600 rounded-full p-1 items-center flex-row w-20 justify-center self-end">
                                                <ActivityIndicator color="white" />
                                                <Text className="text-white text-xs ml-1">
                                                    Waiting
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </Animated.View>
                )}
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default OrderItem;
