import React, { useEffect, useState } from 'react';
import {
    Button,
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Modal from 'react-native-modal';
import OrderMenuItem from '../../components/OrderMenuItem';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderMenu = ({ navigation, route }) => {
    const { orderID, resID } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [foodList, setFoodList] = useState([]);
    const [total, setTotal] = useState(0);
    const [foodAndDrink, setFoodAndDrink] = useState({
        OrderID: orderID,
        FoodItems: [],
        DrinkItems: [],
    });

    const handleFinish = async () => {
        try {
            const token = await AsyncStorage.getItem('profile_token');
            const res = await instance.patch(
                '/Orders/AddFoodAndDrinkToOrder',
                foodAndDrink,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                },
            );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        console.log(foodAndDrink);
        navigation.navigate('CustomerHomeScreen');
    };

    useEffect(() => {
        const getFoodAndDrink = async () => {
            try {
                const resId = JSON.stringify(resID);
                const res = await instance.get(
                    `Menu/GetMenu?Restaurant_id=${resId}`,
                );
                console.log(res.data);
                // res.data.map(item => {
                //     if (item.Food_id) {
                //         let foodlist1 = foodList;
                //         setFoodList(foodlist1.push(item));
                //     } else {
                //         let drinklist1 = drinkList;
                //         setDrinkList(drinklist1.push(item));
                //     }
                //     console.log(item);
                // });
                setFoodList(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getFoodAndDrink();
    }, [resID]);

    return (
        <ScrollView className="flex-1">
            <View className="items-center mt-4 mb-1">
                <Text className="text-black text-2xl mb-4">MENU</Text>
                <View className="w-full flex-row justify-between items-center">
                    <Text className="text-black text-xl ml-2">
                        Total: {total.toLocaleString()} VND
                    </Text>
                    <TouchableOpacity
                        className="bg-yellow-400 p-2 w-32 rounded-xl mr-2"
                        onPress={() => {
                            setModalVisible(true);
                        }}>
                        <Text className="text-xl font-bold text-center text-gray-700">
                            Finish
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="ml-4 flex flex-row items-center justify-between">
                <Text className="text-gray-600 text-2xl font-bold mt-1">
                    Food
                </Text>
            </View>
            {foodList.map((item, index) => {
                if (item.Food_id) {
                    return (
                        <OrderMenuItem
                            key={index}
                            title={item.Name}
                            navigation={navigation}
                            price={item.Food_Price}
                            avatar={item.food_Avatar}
                            id={item.Food_id}
                            setTotal={setTotal}
                            setFoodAndDrink={setFoodAndDrink}
                            type="food"
                        />
                    );
                }
            })}
            <View className="ml-4 flex flex-row items-center justify-between">
                <Text className="text-gray-600 text-2xl font-bold mt-1">
                    Drink
                </Text>
            </View>
            {foodList.map((item, index) => {
                if (item.Drink_id) {
                    return (
                        <OrderMenuItem
                            key={index}
                            title={item.Name}
                            price={item.Drink_price}
                            navigation={navigation}
                            avatar={item.Avatar}
                            id={item.Drink_id}
                            setTotal={setTotal}
                            setFoodAndDrink={setFoodAndDrink}
                            type="drink"
                        />
                    );
                }
            })}

            <Modal
                isVisible={isModalVisible}
                onBackButtonPress={() => {
                    setModalVisible(false);
                }}
                onBackdropPress={() => {
                    setModalVisible(false);
                }}>
                <View className="flex-1 justify-center items-center">
                    <View className="bg-white p-4 rounded-lg flex w-72">
                        <Text className="text-lg text-black self-center">
                            Are you sure to finish ?
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
                                    handleFinish();
                                    setModalVisible(false);
                                }}>
                                <Text>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default OrderMenu;
