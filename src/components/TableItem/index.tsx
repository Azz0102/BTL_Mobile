import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const TableItem = ({ title }) => (
    <TouchableOpacity className="flex-row items-center rounded-lg bg-blue-500 p-3 mx-2 my-4">
        <Image
            source={require('../../../assets/icons/facebook.png')}
            className="rounded mr-2"
        />
        <View>
            <Text className="text-black text-xl font-bold">{title}</Text>
            <Text className="text-black text-xl">{title}</Text>
        </View>
    </TouchableOpacity>
);

export default TableItem;
