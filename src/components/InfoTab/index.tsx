import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { CameraIcon, PencilSquareIcon } from 'react-native-heroicons/solid';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import DocumentPicker from 'react-native-document-picker';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../../services/instance';

const DATA = {
    email: 'nguyenduchuyhht2@gmail.com',
    name: 'UET',
    phoneNumber: '9992222999',
    time: '10 am - 11pm',
    location: '144 Xuân Thủy',
    table: 20,
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
    const [singleFile, setSingleFile] = useState(null);
    const [InfoRestaurant, setInfoRestaurant] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getResInfo = async () => {
            const profileID = await AsyncStorage.getItem('profileID');
            try {
                const data = await instance.get(
                    `Restaurants/getRestaurantsForManager?profileID=${profileID}`,
                );
                console.log(data.data);
                setInfoRestaurant(data.data[0]);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getResInfo();
    }, []);

    const handleSubmit = async (values: any, setSubmitting: any) => {
        try {
            const fileToUpload = singleFile;
            const data = new FormData();
            data.append('Name', values.name);
            data.append('PhoneNumber', values.phonenumber);
            data.append('Time', values.time);
            data.append('Address', values.location);
            data.append('Description', values.description);
            data.append('Number_of_tables', values.numoftable);
            data.append('Avatar', fileToUpload);
            const token = await AsyncStorage.getItem('profile_token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };
            const res = await instance.put(
                'Restaurants/UpdateRestaurant',
                data,
                config,
            );
            setSubmitting(false);
        } catch (error) {
            console.log(error);
            setSubmitting(false);
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
    return (
        <Animated.ScrollView
            entering={FadeInUp}
            exiting={FadeOutDown}
            className="flex-1">
            <View className="w-full h-56 relative bg-white mb-1">
                <ImageBackground
                    style={styles.image}
                    resizeMode="stretch"
                    source={{
                        uri:
                            singleFile != null
                                ? singleFile[0].uri
                                : InfoRestaurant.Avatar,
                    }}>
                    {isEdit && (
                        <TouchableOpacity
                            className="flex flex-row items-center justify-center absolute bottom-1 m-2 border-2 border-gray-100 p-2 rounded-lg"
                            onPress={selectFile}>
                            <CameraIcon size={26} color="white" />
                            <Text className="text-white ml-1">Edit Image</Text>
                        </TouchableOpacity>
                    )}
                </ImageBackground>
            </View>
            {isLoading ? (
                <View className="w-full items-center justify-center h-50">
                    <ActivityIndicator size={50} color="white" />
                </View>
            ) : (
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
                            name: InfoRestaurant.Name,
                            phonenumber: InfoRestaurant.PhoneNumber,
                            time: InfoRestaurant.Time,
                            location: InfoRestaurant.Address,
                            numoftable:
                                InfoRestaurant.Number_of_tables.toString(),
                            description: InfoRestaurant.Description,
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values, setSubmitting);
                            console.log(values);
                        }}>
                        {({ handleSubmit, isValid, isSubmitting }) => (
                            <>
                                <Text className="text-gray-700">Name</Text>
                                <Field
                                    component={CustomInput}
                                    name="name"
                                    placeholder="Name"
                                    editable={isEdit}
                                />
                                <Text className="text-gray-700">
                                    Phone Number
                                </Text>
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
                                <Text className="text-gray-700">
                                    Num of table
                                </Text>
                                <Field
                                    component={CustomInput}
                                    name="numoftable"
                                    placeholder="Num of table"
                                    editable={isEdit}
                                />
                                <Text className="text-gray-700">
                                    Description
                                </Text>
                                <Field
                                    component={CustomInput}
                                    name="description"
                                    placeholder="Location"
                                    multiline
                                    numberOfLines={4}
                                />
                                {isEdit && (
                                    <TouchableOpacity
                                        disabled={!isValid || isSubmitting}
                                        className={`py-3 ${
                                            !isValid || isSubmitting
                                                ? 'bg-slate-500'
                                                : 'bg-yellow-400'
                                        } rounded-xl mt-4  mb-2`}
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
            )}
        </Animated.ScrollView>
    );
};

export default InfoTab;
