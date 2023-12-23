import React, { useState } from 'react';
import {
    Button,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

import TableItem from '../TableItem';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'Third Item1',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'Third Item2',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d75',
        title: 'Third Item3',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d76',
        title: 'Third Item4',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d77',
        title: 'Third Item5',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d78',
        title: 'Third Item6',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d79',
        title: 'Third Item7',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d70',
        title: 'Third Item8',
    },
];

const TableListTab = ({ navigation }) => {
    return (
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOutDown}
            className="flex-1">
            <FlatList
                data={DATA}
                renderItem={({ item }) => <TableItem title={item.title} />}
                keyExtractor={item => item.id}
            />
        </Animated.View>
    );
};

export default TableListTab;
