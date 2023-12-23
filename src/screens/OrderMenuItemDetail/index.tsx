import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import { styles } from './style';
import { CameraIcon, PencilSquareIcon } from 'react-native-heroicons/solid';

const DATA = {
    time: '10 am - 11pm',
    location: '144 Xuân Thủy',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at felis at quam gravida commodo nec sit amet urna. Ut in vehicula massa. Fusce a pretium risus, ut bibendum enim. ',
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

const OrderMenuItemDetail = ({ navigation }: { navigation: any }) => {
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-gray-200">
            <ScrollView className="flex-1">
                <View className="w-full h-56 relative bg-white mb-6">
                    <ImageBackground
                        style={styles.image}
                        resizeMode="contain"
                        source={require('../../../assets/icons/facebook.png')}
                    />
                </View>
                <View className="w-full items-center">
                    <View>
                        <View className="m-2">
                            <Text className="text-black text-base">
                                {DATA.description}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default OrderMenuItemDetail;
