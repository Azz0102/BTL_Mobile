import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { MinusCircleIcon } from 'react-native-heroicons/solid';

const MenuItem = ({ title, isEdit }) => (
    <TouchableOpacity
        style={styles.item}
        className="flex-row items-center justify-between w-full m-0 border-b-stone-400 border-b-2">
        <View className="flex-row items-center m-0">
            <Image
                style={styles.avatar}
                source={require('../../../assets/icons/facebook.png')}
                className="mr-4 h-20 w-20"
            />
            <View>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.role}>{title}</Text>
                <Text style={styles.role}>{title}</Text>
            </View>
        </View>
        {isEdit && (
            <TouchableOpacity className="mr-2">
                <MinusCircleIcon size={32} color="red" />
            </TouchableOpacity>
        )}
    </TouchableOpacity>
);

export default MenuItem;
