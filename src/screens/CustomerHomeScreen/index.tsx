import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import RestaurantCard from '../../components/RestaurantCard';
import { showMessage } from 'react-native-flash-message';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerHomeScreen = ({ navigation }) => {
    const [restaurantList, setRestaurantList] = useState([]);
    const [filter, setfilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userAvatar, setUserAvatar] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const getRestaurantList = async () => {
            try {
                const res = await instance.get('/Restaurants/GetAllRestaurant');
                setRestaurantList(res.data);
                console.log(res.data);
                setIsLoading(false);
            } catch (error) {
                showMessage({
                    message: 'Error',
                    description: error.message,
                    type: 'danger',
                });
            }
        };
        getRestaurantList();
        const getUserInfo = async () => {
            const name = await AsyncStorage.getItem('userName');
            const avatar = await AsyncStorage.getItem('userAvatar');

            setUserName(name);
            setUserAvatar(avatar);
        };

        getUserInfo();
    }, []);

    const categories = [
        { title: '⭐ Popular', tag: 'popular' },
        { title: '🥪 Breakfast', tag: 'breakfast' },
        { title: '🍦 Desserts', tag: 'desserts' },
        { title: '🌮 Snacks', tag: 'snacks' },
        { title: '☕ Drinks', tag: 'drinks' },
    ];
    return (
        <SafeAreaView className="flex-1 pb-20  bg-gray-300">
            <StatusBar backgroundColor="orange" />
            <ScrollView className="flex-1 " stickyHeaderIndices={[2]}>
                <View className="p-2 flex-row justify-between items-center bg-[#FFA500]">
                    <View>
                        <Text className="text-lg text-black">
                            Hi {userName}
                        </Text>
                        <Text className="text-xl font-bold text-gray-600">
                            Hungry Today?
                        </Text>
                    </View>
                    <View className="items-center justify-center">
                        <Image
                            className="h-16 w-16"
                            source={{
                                uri: userAvatar,
                            }}
                        />
                    </View>
                </View>
                <View className="m-2 p-1 items-center justify-between bg-gray-500 border-[0.5px] border-gray-500 rounded-2xl flex-row">
                    <MagnifyingGlassIcon size={25} color="black" />
                    <TextInput
                        onChangeText={e => {
                            setfilter(e); // need to fetch food for searching
                        }}
                        className="flex-1 px-2 text-black"
                        type="text"
                        placeholder="Search here..."
                    />
                </View>

                <View className="gap-2 py-2">
                    <ScrollView
                        // contentContainerStyle={{ marginVertical: 3 }}
                        horizontal>
                        {categories.map(category => (
                            <TouchableOpacity
                                key={category.tag}
                                onPress={() => {
                                    filter === category.tag
                                        ? setfilter('none')
                                        : setfilter(category.tag);
                                }}
                                className={
                                    filter === category.tag
                                        ? 'px-3 py-2 rounded-xl bg-black mx-2'
                                        : 'px-3 py-2 rounded-xl border-black border-[0.5px] mx-2'
                                }>
                                <Text
                                    className={
                                        filter === category.tag
                                            ? 'text-white'
                                            : 'text-black'
                                    }>
                                    {category.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {isLoading ? (
                    <ActivityIndicator size={30} color="orange" />
                ) : (
                    <ScrollView
                        contentContainerStyle={{
                            flexWrap: 'wrap',
                            justifyContent: 'space-evenly',
                            flexDirection: 'row',
                        }}
                        showsVerticalScrollIndicator={false}>
                        {restaurantList.map(foodItem => {
                            if (filter === '') {
                                return (
                                    <RestaurantCard
                                        key={foodItem.ID}
                                        title={foodItem.Name}
                                        uri={foodItem.Avatar}
                                        time={foodItem.Time}
                                        navigation={navigation}
                                        item={foodItem}
                                    />
                                );
                            } else {
                                if (foodItem.Name.includes(filter)) {
                                    return (
                                        <RestaurantCard
                                            key={foodItem.ID}
                                            title={foodItem.Name}
                                            uri={foodItem.Avatar}
                                            time={foodItem.Time}
                                            navigation={navigation}
                                            item={foodItem}
                                        />
                                    );
                                }
                            }
                        })}
                    </ScrollView>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CustomerHomeScreen;
