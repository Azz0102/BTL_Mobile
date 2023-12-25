import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import {
    ChevronDownIcon,
    BanknotesIcon,
    CheckIcon,
    ChevronUpIcon,
} from 'react-native-heroicons/solid';
import Modal from 'react-native-modal';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [1, 2, 3, 4, 5];

const ServantOrderItem = ({ item, navigation }) => {
    const [isOrderListOpen, setIsOrderListOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [orderInfo, setOrderInfo] = useState([]);
    const [total, setTotal] = useState(0);
    const [listFood, setListFood] = useState([]);
    const [listDrink, setListDrink] = useState([]);

    const handleOrder = async () => {
        try {
            const id = await AsyncStorage.getItem('codename');
            const res = await instance.patch('/Orders/UpdateOrder', {
                Waitress_id: !isChecked ? id : '',
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

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
        <View className="flex-row w-full">
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
                        {item.Order_status !== 0 &&
                        item.Payment_Status !== 0 ? (
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
                                                source={{
                                                    uri: data.food_Avatar,
                                                }}
                                                style={styles.image}
                                            />
                                            <Text className="text-black ml-2">
                                                {data.Name}
                                            </Text>
                                        </View>
                                        <View className="flex-row mr-1">
                                            {orderInfo.map(item => {
                                                if (
                                                    item.FoodID === data.Food_id
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
                                                    item.DrinkID ===
                                                    data.Drink_id
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
            <View className="justify-center items-center pl-3">
                <BouncyCheckbox
                    size={25}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text=""
                    iconStyle={{ borderColor: 'red' }}
                    innerIconStyle={{ borderWidth: 2 }}
                    textStyle={{ fontFamily: 'JosefinSans-Regular' }}
                    onPress={() => {
                        if (isChecked === true) {
                            setModalVisible(true);
                        } else {
                            handleOrder();
                            setIsChecked(true);
                        }
                    }}
                    disableBuiltInState
                    isChecked={isChecked}
                />
            </View>
            <Modal
                isVisible={isModalVisible}
                onBackButtonPress={() => {
                    setModalVisible(false);
                }}
                onBackdropPress={() => {
                    setModalVisible(false);
                }}>
                <View className="flex-1 justify-center items-center">
                    <View className="bg-white p-4 rounded-lg flex">
                        <Text className="text-lg text-black">
                            Are you sure to cancel serve this order ?
                        </Text>
                        <View className="flex flex-row justify-between m-2">
                            <TouchableOpacity
                                className="bg-slate-500 w-1/4 justify-center items-center rounded-lg p-2 mt-2"
                                onPress={() => {
                                    setModalVisible(false);
                                }}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-red-600 w-1/4 justify-center items-center rounded-lg p-2 mt-2"
                                onPress={() => {
                                    setModalVisible(false);
                                    setIsChecked(false);
                                    handleOrder();
                                }}>
                                <Text>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ServantOrderItem;
