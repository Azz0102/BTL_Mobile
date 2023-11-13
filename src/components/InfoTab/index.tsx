import React, { useState } from 'react';
import {
    Alert,
    Button,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { PencilSquareIcon } from 'react-native-heroicons/solid';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';

const DATA = {
    email: 'nguyenduchuyhht2@gmail.com',
    name: 'UET',
    phoneNumber: '9992222999',
    time: '10 am - 11pm',
    location: '144 Xuân Thủy',
};

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

const InfoTab = ({ navigation }) => {
    const [isEdit, setIsEdit] = useState(false);

    const handleLogin = async (values: any, setSubmitting: any) => {
        if (values.email.trim() !== '' && values.password.trim() !== '') {
            try {
                setSubmitting(false);
            } catch (error) {
                console.log(error);
                setSubmitting(false);
            }
        } else {
            Alert.alert(
                'Warning',
                'Enter email and password',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: true },
            );
            setSubmitting(false);
        }
    };
    return (
        <Animated.ScrollView
            entering={FadeInUp}
            exiting={FadeOutDown}
            className="flex-1">
            <View className="flex-1 px-8 pt-8">
                <View className="flex">
                    <TouchableOpacity
                        className="self-end"
                        onPress={() => {
                            setIsEdit(!isEdit);
                        }}>
                        <PencilSquareIcon size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <Formik
                    initialValues={{
                        email: DATA.email,
                        name: DATA.name,
                        phonenumber: DATA.phoneNumber,
                        time: DATA.time,
                        location: DATA.location,
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        handleLogin(values, setSubmitting);
                        console.log(values);
                    }}>
                    {({ handleSubmit, isValid, isSubmitting }) => (
                        <>
                            <Text className="text-gray-700">Email Address</Text>
                            <Field
                                component={CustomInput}
                                name="email"
                                placeholder="Email"
                                editable={isEdit}
                            />
                            <Text className="text-gray-700">Name</Text>
                            <Field
                                component={CustomInput}
                                name="name"
                                placeholder="Name"
                                editable={isEdit}
                            />
                            <Text className="text-gray-700">Phone Number</Text>
                            <Field
                                component={CustomInput}
                                name="phonenumber"
                                placeholder="Phone Number"
                                editable={isEdit}
                            />
                            <Text className="text-gray-700">Time</Text>
                            <Field
                                component={CustomInput}
                                name="time"
                                placeholder="Time"
                                editable={isEdit}
                            />
                            <Text className="text-gray-700">Location</Text>
                            <Field
                                component={CustomInput}
                                name="location"
                                placeholder="Location"
                                editable={isEdit}
                            />
                            {isEdit && (
                                <TouchableOpacity
                                    disabled={!isValid || isSubmitting}
                                    className={`py-3 ${
                                        !isValid || isSubmitting
                                            ? 'bg-slate-500'
                                            : 'bg-yellow-400'
                                    } rounded-xl mt-4`}
                                    onPress={handleSubmit}>
                                    <Text className="text-xl font-bold text-center text-gray-700">
                                        Submit
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </>
                    )}
                </Formik>
            </View>
        </Animated.ScrollView>
    );
};

export default InfoTab;
