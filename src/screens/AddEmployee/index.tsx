import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEmployee = ({ navigation }: { navigation: any }) => {
    const handleAddEmployee = async (values: any, setSubmitting: any) => {
        try {
            const resID = await AsyncStorage.getItem('resId');
            const res = await instance.patch('/Restaurants/AddEmployee', {
                codeName: values.id,
                resID: resID,
            });
            console.log(res);
            setSubmitting(false);
        } catch (error) {
            console.log(error);
            setSubmitting(false);
        }
        navigation.goBack();
    };
    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none',
            },
        });
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
    }, [navigation]);
    return (
        <View className="flex-1 bg-orange-300 justify-center items-center p-8">
            <Text className="text-black text-xl font-bold pb-4">
                Add Employee
            </Text>
            <Formik
                initialValues={{ id: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    handleAddEmployee(values, setSubmitting);
                    console.log(values);
                }}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <>
                        <Field
                            component={CustomInput}
                            name="id"
                            placeholder="id"
                            textAlign={'center'}
                        />
                        <Text className="text-gray-700">
                            Fill in ID of employee to add employee to restaurant
                        </Text>
                        <TouchableOpacity
                            disabled={!isValid || isSubmitting}
                            className={`py-2 ${
                                !isValid || isSubmitting
                                    ? 'bg-slate-500'
                                    : 'bg-yellow-400'
                            } rounded-lg mt-4`}
                            onPress={handleSubmit}>
                            <Text className="text-xl font-bold text-center text-gray-700 mx-4">
                                Add
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
};

export default AddEmployee;
