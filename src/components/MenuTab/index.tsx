import React, { useEffect, useState } from 'react';
import {
    Button,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

import EmPloyeeItem from '../EmployeeItem';
import MenuItem from '../MenuItem';
import { PlusCircleIcon, PencilSquareIcon } from 'react-native-heroicons/solid';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuTab = ({ navigation }) => {
    const [isEditFood, setIsEditFood] = useState(false);
    const [isEditDrink, setIsEditDrink] = useState(false);
    const [foodList, setFoodList] = useState([{}]);

    useEffect(() => {
        const getFoodAndDrink = async () => {
            try {
                const resID = await AsyncStorage.getItem('resId');
                const res = await instance.get(
                    `Menu/GetMenu?Restaurant_id=${resID}`,
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
    }, []);

    return (
        <Animated.ScrollView
            entering={FadeInUp}
            exiting={FadeOutDown}
            className="flex-1">
            <View className="ml-4 flex flex-row items-center justify-between">
                <Text className="text-gray-600 text-2xl font-bold mt-1">
                    Food
                </Text>
                <View className="flex flex-row mt-2 mr-2">
                    <TouchableOpacity
                        className="mr-2"
                        onPress={() => {
                            navigation.navigate('AddMenuItemScreen');
                        }}>
                        <PlusCircleIcon size={27} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setIsEditFood(!isEditFood);
                        }}>
                        <PencilSquareIcon size={27} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
            {foodList.map((item, index) => {
                if (item.Food_id) {
                    return (
                        <MenuItem
                            key={index}
                            title={item.Name}
                            isEdit={isEditFood}
                            navigation={navigation}
                            description={item.DescribeFood}
                            price={item.Food_Price}
                            avatar={item.food_Avatar}
                            id={item.Food_id}
                            menuid={item.Menu_id}
                            setFoodList={setFoodList}
                            type="food"
                        />
                    );
                }
            })}
            <View className="ml-4 flex flex-row items-center justify-between">
                <Text className="text-gray-600 text-2xl font-bold mt-1">
                    Drink
                </Text>
                <View className="flex flex-row mt-2 mr-2">
                    <TouchableOpacity
                        className="mr-2"
                        onPress={() => {
                            navigation.navigate('AddMenuItemScreen', {});
                        }}>
                        <PlusCircleIcon size={27} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setIsEditDrink(!isEditDrink);
                        }}>
                        <PencilSquareIcon size={27} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
            {foodList.map((item, index) => {
                if (item.Drink_id) {
                    return (
                        <MenuItem
                            key={index}
                            title={item.Drink_name}
                            isEdit={isEditDrink}
                            navigation={navigation}
                            description={item.Drink_Description}
                            price={item.Drink_price}
                            avatar={item.Avatar}
                            id={item.Drink_id}
                            menuid={item.Menu_id}
                            setFoodList={setFoodList}
                            type="drink"
                        />
                    );
                }
            })}
        </Animated.ScrollView>
    );
};

export default MenuTab;
