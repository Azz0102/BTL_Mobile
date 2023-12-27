import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import { styles } from './style';

const OrderMenuItemDetail = ({ navigation, route }) => {
    const { avatar, des } = route.params;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-gray-200">
            <ScrollView className="flex-1">
                <View className="w-full h-56 relative bg-white mb-6">
                    <ImageBackground
                        style={styles.image}
                        resizeMode="stretch"
                        source={{
                            uri: JSON.stringify(avatar).replace(/"/g, ''),
                        }}
                    />
                </View>
                <View className="w-full items-center">
                    <View>
                        <View className="m-2">
                            <Text className="text-black text-base">{des}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default OrderMenuItemDetail;
