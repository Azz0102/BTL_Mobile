import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { UserMinusIcon } from 'react-native-heroicons/solid';

const EmPloyeeItem = ({ title }) => (
    <TouchableOpacity
        style={styles.item}
        className="flex-row items-center rounded-lg bg-orange-500 justify-between">
        <View className="flex-row items-center ">
            <Image
                style={styles.avatar}
                source={require('../../../assets/icons/facebook.png')}
                className="rounded mr-2"
            />
            <View>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.role}>{title}</Text>
            </View>
        </View>
        <TouchableOpacity className="mr-2">
            <UserMinusIcon size={32} color="red" />
        </TouchableOpacity>
    </TouchableOpacity>
);

export default EmPloyeeItem;
