import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    TextInput,
    StatusBar,
} from 'react-native';

import {
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { DeadSimpleChat } from 'deadsimplechat-sdk-react-native';

const ChatScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const chatComponentRef = useRef();

    function handleMessage(message) {
        console.log('New Message Arrived::', message);
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
            className="flex-1 bg-gray-600 justify-center items-center">
            <DeadSimpleChat
                debug={true}
                roomId="74DR4jLBU"
                publicKey="pub_35394d634256586e4e494d5367476f764e746a684d676d7951426b6654554a31596f332d34336a317638577162306a4d"
                style={{ marginTop: 2, marginBottom: 57 }}
                ref={chatComponentRef}
                onMessage={handleMessage}
            />
        </View>
    );
};

export default ChatScreen;
