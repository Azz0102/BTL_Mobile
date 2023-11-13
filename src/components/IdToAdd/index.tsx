import React from 'react';
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    Button,
    StatusBar,
} from 'react-native';
import {
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
// import { styles } from './style';

const id = 'dad1122';

const IdToAdd = () => {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex bg-orange-200 justify-center items-center w-full h-full">
            <StatusBar backgroundColor="rgb(254 215 170)" />
            <Text className="text-center text-2xl font-bold mb-2 text-slate-800">
                Unique ID
            </Text>
            <View className="border-2 border-slate-800 rounded-lg px-8 py-1">
                <Text className="text-center text-2xl font-bold mb-2 text-slate-800">
                    {id}
                </Text>
            </View>
            <View>
                <Text className="text-center text-xl font-bold mb-2 text-slate-800">
                    This Id use to add you in restaurant
                </Text>
            </View>
        </View>
    );
};

export default IdToAdd;
