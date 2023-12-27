import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';

const OrderMenuItem = ({
    title,
    navigation,
    price,
    id,
    type,
    avatar,
    setTotal,
    setFoodAndDrink,
    des,
}) => {
    const [quantity, setQuantity] = useState(0);

    const handleMinus = () => {
        if (quantity !== 0) {
            setQuantity(quantity - 1);
            setTotal(current => {
                const total = current + price * (quantity - 1);
                return total;
            });
            if (type === 'food') {
                setFoodAndDrink(current => {
                    const res = current.FoodItems.push({
                        food_id: id,
                        quantity: quantity - 1,
                    });
                    return res;
                });
            } else {
                setFoodAndDrink(current => {
                    const res = current.DrinkItems.push({
                        drink_id: id,
                        quantity: quantity - 1,
                    });
                    return res;
                });
            }
        }
    };

    const handlePlus = () => {
        setQuantity(quantity + 1);
        setTotal(current => {
            const total = current + price * (quantity + 1);
            return total;
        });
        if (type === 'food') {
            setFoodAndDrink(current => {
                let updatedOrder = { ...current };

                if (updatedOrder.FoodItems) {
                    const foodItemIndex = updatedOrder.FoodItems.findIndex(
                        item => item.food_id === id,
                    );

                    if (foodItemIndex !== -1) {
                        // If the food item is found, update the quantity
                        updatedOrder.FoodItems[foodItemIndex].quantity += 1;

                        // If the quantity becomes 0, remove the item
                        if (
                            updatedOrder.FoodItems[foodItemIndex].quantity === 0
                        ) {
                            updatedOrder.FoodItems.splice(foodItemIndex, 1);
                        }
                    } else {
                        // If the food item is not found, add a new entry to FoodItems
                        updatedOrder.FoodItems.push({
                            food_id: id,
                            quantity: quantity + 1,
                        });
                    }
                } else {
                    return (updatedOrder.FoodItems = [
                        {
                            food_id: id,
                            quantity: quantity + 1,
                        },
                    ]);
                }

                return updatedOrder;
            });
        } else {
            setFoodAndDrink(current => {
                const updatedOrder = { ...current };

                if (updatedOrder.FoodItems) {
                    const drinkItemIndex = updatedOrder.DrinkItems.findIndex(
                        item => item.drink_id === id,
                    );
                    if (drinkItemIndex !== -1) {
                        // If the food item is found, update the quantity
                        updatedOrder.DrinkItems[drinkItemIndex].quantity += 1;

                        // If the quantity becomes 0, remove the item
                        if (
                            updatedOrder.DrinkItems[drinkItemIndex].quantity ===
                            0
                        ) {
                            updatedOrder.DrinkItems.splice(drinkItemIndex, 1);
                        }
                    } else {
                        // If the food item is not found, add a new entry to DrinkItems
                        updatedOrder.DrinkItems.push({
                            drink_id: id,
                            quantity: quantity + 1,
                        });
                    }
                } else {
                    return (updatedOrder.DrinkItems = [
                        {
                            drink_id: id,
                            quantity: quantity + 1,
                        },
                    ]);
                }

                return updatedOrder;
            });
        }
    };

    return (
        <TouchableOpacity
            style={styles.item}
            className="flex-row items-center justify-between w-full m-0 border-b-stone-400 border-b-2"
            onPress={() => {
                navigation.navigate('OrderMenuItemDetail', {
                    avatar,
                    des,
                });
            }}>
            <View className="flex-row items-center m-0">
                <Image
                    style={styles.avatar}
                    source={{ uri: avatar }}
                    className="mr-4 h-20 w-20"
                />
                <View>
                    <Text style={styles.name}>{title}</Text>
                    <Text style={styles.role}>{price.toLocaleString()}</Text>
                </View>
            </View>
            <View className="flex-row self-end items-center h-full">
                <TouchableOpacity className="mr-2" onPress={handleMinus}>
                    <MinusCircleIcon color="blue" size={35} />
                </TouchableOpacity>
                <Text className="text-black mr-2 text-2xl">{quantity}</Text>
                <TouchableOpacity onPress={handlePlus}>
                    <PlusCircleIcon color="red" size={35} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default OrderMenuItem;
