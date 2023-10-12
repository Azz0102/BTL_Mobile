import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = (props: any) => {
    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;

    const hasError = errors[name] && touched[name];

    return (
        <>
            <TextInput
                style={[styles.textInput, hasError && styles.errorInput]}
                value={value}
                onChangeText={text => onChange(name)(text)}
                onBlur={() => {
                    setFieldTouched(name);
                    onBlur(name);
                }}
                {...inputProps}
            />
            {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
        </>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        width: '100%',
        backgroundColor: 'rgb(243 244 246)',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 14,
        marginVertical: 5,
        color: 'rgb(55 65 81)',
    },
    errorText: {
        fontSize: 10,
        color: 'red',
        marginBottom: 10,
    },
    errorInput: {
        borderColor: 'red',
    },
});

export default CustomInput;
