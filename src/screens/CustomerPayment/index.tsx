import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {
    BanknotesIcon,
    ChevronRightIcon,
} from 'react-native-heroicons/outline';
import { styles } from './style';
import instance from '../../services/instance';

const CustomerPayment = ({ navigation, route }) => {
    const { orderID } = route.params;

    const updatePayment = async () => {
        try {
            const res = await instance.patch('Orders/UpdateOrder', {
                Order_id: orderID,
                Payment_method: 'Cash',
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        navigation.goBack();
    };
    return (
        <View className="flex-1 bg-gray-200">
            <View className="w-full items-center">
                <Text className="text-black text-2xl my-4">Payment Method</Text>
            </View>
            <TouchableOpacity className="border-2 border-black rounded-2xl m-2 p-4 flex-row items-center justify-between">
                <View className="flex-row items-center w-3/4">
                    <View className="items-center w-1/4">
                        <Image
                            style={styles.momoicon}
                            source={require('../../../assets/images/momoicon.png')}
                        />
                        <Text className="text-black text-xl">MOMO</Text>
                    </View>
                    <Text className="text-black ml-4 text-base">
                        Purchase with MOMO wallet
                    </Text>
                </View>

                <View className="">
                    <ChevronRightIcon color="black" size={40} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                className="border-2 border-black rounded-2xl m-2 p-4 flex-row items-center justify-between"
                onPress={() => {
                    updatePayment();
                }}>
                <View className="flex-row items-center w-3/4">
                    <View className="items-center w-1/4">
                        <BanknotesIcon color="green" size={46} />
                        <Text className="text-black text-xl">Cash</Text>
                    </View>
                    <Text className="text-black ml-4 text-base">
                        Purchase with cash
                    </Text>
                </View>

                <View className="">
                    <ChevronRightIcon color="black" size={40} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CustomerPayment;
