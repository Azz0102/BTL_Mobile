import React from 'react';
import {
    View,
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
// import { styles } from './style';
import IdToAdd from '../../components/IdToAdd';

const ServantScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView>
            <View className="flex bg-white">
                <IdToAdd />
            </View>
        </SafeAreaView>
    );
};

export default ServantScreen;
