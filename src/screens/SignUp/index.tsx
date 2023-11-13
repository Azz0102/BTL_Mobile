import React, { useState } from 'react';
import {
    Text,
    View,
    Alert,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
    initialWindowMetrics,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { Field, Formik } from 'formik';
import CustomInput from '../../components/CustomInput';
import * as yup from 'yup';

const signUpValidationSchema = yup.object().shape({
    fullName: yup
        .string()
        .matches(/(\w.+\s).+/, 'Enter at least 2 names')
        .required('Full name is required'),
    phoneNumber: yup
        .string()
        .matches(/^\+?[0-9]+$/, 'Enter a valid phone number')
        .required('Phone number is required'),
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email is required'),
    password: yup
        .string()
        .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
        .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
        .matches(/\d/, 'Password must have a number')
        .matches(
            /[!@#$%^&*()\-_"=+{}; :,<.>]/,
            'Password must have a special character',
        )
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),
});

const SignUp = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    const handleSignUp = async (values: any, setSubmitting: any) => {
        if (values.email.trim() !== '' && values.password.trim() !== '') {
            try {
                const user = await auth().createUserWithEmailAndPassword(
                    values.email,
                    values.password,
                );
                firestore()
                    .collection('users')
                    .doc(user.user.uid)
                    .set({ Email: user.user.email });
                console.log(user.user);
                setSubmitting(false);
            } catch (error) {
                console.log(error.message);
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
        <SafeAreaView
            style={{
                // Paddings to handle safe area
                paddingTop:
                    Platform.OS === 'ios'
                        ? insets.top
                        : initialWindowMetrics?.insets.top,
                paddingBottom:
                    Platform.OS === 'ios'
                        ? insets.bottom
                        : initialWindowMetrics?.insets.bottom,
                paddingLeft:
                    Platform.OS === 'ios'
                        ? insets.left
                        : initialWindowMetrics?.insets.left,
                paddingRight:
                    Platform.OS === 'ios'
                        ? insets.right
                        : initialWindowMetrics?.insets.right,
            }}
            className="flex-1 bg-white">
            <SafeAreaView className="flex">
                <View className="flex-row justify-center">
                    <Image
                        source={require('../../../assets/images/signup.png')}
                        style={{ width: 165, height: 110 }}
                    />
                </View>
            </SafeAreaView>
            <View
                className="flex-1 bg-white px-8 pt-8"
                style={{
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                }}>
                <View className="form space-y-2">
                    <Formik
                        initialValues={{
                            fullName: '',
                            email: '',
                            phoneNumber: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={signUpValidationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSignUp(values, setSubmitting);
                        }}>
                        {({ handleSubmit, isValid, isSubmitting }) => (
                            <>
                                <Text className="text-gray-700">Full Name</Text>
                                <Field
                                    component={CustomInput}
                                    name="fullName"
                                    placeholder="Full Name"
                                />
                                <Text className="text-gray-700">
                                    Email Address
                                </Text>
                                <Field
                                    component={CustomInput}
                                    name="email"
                                    placeholder="Email Address"
                                    keyboardType="email-address"
                                />
                                <Text className="text-gray-700">
                                    Phone Number
                                </Text>
                                <Field
                                    component={CustomInput}
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    keyboardType="numeric"
                                />
                                <Text className="text-gray-700">Password</Text>
                                <Field
                                    component={CustomInput}
                                    name="password"
                                    placeholder="Password"
                                    secureTextEntry
                                />
                                <Text className="text-gray-700">
                                    Confirm Password
                                </Text>
                                <Field
                                    component={CustomInput}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    secureTextEntry
                                />
                                <TouchableOpacity
                                    disabled={!isValid || isSubmitting}
                                    className={`py-3 ${
                                        !isValid || isSubmitting
                                            ? 'bg-slate-500'
                                            : 'bg-yellow-400'
                                    } rounded-xl mt-4`}
                                    onPress={handleSubmit}>
                                    <Text className="text-xl font-bold text-center text-gray-700">
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </View>
                <View className="flex-row justify-center mt-7">
                    <Text className="text-gray-500 font-semibold">
                        Already have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}>
                        <Text className="font-semibold text-yellow-500">
                            {' '}
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;
