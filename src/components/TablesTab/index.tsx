import React, { useState } from 'react';
import {
    Button,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

import TableItem from '../TableItem';
import EmPloyeeTab from '../EmployeeTab';
import MenuTab from '../MenuTab';
import {
    ClipboardDocumentIcon,
    QueueListIcon,
} from 'react-native-heroicons/solid';
import BottomSlider from '../BottomSlider';
import TableListTab from '../TableListTab';
import OrderTab from '../OrderTab';

const TablesTab = ({ navigation }) => {
    const [isSelectedTab, setIsSelectedTab] = useState(0);

    const handleSelectedTab = () => {
        if (isSelectedTab === 0) {
            return <TableListTab navigation={navigation} />;
        } else if (isSelectedTab === 1) {
            return <OrderTab navigation={navigation} />;
        }
    };

    return (
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOutDown}
            className="flex-1">
            <View className="flex flex-row">
                <TouchableOpacity
                    className="flex w-1/2 overflow-hidden items-center"
                    onPress={() => {
                        setIsSelectedTab(0);
                    }}>
                    <View className="flex flex-row items-center">
                        <View className="pl-2">
                            <QueueListIcon size={20} color="black" />
                        </View>
                        <Text className="text-black mx-2 mb-1 text-lg">
                            List Table
                        </Text>
                    </View>
                    <BottomSlider isSelected={isSelectedTab} index={0} />
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex w-1/2 overflow-hidden items-center"
                    onPress={() => {
                        setIsSelectedTab(1);
                    }}>
                    <View className="flex flex-row items-center">
                        <View className="pl-2">
                            <ClipboardDocumentIcon size={20} color="black" />
                        </View>
                        <Text className="text-black mx-2 mb-1 text-lg">
                            Orders
                        </Text>
                    </View>
                    <BottomSlider isSelected={isSelectedTab} index={1} />
                </TouchableOpacity>
            </View>
            {handleSelectedTab()}
        </Animated.View>
    );
};

export default TablesTab;
