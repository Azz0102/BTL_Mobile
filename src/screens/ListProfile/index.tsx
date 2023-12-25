import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    Platform,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
} from 'react-native';

import {
    useSafeAreaInsets,
    initialWindowMetrics,
    SafeAreaView,
} from 'react-native-safe-area-context';
import ProfileItem from '../../components/ProfileItem';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListProfile = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [listProfile, setListProfile] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getListProfile = async () => {
            try {
                const data = await instance.get(
                    `/Users/GetProfiles?UserID=${auth().currentUser?.uid}`,
                );
                console.log(data.data);
                setIsLoading(false);
                setListProfile(data.data);
                return data;
            } catch (error) {
                console.log(error);
            }
        };
        getListProfile();

        const postUidAndToken = async () => {
            if (
                auth().currentUser?.metadata.creationTime !==
                auth().currentUser?.metadata.lastSignInTime
            ) {
                try {
                    const token = await auth().currentUser?.getIdToken();
                    console.log(token);
                    const data = await instance.post('Users/signin', {
                        email: auth().currentUser?.email,
                        uid: auth().currentUser?.uid,
                        token: token,
                    });
                    console.log(data.data);
                    await AsyncStorage.setItem('userName', data.data.Name);
                    await AsyncStorage.setItem('userAvatar', data.data.Avatar);
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const data = await instance.post('Users/register', {
                        email: auth().currentUser?.email,
                        uid: auth().currentUser?.uid,
                        token: auth().currentUser?.getIdToken(),
                        PhoneNumber: '0963832667',
                    });
                    console.log(data.data);
                    await AsyncStorage.setItem('userName', data.data.Name);
                    await AsyncStorage.setItem('userAvatar', data.data.Avatar);
                } catch (error) {
                    console.log('sign up error');
                }
            }
        };
        postUidAndToken();
    }, []);

    return (
        <SafeAreaView>
            <View
                style={{
                    // Paddings to handle safe area
                    paddingTop:
                        Platform.OS === 'ios'
                            ? insets.top
                            : initialWindowMetrics?.insets.top,
                    paddingBottom:
                        Platform.OS === 'ios'
                            ? insets.bottom
                            : initialWindowMetrics?.insets.bottom,
                    paddingLeft:
                        Platform.OS === 'ios'
                            ? insets.left
                            : initialWindowMetrics?.insets.left,
                    paddingRight:
                        Platform.OS === 'ios'
                            ? insets.right
                            : initialWindowMetrics?.insets.right,
                }}
                className="flex bg-white h-full">
                <StatusBar backgroundColor="white" />
                <View className="flex mr-3">
                    <TouchableOpacity
                        className="rounded-lg border-2 items-center border-red-700 w-2/6 m-1 self-end"
                        onPress={() => {
                            auth()
                                .signOut()
                                .then(() => {
                                    GoogleSignin.revokeAccess();
                                    console.log('User signed out!');
                                });
                        }}>
                        <Text className="text-red-700 m-1 text-lg">
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-center text-2xl font-bold mb-2 text-slate-800">
                    Profile
                </Text>
                <TouchableOpacity
                    className="bg-transparent m-4 p-3 rounded-lg flex items-center border-cyan-500 border-2"
                    onPress={() => navigation.navigate('AddProfile')}>
                    <Text className="text-cyan-500 text-lg">+ Add Profile</Text>
                </TouchableOpacity>
                {isLoading ? (
                    <ActivityIndicator color="orange" size={30} />
                ) : (
                    <FlatList
                        data={listProfile}
                        contentContainerStyle={{ paddingBottom: 350 }}
                        renderItem={({ item }) => (
                            <ProfileItem
                                title={item.UserID}
                                id={item.ID}
                                navigation={navigation}
                                role={item.Role}
                            />
                        )}
                        keyExtractor={item => item.ID}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default ListProfile;
