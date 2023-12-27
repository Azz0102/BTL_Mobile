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
    ActivityIndicator,
} from 'react-native';
import { styles } from './style';
import instance from '../../services/instance';

const UserInfo = ({ navigation, route }) => {
    const { id } = route.params;
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await instance.get(
                    `/Users/getUserByProfileID?profileID=${id}`,
                );
                setUserInfo(res.data[0]);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getUserInfo();
    }, [id]);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1">
            {isLoading ? (
                <View className="w-full items-center justify-center h-50">
                    <ActivityIndicator size={50} color="white" />
                </View>
            ) : (
                <ScrollView className="flex-1 bg-gray-200">
                    <View className="w-full h-56 relative bg-white mb-6">
                        <ImageBackground
                            style={styles.image}
                            resizeMode="stretch"
                            source={{
                                uri: userInfo.Avatar,
                            }}
                        />
                    </View>
                    <View className="w-full items-center">
                        <View className="w-full">
                            <View className=" border-b-stone-500 border-b-2">
                                <Text className="text-black ml-2 text-lg">
                                    Name: {userInfo.Name}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </KeyboardAvoidingView>
    );
};

export default UserInfo;
