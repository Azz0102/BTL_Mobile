import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Image,
    ActivityIndicator,
} from 'react-native';
import { styles } from './style';
import {
    CheckIcon,
    ClockIcon,
    MapPinIcon,
    CalendarDaysIcon,
    UserGroupIcon,
    Squares2X2Icon,
    PencilIcon,
    BanknotesIcon,
    ArrowPathIcon,
} from 'react-native-heroicons/outline';
import { AirbnbRating } from '@rneui/themed';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import OrderDetailListItem from '../../components/OrderDetailListItem';
import TableTag from '../../components/TableTag';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import Modal from 'react-native-modal';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerOrderDetail = ({ navigation, route }) => {
    const [role, setRole] = useState('Customer');
    const [isCash, setIsCash] = useState(false);
    const [isModalTableVisible, setIsModalTableVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [orderInfo, setOrderInfo] = useState([{}]);
    const [totals, setTotals] = useState(0);
    const [listFoods, setListFoods] = useState([]);
    const [listDrinks, setListDrinks] = useState([]);
    const [resInfo, setResInfo] = useState([]);
    const [tableNumber, setTableNumber] = useState(null);
    const { orderID, listFood, listDrink, total } = route.params;
    const [servantInfo, setServantInfo] = useState('');
    console.log(orderID, listFood, listDrink);

    const handleUpdateOrder = async () => {
        if (role === 'Chef') {
            try {
                const res = await instance.patch('Orders/UpdateOrder', {
                    Order_id: orderID,
                    Order_status: 1,
                });
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        } else if (role === 'Cashier') {
            try {
                const res = await instance.patch('Orders/UpdateOrder', {
                    Order_id: orderID,
                    Payment_Status: 1,
                });

                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleUpdateTable = async num => {
        try {
            const res = await instance.patch('Orders/UpdateOrder', {
                Order_id: orderID,
                Table_Number: num,
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteOrder = async () => {
        try {
            const res = await instance.delete(
                `Orders/DeleteOrder?OrderID=${orderID}`,
            );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        navigation.goBack();
    };

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none',
            },
        });
        const getOrder = async () => {
            try {
                const res = await instance.get(
                    `/Orders/GetSpecificOrder?Order_id=${orderID}`,
                );
                console.log(res.data[0]);
                setTableNumber(res.data[0].Table_Number);
                setOrderInfo(res.data);

                try {
                    const data = await instance.get(
                        `/Users/GetSpecificProfile?profileID=${res.data[0].Waitress_id}`,
                    );
                    setServantInfo(data.data[0].CodeName);
                } catch (error) {
                    console.error(error);
                }

                try {
                    const data = await instance.get(
                        '/Restaurants/GetAllRestaurant',
                    );
                    console.log(data.data);
                    data.data.map(item => {
                        if (item.ID === res.data[0].Restaurant_id) {
                            setResInfo(item);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
                if (res.data) {
                    setListDrinks(listDrink);
                    setListFoods(listFood);
                    setTotals(total);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getOrder();
        const getRole = async () => {
            const rolee = await AsyncStorage.getItem('role');
            // console.log(listFood, 'Huy');
            setRole(rolee);
            setIsLoading(false);
        };
        getRole();
        return () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    position: 'absolute',
                    shadowColor: '#7F5DF0',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    elevation: 5,
                    height: 80,
                    bottom: 0,
                    borderTopLeftRadius: 70,
                    borderTopRightRadius: 70,
                },
            });
        };
    }, [navigation, orderID]);
    return (
        <ScrollView className="flex-1 bg-gray-200">
            {isLoading ? (
                <ActivityIndicator size={30} color="orange" />
            ) : (
                <View className="w-full">
                    <View className="w-full h-56 relative bg-white mb-6">
                        <ImageBackground
                            style={styles.bigimage}
                            resizeMode="stretch"
                            source={{ uri: resInfo.Avatar }}
                        />
                    </View>
                    <View className="w-full items-center">
                        <View className="w-full">
                            <View className="border-b-stone-500 border-b-2 w-full items-center">
                                <Text className="text-black text-base">
                                    {resInfo.Description}
                                </Text>
                                <View className="mb-2">
                                    <AirbnbRating
                                        size={20}
                                        reviewSize={20}
                                        isDisabled
                                    />
                                </View>
                            </View>
                            <View className="m-2 flex-row items-center">
                                <ClockIcon size={26} color="black" />
                                <Text className="ml-2 text-black text-base">
                                    {resInfo.Time}
                                </Text>
                            </View>
                            <View className="m-2 flex-row items-center border-b-stone-500 border-b-2 pb-2">
                                <MapPinIcon size={26} color="black" />
                                <Text className="ml-2 text-black text-base">
                                    {resInfo.Address}
                                </Text>
                            </View>
                        </View>
                        <View className="w-full">
                            <View className="m-2 flex-row items-center">
                                <CalendarDaysIcon size={26} color="black" />
                                <Text className="ml-2 text-black text-base">
                                    {orderInfo[0].OrderDate}
                                </Text>
                            </View>
                            <View className="m-2 flex-row items-center">
                                <UserGroupIcon size={26} color="black" />
                                <Text className="ml-2 text-black text-base">
                                    {orderInfo[0].NumberOfCustomers} people
                                </Text>
                            </View>
                            <View className="m-2 flex-row items-center">
                                <UserGroupIcon size={26} color="black" />
                                <Text className="ml-2 text-black text-base">
                                    {orderInfo[0].NumberOfCustomers} people
                                </Text>
                            </View>
                            {role === 'Manager' && (
                                <View className="m-2 flex-row items-center">
                                    <Text className="text-black text-base">
                                        Servant ID:{' '}
                                    </Text>
                                    <Text className="ml-2 text-black text-base">
                                        {servantInfo}
                                    </Text>
                                </View>
                            )}

                            <View className="m-2 flex-row items-center border-b-stone-500 border-b-2 pb-2">
                                <Squares2X2Icon size={26} color="black" />
                                {tableNumber && <TableTag num={tableNumber} />}
                                {role === 'Manager' && (
                                    <TouchableOpacity
                                        className="rounded-full bg-black p-0.5 ml-2"
                                        onPress={() => {
                                            setIsModalTableVisible(true);
                                        }}>
                                        <ArrowPathIcon
                                            size={26}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View className="m-2 flex-row items-center">
                                <PencilIcon size={26} color="black" />
                                <Text className="ml-2 text-black text-base">
                                    Note
                                </Text>
                            </View>
                            <Text className="text-black text-base mx-2 mb-4 border-2 border-slate-700 rounded-xl p-2">
                                {orderInfo[0].Note}
                            </Text>
                        </View>
                        <View className="w-full">
                            {listFoods.map(data => (
                                <View className="flex-row w-full items-center my-1 justify-between">
                                    <View className="flex-row items-center ml-1">
                                        <Image
                                            source={{ uri: data.food_Avatar }}
                                            style={styles.image}
                                        />
                                        <Text className="text-black ml-2">
                                            {data.Name}
                                        </Text>
                                    </View>
                                    <View className="flex-row mr-1">
                                        {orderInfo.map(item => {
                                            if (item.FoodID === data.Food_id) {
                                                console.log(data.Name);
                                                return (
                                                    <Text className="text-black mr-2 text-base ">
                                                        x {item.Quantity}
                                                    </Text>
                                                );
                                            }
                                        })}
                                        {orderInfo[0].Order_status !== 0 ? (
                                            <View className="bg-green-600 rounded-full p-1 items-center flex-row w-23 justify-center self-end">
                                                <CheckIcon
                                                    color="white"
                                                    size={20}
                                                />
                                                <Text className="text-white text-xs ml-1">
                                                    Complete
                                                </Text>
                                            </View>
                                        ) : (
                                            <View className="bg-red-600 rounded-full p-1 items-center flex-row w-20 justify-center self-end">
                                                <ActivityIndicator color="white" />
                                                <Text className="text-white text-xs ml-1">
                                                    Waiting
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            ))}
                            {listDrinks.map(foodItem => (
                                <OrderDetailListItem navigation={navigation} />
                            ))}
                        </View>
                        <View className="w-full p-2 flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <Text className="text-black text-lg">
                                    Payment Method :
                                </Text>
                                {orderInfo[0].Payment_method === 'Cash' ? (
                                    <View className="flex-row items-center ml-2">
                                        <BanknotesIcon
                                            color="green"
                                            size={24}
                                        />
                                        <Text className="text-black text-lg ml-2">
                                            Cash
                                        </Text>
                                    </View>
                                ) : (
                                    <View className="flex-row items-center ml-2">
                                        <Image
                                            style={styles.momoicon}
                                            source={require('../../../assets/images/momoicon.png')}
                                        />
                                        <Text className="text-black text-lg ml-2">
                                            MoMo
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <View>
                                <Text className="text-black text-lg ml-2">
                                    (
                                    {orderInfo[0].Payment_Status
                                        ? 'Purchased'
                                        : 'Not Purchased'}
                                    )
                                </Text>
                            </View>
                        </View>
                        <View className="w-full flex-row justify-between items-center mt-2 mb-2">
                            <Text className="text-black mx-2 text-lg">
                                Total :
                            </Text>
                            <View className="flex-row items-center">
                                <BanknotesIcon size={36} color="green" />
                                <Text className="text-black mx-2 text-lg">
                                    {total.toLocaleString()} VND
                                </Text>
                            </View>
                        </View>
                        {role === 'Customer' && (
                            <View className="w-full">
                                <View className="w-full flex-row justify-between mb-2">
                                    <TouchableOpacity
                                        className="mt-10 border-2 border-red-600 rounded-lg items-center ml-2 w-1/3"
                                        onPress={() => {
                                            handleDeleteOrder();
                                        }}>
                                        <Text className="text-red-600 m-2 text-xl">
                                            Cancel Order
                                        </Text>
                                    </TouchableOpacity>
                                    {!orderInfo[0].Payment_Status && (
                                        <TouchableOpacity
                                            className="mt-10 border-2 border-green-600 rounded-lg items-center mr-2 w-1/3"
                                            onPress={() => {
                                                navigation.navigate(
                                                    'CustomerPayment',
                                                    {
                                                        orderID: orderID,
                                                    },
                                                );
                                            }}>
                                            <Text className="text-green-600 m-2 text-xl">
                                                Payment
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        )}
                        {role === 'Cashier' && (
                            <View className="w-full items-center my-5">
                                <TouchableOpacity
                                    className="border-2 border-green-600 w-1/2 items-center rounded-lg py-2"
                                    onPress={() => {
                                        handleUpdateOrder();
                                    }}>
                                    <Text className="text-green-600 text-xl">
                                        Confirm Purchased
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {role === 'Chef' && (
                            <View className="w-full items-center my-5">
                                <TouchableOpacity
                                    className="border-2 border-green-600 w-1/2 items-center rounded-lg py-2"
                                    onPress={() => {
                                        handleUpdateOrder();
                                    }}>
                                    <Text className="text-green-600 text-xl">
                                        Confirm Complete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <Modal
                        isVisible={isModalTableVisible}
                        onBackButtonPress={() => {
                            setIsModalTableVisible(false);
                        }}
                        onBackdropPress={() => {
                            setIsModalTableVisible(false);
                        }}>
                        <ScrollView className="flex-1">
                            <View className="bg-white rounded-lg flex justify-center items-center">
                                <Text className="text-2xl text-black m-2">
                                    Table List
                                </Text>
                                <TouchableOpacity
                                    className="m-2 bg-red-500 rounded-lg"
                                    onPress={() => {
                                        setIsModalTableVisible(false);
                                    }}>
                                    <Text className="p-2 text-white">
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                {Array.from(
                                    { length: resInfo.Number_of_tables },
                                    (_, index) => index + 1,
                                ).map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            className="w-full border-b-2 border-b-slate-800 flex-row p-2"
                                            onPress={() => {
                                                handleUpdateTable(index + 1);
                                                setTableNumber(index + 1);
                                                setIsModalTableVisible(false);
                                            }}>
                                            <Text className="text-black text-lg">
                                                Table {index + 1}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </ScrollView>
                    </Modal>
                </View>
            )}
        </ScrollView>
    );
};

export default CustomerOrderDetail;
