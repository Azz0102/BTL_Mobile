import React from 'react';
import {
    Text,
    View,
    Alert,
    TouchableOpacity,
    Image,
    Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import CustomInput from '../../components/CustomInput';

GoogleSignin.configure({
    webClientId:
        '934533719887-6j8nhbn5tdu4eqot545hl7eue9q14pmn.apps.googleusercontent.com',
});

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

const Login = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    const handleLogin = async (values: any, setSubmitting: any) => {
        if (values.email.trim() !== '' && values.password.trim() !== '') {
            try {
                await auth().signInWithEmailAndPassword(
                    values.email,
                    values.password,
                );
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

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }
    return (
        <View
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
            <View className="flex-row justify-center">
                <Image
                    source={require('../../../assets/images/login.png')}
                    style={{ width: 200, height: 200 }}
                />
            </View>

            <View
                style={{
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                }}
                className="flex-1 bg-white px-8 pt-8">
                <Formik
                    validationSchema={loginValidationSchema}
                    initialValues={{ email: '', password: '' }}
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
                            />
                            <Text className="text-gray-700">Password</Text>
                            <Field
                                component={CustomInput}
                                name="password"
                                placeholder="Password"
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
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
                <Text className="text-xl text-gray-700 font-bold text-center py-5">
                    Or
                </Text>
                <View className="flex-row justify-center space-x-12">
                    <TouchableOpacity
                        className="p-2 bg-gray-100 rounded-2xl"
                        onPress={() =>
                            onGoogleButtonPress().then(() =>
                                console.log('Signed in with Google!'),
                            )
                        }>
                        <Image
                            source={require('../../../assets/icons/google.png')}
                            className="w-10 h-10"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image
                            source={require('../../../assets/icons/apple.png')}
                            className="w-10 h-10"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image
                            source={require('../../../assets/icons/facebook.png')}
                            className="w-10 h-10"
                        />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-7">
                    <Text className="text-gray-500 font-semibold">
                        Don't have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}>
                        <Text className="font-semibold text-yellow-500">
                            {' '}
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Login;
