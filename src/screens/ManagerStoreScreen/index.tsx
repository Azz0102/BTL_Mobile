import React, { useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    UserGroupIcon,
    Squares2X2Icon,
    InformationCircleIcon,
    NewspaperIcon,
    ClipboardDocumentIcon,
} from 'react-native-heroicons/outline';
import BottomSlider from '../../components/BottomSlider';
import EmPloyeeTab from '../../components/EmployeeTab';
import TablesTab from '../../components/TablesTab';
import MenuTab from '../../components/MenuTab';
import InfoTab from '../../components/InfoTab';
import OrderTab from '../../components/OrderTab';

const ManagerStoreScreen = ({ navigation }) => {
    const [isHaveRestaurant, setIsHaveRestaurant] = useState(true);
    const [isSelectedTab, setIsSelectedTab] = useState(0);

    const handleSelectedTab = () => {
        if (isSelectedTab === 0) {
            return <EmPloyeeTab navigation={navigation} />;
        } else if (isSelectedTab === 1) {
            return <OrderTab navigation={navigation} />;
        } else if (isSelectedTab === 2) {
            return <MenuTab navigation={navigation} />;
        } else {
            return <InfoTab navigation={navigation} />;
        }
    };

    return (
        <SafeAreaView className="flex flex-1 pb-20 bg-orange-300">
            <View className="flex flex-1 mt-5">
                <View className="flex flex-row">
                    <TouchableOpacity
                        className="flex overflow-hidden"
                        onPress={() => {
                            setIsSelectedTab(0);
                        }}>
                        <View className="flex flex-row items-center">
                            <View className="pl-2">
                                <UserGroupIcon size={20} color="black" />
                            </View>
                            <Text className="text-black mx-2 mb-1 text-lg">
                                Employees
                            </Text>
                        </View>
                        <BottomSlider isSelected={isSelectedTab} index={0} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex overflow-hidden"
                        onPress={() => {
                            setIsSelectedTab(1);
                        }}>
                        <View className="flex flex-row items-center">
                            <View className="pl-2">
                                <ClipboardDocumentIcon
                                    size={20}
                                    color="black"
                                />
                            </View>
                            <Text className="text-black mx-2 mb-1 text-lg">
                                Orders
                            </Text>
                        </View>
                        <BottomSlider isSelected={isSelectedTab} index={1} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex overflow-hidden"
                        onPress={() => {
                            setIsSelectedTab(2);
                        }}>
                        <View className="flex flex-row items-center">
                            <View className="pl-2">
                                <NewspaperIcon size={20} color="black" />
                            </View>
                            <Text className="text-black mx-2 mb-1 text-lg">
                                Menu
                            </Text>
                        </View>
                        <BottomSlider isSelected={isSelectedTab} index={2} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex overflow-hidden"
                        onPress={() => {
                            setIsSelectedTab(3);
                        }}>
                        <View className="flex flex-row items-center">
                            <View className="pl-2">
                                <InformationCircleIcon
                                    size={20}
                                    color="black"
                                />
                            </View>
                            <Text className="text-black mx-2 mb-1 text-lg">
                                Infor
                            </Text>
                        </View>
                        <BottomSlider isSelected={isSelectedTab} index={3} />
                    </TouchableOpacity>
                </View>
                {handleSelectedTab()}
            </View>
        </SafeAreaView>
    );
};

export default ManagerStoreScreen;
