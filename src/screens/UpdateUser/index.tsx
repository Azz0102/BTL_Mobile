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
    ActivityIndicator,
} from 'react-native';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import { styles } from './style';
import { CameraIcon, PencilSquareIcon } from 'react-native-heroicons/solid';
import DocumentPicker from 'react-native-document-picker';
import instance from '../../services/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';

const UpdateUser = ({ navigation }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [singleFile, setSingleFile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [userInfo, setUserInfo] = useState({});
    const handleUpdateUser = async (values: any, setSubmitting: any) => {
        try {
            const uid = auth().currentUser?.uid;
            const fileToUpload = singleFile;
            const data = new FormData();
            data.append('uid', uid);
            data.append('Name', values.name);
            data.append('AvatarPicture', {
                uri: fileToUpload[0].uri,
                name: fileToUpload[0].name,
                type: fileToUpload[0].type,
            });

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const res = await instance.patch('/Users/UpdateUser', data, config);
            console.log(res);
            setSubmitting(false);
            if (res.status === 200) {
                showMessage({
                    message: 'Success',
                    description: 'Updated user!',
                    type: 'success',
                });
            }
            navigation.goBack();
        } catch (error) {
            console.log(error);
            setSubmitting(false);
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
        const getUserInfo = async () => {
            try {
                const id = await AsyncStorage.getItem('profileID');
                const res = await instance.get(
                    `/Users/getUserByProfileID?profileID=${id}`,
                );
                setUserInfo(res.data[0]);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        getUserInfo();
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
            {isLoading ? (
                <ActivityIndicator color="orange" size={30} />
            ) : (
                <ScrollView className="flex-1 bg-orange-300">
                    <View className="w-full h-56 relative bg-white mb-6">
                        <ImageBackground
                            style={styles.image}
                            resizeMode="stretch"
                            source={{
                                uri:
                                    singleFile != null
                                        ? singleFile[0].uri
                                        : userInfo.Avatar,
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
                                    name: userInfo.Name,
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    handleUpdateUser(values, setSubmitting);
                                    console.log(values);
                                }}>
                                {({ handleSubmit, isValid, isSubmitting }) => (
                                    <>
                                        <Text className="text-gray-700">
                                            Name
                                        </Text>
                                        <Field
                                            component={CustomInput}
                                            name="name"
                                            placeholder="Email"
                                            editable={isEdit}
                                        />

                                        {isEdit && (
                                            <TouchableOpacity
                                                disabled={
                                                    !isValid || isSubmitting
                                                }
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
            )}
        </KeyboardAvoidingView>
    );
};

export default UpdateUser;
