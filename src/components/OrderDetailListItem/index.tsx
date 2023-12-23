import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Image,
} from 'react-native';

import { CheckIcon } from 'react-native-heroicons/outline';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

const OrderDetailListItem = ({ navigation }: { navigation: any }) => {
    const [role, setRole] = useState('Cashier');
    const [isChecked, setIsChecked] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View className="w-full flex-row">
            <View className="flex-row items-center grow my-1 justify-between">
                <View className="flex-row items-center ml-1">
                    <Image
                        source={require('../../../assets/icons/facebook.png')}
                    />
                    <Text className="text-black ml-1">Pizza</Text>
                </View>
                <View className="flex-row mr-1">
                    <Text className="text-black mr-2 text-base ">X 3</Text>
                    <View className="bg-green-600 rounded-full p-1 items-center flex-row w-23 justify-center self-end">
                        <CheckIcon color="white" size={20} />
                        <Text className="text-white text-xs ml-1">
                            Complete
                        </Text>
                    </View>
                </View>
            </View>
            {role === 'Chef' && (
                <View className="justify-center items-center pl-3">
                    <BouncyCheckbox
                        size={25}
                        fillColor="red"
                        unfillColor="#FFFFFF"
                        text=""
                        iconStyle={{ borderColor: 'red' }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{
                            fontFamily: 'JosefinSans-Regular',
                        }}
                        onPress={() => {
                            if (isChecked === true) {
                                setModalVisible(true);
                            } else {
                                setIsChecked(true);
                            }
                        }}
                        disableBuiltInState
                        isChecked={isChecked}
                    />
                </View>
            )}
        </View>
    );
};

export default OrderDetailListItem;
