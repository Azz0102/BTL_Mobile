import { View, Text, TouchableOpacity, Share } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ArrowLeftIcon,
    ArrowLeftOnRectangleIcon,
    ShareIcon,
} from 'react-native-heroicons/outline';

const Header = ({ navigation }) => {
    return (
        <SafeAreaView
            className={'flex-row items-center p-3 bg-[#FFA500]'}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}>
                <ArrowLeftIcon size={30} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Header;
