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

const CustomerHomeScreen = ({ navigation }) => {
    const [restaurantList, setRestaurantList] = useState([]);
    const [filter, setfilter] = useState('none');
    const [isLoading, setIsLoading] = useState(false);

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
    }, []);

    const filterfoodData = [
        {
            id: 1,
            foodName: 'Poha',
            available: true,
            foodImageUrl:
                'https://res.cloudinary.com/dfsucyg30/image/upload/v1690964445/nxuiyqocgn0av3w7uszi.png',
            foodPrice: '25$',
            time: '2s',
        },
        {
            id: 2,
            foodName: 'Samosa',
            available: true,
            foodImageUrl:
                'https://res.cloudinary.com/dfsucyg30/image/upload/v1690964504/vanzrpqb0nwrmtxa9mau.png',
            foodPrice: '50$',
            time: '5s',
        },
        {
            id: 3,
            foodName: 'Egg Rice',
            available: true,
            foodImageUrl:
                'https://res.cloudinary.com/dfsucyg30/image/upload/v1690968955/dfk4fhclsuf9clv9hpkv.png',
            foodPrice: '15$',
            time: '5s',
        },
        {
            id: 4,
            foodName: 'Hamburger',
            available: true,
            foodImageUrl:
                'https://res.cloudinary.com/dfsucyg30/image/upload/v1690968994/hwq1jyyg0omlilmgppip.png',
            foodPrice: '30$',
            time: '5s',
        },
        {
            id: 5,
            foodName: 'Pizza',
            available: true,
            foodImageUrl:
                'https://res.cloudinary.com/dfsucyg30/image/upload/v1690969066/yg4xrarfclursjdwe3bg.png',
            foodPrice: '25$',
            time: '5s',
        },
    ];
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
                        <Text className="text-lg text-black">Hi Foodie,</Text>
                        <Text className="text-xl font-bold text-gray-600">
                            Hungry Today?
                        </Text>
                    </View>
                    <View className="items-center justify-center">
                        <Image
                            className="h-16 w-16"
                            source={{
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
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
                        {restaurantList.map(foodItem => (
                            <RestaurantCard
                                key={foodItem.ID}
                                title={foodItem.Name}
                                uri={foodItem.Avatar}
                                time={foodItem.Time}
                                navigation={navigation}
                                item={foodItem}
                            />
                        ))}
                    </ScrollView>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default CustomerHomeScreen;
