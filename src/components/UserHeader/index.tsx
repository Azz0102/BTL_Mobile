import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    ChatBubbleBottomCenterIcon,
    Cog6ToothIcon,
    ShoppingCartIcon,
} from 'react-native-heroicons/solid';
import styles from '../../style/UserHeader';

const UserHeader = () => {
    return (
        <View style={[styles.UserProfileHeader, styles.defaultBackgroundColor]}>
            <StatusBar backgroundColor="orange"></StatusBar>
            <TouchableOpacity className="m-2">
                <Cog6ToothIcon size={27} color="rgb(255 255 255)" />
            </TouchableOpacity>
            <TouchableOpacity className="m-2">
                <ShoppingCartIcon size={27} color="rgb(255 255 255)" />
            </TouchableOpacity>
            <TouchableOpacity className="m-2">
                <ChatBubbleBottomCenterIcon
                    size={27}
                    color="rgb(255 255 255)"
                />
            </TouchableOpacity>
        </View>
    );
};
export default UserHeader;
