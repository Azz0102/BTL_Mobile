import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Empty = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Huuu</Text>
            <View style={styles.outside}></View>
            <View style={styles.inside}></View>
        </View>
    );
};

export default Empty;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    text: {
        color: 'red',
        zIndex: 10,
    },
    outside: {
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        position: 'absolute',
    },
    inside: {
        width: '100%',
        height: '100%',
        backgroundColor: 'green',
        position: 'absolute',
    },
});
