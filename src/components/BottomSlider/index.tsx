import React, { useEffect, useRef, useState } from 'react';

import { Animated } from 'react-native';

const BottomSlider = ({
    isSelected,
    index,
}: {
    isSelected: any;
    index: any;
}) => {
    const [tabWidth, setTabWidth] = useState(0);
    const translate = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(translate, {
            toValue: (isSelected - index) * tabWidth,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [index, isSelected, tabWidth, translate]);

    return (
        <Animated.View
            className="h-1 w-full bg-black"
            onLayout={(event: any) => {
                var { width } = event.nativeEvent.layout;
                setTabWidth(width);
            }}
            style={{
                transform: [
                    {
                        translateX: translate,
                    },
                ],
            }}
        />
    );
};

export default BottomSlider;
