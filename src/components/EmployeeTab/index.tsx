import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

import EmPloyeeItem from '../EmployeeItem';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmPloyeeTab = ({ navigation }: { navigation: any }) => {
    const [listEmployee, setListEmployee] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getEmployee = async () => {
            try {
                const resID = await AsyncStorage.getItem('resId');
                const token = await AsyncStorage.getItem('profile_token');
                const res = await instance.get(
                    `/Restaurants/GetEmployee?Restaurant_id=${resID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                console.log(res.data);
                setListEmployee(res.data);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };

        getEmployee();
    }, []);
    return (
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOutDown}
            className="flex-1">
            <TouchableOpacity
                className="rounded-lg border-2 border-blue-700 m-4 items-center"
                onPress={() => {
                    navigation.navigate('AddEmployee');
                }}>
                <Text className="text-black m-2 text-lg">+ Add Employee</Text>
            </TouchableOpacity>
            {isLoading ? (
                <View className="w-full items-center justify-center h-50">
                    <ActivityIndicator size={50} color="white" />
                </View>
            ) : (
                <FlatList
                    data={listEmployee}
                    renderItem={({ item }) => (
                        <EmPloyeeItem
                            title={item.CodeName}
                            role={item.Role}
                            id={item.ID}
                            setList={setListEmployee}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={item => item.CodeName}
                />
            )}
        </Animated.View>
    );
};

export default EmPloyeeTab;
