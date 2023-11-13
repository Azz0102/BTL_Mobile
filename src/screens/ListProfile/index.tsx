import React from 'react';
import {
    View,
    FlatList,
    Text,
    Platform,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

import {
    useSafeAreaInsets,
    initialWindowMetrics,
    SafeAreaView,
} from 'react-native-safe-area-context';
import ProfileItem from '../../components/ProfileItem';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'Third Item1',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'Third Item2',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d75',
        title: 'Third Item3',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d76',
        title: 'Third Item4',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d77',
        title: 'Third Item5',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d78',
        title: 'Third Item6',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d79',
        title: 'Third Item7',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d70',
        title: 'Third Item8',
    },
];

const ListProfile = ({ navigation }) => {
    const insets = useSafeAreaInsets();

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
                className="flex bg-white">
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
                <FlatList
                    data={DATA}
                    contentContainerStyle={{ paddingBottom: 350 }}
                    renderItem={({ item }) => (
                        <ProfileItem title={item.title} />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

export default ListProfile;
