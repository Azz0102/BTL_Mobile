import React, { useState } from 'react';
import { Alert, Button, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
});

const OrderScreen = ({ navigation, route }) => {
    const { id } = route.params;
    console.log(id);
    const [isModalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [orderID, setOrderID] = useState(0);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = async () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const handleFinishOrder = async (values: any, setSubmitting: any) => {
        try {
            const token = await AsyncStorage.getItem('profile_token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const resID = JSON.stringify(id);
            const res = await instance.post(
                'Orders/CreateOrder',
                {
                    NumberOfCutomers: values.numberofpeople,
                    OrderDate: date.toLocaleString(),
                    Note: values.note,
                    Restaurant_id: resID,
                },
                config,
            );
            console.log(res.data);

            navigation.navigate('OrderMenu', {
                orderID: res.data.insertId,
                resID: id,
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Animated.ScrollView
            entering={FadeInUp}
            exiting={FadeOutDown}
            className="flex-1">
            <View className="flex-1 px-8 pt-8">
                <View className="w-full items-center mb-10">
                    <Text className="text-black text-4xl">Order</Text>
                </View>
                <Formik
                    initialValues={{
                        numberofpeople: '',
                        datentime: '',
                        note: '',
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        handleFinishOrder(values, setSubmitting);
                        console.log(values);
                    }}>
                    {({ handleSubmit, isValid, isSubmitting }) => (
                        <>
                            <Text className="text-gray-700">
                                Number of people
                            </Text>
                            <Field
                                component={CustomInput}
                                name="numberofpeople"
                                placeholder="ex: 2"
                                placeholderTextColor="gray"
                            />
                            <Text className="text-gray-700">Date and Time</Text>
                            <Field
                                component={CustomInput}
                                name="datentime"
                                placeholder="10/10/1980, 6:0:0 AM"
                                placeholderTextColor="gray"
                                editable={false}
                                value={date.toLocaleString()}
                            />
                            <TouchableOpacity
                                onPress={showDatepicker}
                                className="bg-blue-500 rounded-lg items-center mt-2">
                                <Text className="text-black m-2 text-base">
                                    Show date picker!
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={showTimepicker}
                                className="bg-blue-500 rounded-lg items-center my-2">
                                <Text className="text-black m-2 text-base">
                                    Show time picker!
                                </Text>
                            </TouchableOpacity>
                            <Text className="text-gray-700">Note</Text>
                            <Field
                                component={CustomInput}
                                name="note"
                                placeholder="note for restaurant"
                                placeholderTextColor="gray"
                                multiline
                                numberOfLines={4}
                            />
                            <View className="flex-row justify-center items-center">
                                {/* <TouchableOpacity
                                    disabled={!isValid || isSubmitting}
                                    className={`p-3 w-32 ${
                                        !isValid || isSubmitting
                                            ? 'bg-slate-500'
                                            : 'bg-yellow-400'
                                    } rounded-xl mt-4`}
                                    onPress={() => {
                                        handleSubmit();
                                        navigation.goBack();
                                    }}>
                                    <Text className="text-xl font-bold text-center text-gray-700">
                                        Finish
                                    </Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    disabled={!isValid || isSubmitting}
                                    className={`p-3 w-32 ${
                                        !isValid || isSubmitting
                                            ? 'bg-slate-500'
                                            : 'bg-yellow-400'
                                    } rounded-xl mt-4`}
                                    onPress={() => {
                                        handleSubmit();
                                    }}>
                                    <Text className="text-xl font-bold text-center text-gray-700">
                                        OrderMenu
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </Animated.ScrollView>
    );
};

export default OrderScreen;
