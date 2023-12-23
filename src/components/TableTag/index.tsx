import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const TableTag = ({ num }) => (
    <TouchableOpacity className="flex-row items-center w-50 rounded-3xl bg-blue-500 mx-2 my-2 px-2 py-1">
        <Text className="text-black font-bold">Table</Text>
        <Text className="text-black ml-1 font-bold">{num}</Text>
    </TouchableOpacity>
);

export default TableTag;
