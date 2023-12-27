import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserHeader from '../../components/UserHeader';
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    CurrencyDollarIcon,
    GiftIcon,
    HeartIcon,
    ShoppingBagIcon,
    ArrowPathIcon,
} from 'react-native-heroicons/solid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../services/instance';
import { PencilSquareIcon } from 'react-native-heroicons/outline';
import { VictoryBar, VictoryChart } from 'victory-native';

const UserProfile = ({ navigation }) => {
    const [profileInfo, setProfileInfo] = useState({});
    const [userAvatar, setUserAvatar] = useState('');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const setEnabled = async () => {
            const id = await AsyncStorage.getItem('profileID');
            try {
                const data = await instance.get(
                    `/Users/GetSpecificProfile?profileID=${id}`,
                );
                console.log(data.data);
                setProfileInfo(data.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        setEnabled();

        const getUserInfo = async () => {
            const name = await AsyncStorage.getItem('userName');
            const avatar = await AsyncStorage.getItem('userAvatar');
            const role = await AsyncStorage.getItem('role');

            setUserName(name);
            setUserAvatar(avatar);
            setRole(role);
        };

        getUserInfo();
    }, []);

    return (
        <SafeAreaView>
            <UserHeader />
            <View style={styles.UserInfo}>
                <Image
                    style={styles.image}
                    source={{
                        uri: userAvatar,
                    }}
                />
                <View className="flex flex-col m-3">
                    <Text style={styles.text}>{userName}</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text>{profileInfo.Role}</Text>
                    </TouchableOpacity>
                    <View className="flex flex-row">
                        <Text style={styles.text}>Nguời theo dõi: 1</Text>
                        <Text style={styles.text}>Đang theo dõi: 4</Text>
                    </View>
                </View>
                <TouchableOpacity
                    className="ml-10 justify-center"
                    onPress={() => {
                        navigation.navigate('UpdateUser');
                    }}>
                    <PencilSquareIcon size={30} color="black" />
                </TouchableOpacity>
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
            <View className="flex">
                <View className="flex flex-row w-full justify-around items-center h-20 px-2 mt-5 ">
                    <TouchableOpacity className="bg-slate-800 w-1/3 h-full flex justify-center items-center mr-5 rounded-2xl">
                        <ShoppingBagIcon size={30} color={'rgb(243 244 246)'} />
                        <Text className="text-white">Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-slate-800 w-1/3 h-full flex justify-center items-center mr-5 rounded-2xl">
                        <CurrencyDollarIcon
                            size={30}
                            color={'rgb(243 244 246)'}
                        />
                        <Text className="text-white">CashPoints</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-slate-800 w-1/3 h-full flex justify-center items-center rounded-2xl">
                        <HeartIcon size={30} color={'rgb(243 244 246)'} />
                        <Text className="text-white">Favourites</Text>
                    </TouchableOpacity>
                </View>
                {role === 'Manager' && (
                    <View className="flex">
                        <VictoryChart domainPadding={25}>
                            <VictoryBar
                                categories={{
                                    x: [
                                        '23/12',
                                        '24/12',
                                        '25/12',
                                        '26/12',
                                        '27/12',
                                    ],
                                }}
                                data={[
                                    { x: 1, y: 100 },
                                    { x: 2, y: 120 },
                                    { x: 3, y: 110 },
                                    { x: 4, y: 102 },
                                    { x: 5, y: 140 },
                                ]}
                            />
                        </VictoryChart>
                        <Text className="text-black items-center justify-center text-center">
                            Revenue in last 5 days
                        </Text>
                    </View>
                )}

                <View className="mt-10 items-center">
                    <TouchableOpacity
                        className="border-2 border-red-600 rounded-lg w-1/2 items-center flex-row justify-center"
                        onPress={async () => {
                            await AsyncStorage.multiRemove([
                                'profileID',
                                'profile_token',
                                'codename',
                                'resId',
                                'isWorking',
                            ]);
                            navigation.navigate('ListProfile');
                        }}>
                        <Text className="text-red-600 m-2 text-lg">
                            Change Profile
                        </Text>
                        <ArrowPathIcon size={26} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    UserInfo: {
        backgroundColor: 'orange',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        // justifyContent: 'center',
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
        marginTop: 20,
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
