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
import instance from '../../services/instance';

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

const MenuItemDetail = ({ route, navigation }) => {
    const { title, description, avatar, price, id, type } = route.params;
    const [isEdit, setIsEdit] = useState(false);
    const [singleFile, setSingleFile] = useState(null);

    const handleUpdateMenuItem = async (values: any, setSubmitting: any) => {
        if (JSON.stringify(type).replace(/"/g, '') === 'food') {
            try {
                const fileToUpload = singleFile;
                const data = new FormData();
                data.append('FoodID', JSON.stringify(id));
                data.append('Name', values.name);
                data.append('DescribeFood', values.description);
                data.append('FoodPrice', values.price);
                data.append('Avatar', fileToUpload);

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };
                const res = await instance.put(
                    'Restaurants/UpdateRestaurant',
                    data,
                    config,
                );
                console.log(res);
                setSubmitting(false);
            } catch (error) {
                console.log(error);
                setSubmitting(false);
            }
        } else {
            try {
                const fileToUpload = singleFile;
                const data = new FormData();
                data.append('FoodID', JSON.stringify(id));
                data.append('Name', values.name);
                data.append('DescribeFood', values.description);
                data.append('FoodPrice', values.price);
                data.append('Avatar', fileToUpload);

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };
                const res = await instance.put(
                    'Restaurants/UpdateRestaurant',
                    data,
                    config,
                );
                console.log(res);
                setSubmitting(false);
            } catch (error) {
                console.log(error);
                setSubmitting(false);
            }
        }

        navigation.goBack();
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
                        resizeMode="stretch"
                        source={{
                            uri:
                                singleFile != null
                                    ? singleFile[0].uri
                                    : JSON.stringify(avatar).replace(/"/g, ''),
                        }}>
                        {isEdit && (
                            <TouchableOpacity
                                className="flex flex-row items-center justify-center absolute bottom-1 m-2 border-2 border-gray-100 p-2 rounded-lg"
                                onPress={selectFile}>
                                <CameraIcon size={26} color="black" />
                                <Text className="text-black ml-1">
                                    Edit Image
                                </Text>
                            </TouchableOpacity>
                        )}
                    </ImageBackground>
                </View>
                <View className="w-full items-center">
                    <View className="w-11/12">
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
                                name: JSON.stringify(title).replace(/"/g, ''),
                                description: description
                                    ? JSON.stringify(description).replace(
                                          /"/g,
                                          '',
                                      )
                                    : '',
                                price: JSON.stringify(price),
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                handleUpdateMenuItem(values, setSubmitting);
                                console.log(values);
                            }}>
                            {({ handleSubmit, isValid, isSubmitting }) => (
                                <>
                                    <Text className="text-gray-700">Name</Text>
                                    <Field
                                        component={CustomInput}
                                        name="name"
                                        placeholder="Email"
                                        editable={isEdit}
                                    />
                                    <Text className="text-gray-700">Price</Text>
                                    <Field
                                        component={CustomInput}
                                        name="price"
                                        placeholder="Email"
                                        editable={isEdit}
                                    />
                                    <Text className="text-gray-700">
                                        Description
                                    </Text>
                                    <Field
                                        component={CustomInput}
                                        name="description"
                                        placeholder="Location"
                                        editable={isEdit}
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
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default MenuItemDetail;
