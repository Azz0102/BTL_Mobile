import React, { useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    UserGroupIcon,
    Squares2X2Icon,
    InformationCircleIcon,
    NewspaperIcon,
} from 'react-native-heroicons/outline';
import BottomSlider from '../../components/BottomSlider';
import EmPloyeeTab from '../../components/EmployeeTab';
import TablesTab from '../../components/TablesTab';
import MenuTab from '../../components/MenuTab';
import InfoTab from '../../components/InfoTab';
import ActiveOrderTab from '../../components/ActiveOrderTab';
import HistoryOrderTab from '../../components/HistoryOrderTab';

const CustomerOrderTabScreen = ({ navigation }) => {
    const [isHaveRestaurant, setIsHaveRestaurant] = useState(true);
    const [isSelectedTab, setIsSelectedTab] = useState(0);

    const handleSelectedTab = () => {
        if (isSelectedTab === 0) {
            return <ActiveOrderTab navigation={navigation} />;
        } else if (isSelectedTab === 1) {
            return <HistoryOrderTab navigation={navigation} />;
        }
    };

    return (
        <SafeAreaView className="flex flex-1 pb-20 bg-gray-300">
            <View className="flex flex-1 mt-5">
                <View className="flex flex-row">
                    <TouchableOpacity
                        className="flex overflow-hidden w-1/2 items-center"
                        onPress={() => {
                            setIsSelectedTab(0);
                        }}>
                        <View className="flex flex-row items-center">
                            <Text className="text-black mx-2 mb-1 text-lg">
                                Active Order
                            </Text>
                        </View>
                        <BottomSlider isSelected={isSelectedTab} index={0} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex overflow-hidden w-1/2 items-center"
                        onPress={() => {
                            setIsSelectedTab(1);
                        }}>
                        <View className="flex flex-row items-center">
                            <Text className="text-black mx-2 mb-1 text-lg">
                                History
                            </Text>
                        </View>
                        <BottomSlider isSelected={isSelectedTab} index={1} />
                    </TouchableOpacity>
                </View>
                {handleSelectedTab()}
            </View>
        </SafeAreaView>
    );
};

export default CustomerOrderTabScreen;
