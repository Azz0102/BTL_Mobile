// Loading.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
const Loading = ({ navigation }) => {
    // Handle user state change
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(user => {
            navigation.navigate(user ? 'Main' : 'SignUp');
        });
        return subscriber; // unsubscribe on unmount
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>Loading</Text>
            <ActivityIndicator size="large" />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Loading;
