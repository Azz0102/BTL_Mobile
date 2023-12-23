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
import DocumentPicker from 'react-native-document-picker';
import { showMessage } from 'react-native-flash-message';
import instance from '../../services/instance';

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

const AddMenuItemScreen = ({ navigation }: { navigation: any }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [singleFile, setSingleFile] = useState(null);

    const config = {
        headers: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsIm1haWwiOiJ4YXRodWJhbnhhQGdtYWlsLmNvbSIsImlhdCI6MTY5OTg2MzE5MCwiZXhwIjoxNjk5OTQ5NTkwfQ.eQ4CVx0QdMV6L5GPpoYIfewKBDni4_JzQe5HUIhGT_U',
        },
    };
    const handleAddMenuItem = async (values: any, setSubmitting: any) => {
        try {
            if (values.type === 'Food') {
                const response = await instance.post(
                    'Food/AddFood',
                    {
                        ...values,
                    },
                    config,
                );
                if (response.status === 200) {
                    navigation.goBack();
                }
            } else {
                const response = await instance.post(
                    'Drinks/AddDrink',
                    {
                        ...values,
                    },
                    config,
                );
                if (response.status === 200) {
                    navigation.goBack();
                }
            }
        } catch (error) {
            showMessage({
                message: 'Error',
                description: error.message,
                type: 'danger',
            });
        }
    };

    const selectFile = async () => {
        // Opening Document Picker to select one file
        try {
            const res = await DocumentPicker.pick({
                // Provide which type of file you want user to pick
                type: [DocumentPicker.types.allFiles],
                // There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            // Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            // Setting the state to show single file attributes
            setSingleFile(res);
        } catch (err) {
            setSingleFile(null);
            // Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                // If user canceled the document selection
                console.log('Canceled');
            } else {
                // For Unknown Error
                console.log('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1">
            <ScrollView className="flex-1 bg-orange-300">
                <View className="w-full h-56 relative bg-white mb-6">
                    <ImageBackground
                        style={styles.image}
                        resizeMode="contain"
                        source={require('../../../assets/icons/facebook.png')}>
                        <TouchableOpacity
                            className="flex flex-row items-center justify-center absolute bottom-1 m-2 border-2 border-gray-700 p-2 rounded-lg"
                            onPress={selectFile}>
                            <CameraIcon size={26} color="black" />
                            <Text className="text-black ml-1">
                                Upload Image
                            </Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View className="w-full items-center">
                    <View className="w-11/12">
                        <Formik
                            initialValues={{
                                email: '',
                                name: '',
                                phonenumber: '',
                                time: '',
                                location: '',
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                handleAddMenuItem(values, setSubmitting);
                                console.log(values);
                            }}>
                            {({ handleSubmit, isValid, isSubmitting }) => (
                                <>
                                    <Text className="text-gray-700">Name</Text>
                                    <Field
                                        component={CustomInput}
                                        name="email"
                                        placeholder="Email"
                                    />
                                    <Text className="text-gray-700">
                                        Description
                                    </Text>
                                    <Field
                                        component={CustomInput}
                                        name="location"
                                        placeholder="Location"
                                        multiline
                                        numberOfLines={4}
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
                                            Submit
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </Formik>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddMenuItemScreen;
