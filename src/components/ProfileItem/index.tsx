import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

const ProfileItem = ({ title }) => (
    <TouchableOpacity
        style={styles.item}
        className="flex-row items-center rounded-lg bg-orange-500">
        <Image
            style={styles.avatar}
            source={require('../../../assets/icons/facebook.png')}
            className="rounded mr-2"
        />
        <View>
            <Text style={styles.name}>{title}</Text>
            <Text style={styles.role}>{title}</Text>
        </View>
    </TouchableOpacity>
);

export default ProfileItem;
