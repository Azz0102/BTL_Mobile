import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserHeader from '../../components/UserHeader';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    CurrencyDollarIcon,
    GiftIcon,
    HeartIcon,
    ShoppingBagIcon,
} from 'react-native-heroicons/solid';

const UserProfile = () => {
    return (
        <SafeAreaView>
            <UserHeader />
            <View style={styles.UserInfo}>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <View className="flex flex-col m-3">
                    <Text style={styles.text}>Kanra12</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text>Thành viên</Text>
                    </TouchableOpacity>
                    <View className="flex flex-row">
                        <Text style={styles.text}>Nguời theo dõi: 1</Text>
                        <Text style={styles.text}>Đang theo dõi: 4</Text>
                    </View>
                </View>
            </View>
            <View style={styles.wallet}>
                <View className="flex flex-col m-2">
                    <View className="flex flex-row items-center">
                        <Text className="text-black">12</Text>
                        <CurrencyDollarIcon size={27} color="rgb(21 128 61)" />
                    </View>
                    <Text className="text-black">Available balance</Text>
                </View>
                <TouchableOpacity style={styles.giftIcon}>
                    <GiftIcon size={27} color="orange" />
                </TouchableOpacity>
            </View>
            <View className="flex flex-row relative top-12 w-full justify-around items-center h-20 px-2 mt-5 ">
                <TouchableOpacity className="bg-slate-800 w-1/3 h-full flex justify-center items-center mr-5 rounded-2xl">
                    <ShoppingBagIcon size={30} color={'rgb(243 244 246)'} />
                    <Text className="text-white">Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-slate-800 w-1/3 h-full flex justify-center items-center mr-5 rounded-2xl">
                    <CurrencyDollarIcon size={30} color={'rgb(243 244 246)'} />
                    <Text className="text-white">CashPoints</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-slate-800 w-1/3 h-full flex justify-center items-center rounded-2xl">
                    <HeartIcon size={30} color={'rgb(243 244 246)'} />
                    <Text className="text-white">Favourites</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    UserInfo: {
        backgroundColor: 'orange',
        display: 'flex',
        flexDirection: 'row',
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
        borderRadius: 35,
        margin: 10,
    },
    text: {
        margin: 1,
    },
    button: {
        margin: 1,
    },
    wallet: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 20,
        height: 80,
        width: '97%',
        borderWidth: 1,
        borderColor: 'rgb(156 163 175)',
        position: 'relative',
        top: '10%',
        alignItems: 'center',
        marginLeft: '1.5%',
    },
    giftIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        borderRadius: 15,
        position: 'absolute',
        right: '5%',
    },
});

export default UserProfile;
