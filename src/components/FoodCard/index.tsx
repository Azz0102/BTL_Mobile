import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { HeartIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import Toast from 'react-native-root-toast';

const FoodCard = ({ uri, title, price, time, navigation, available, item }) => {

    const showUnavailableToast = () => {
		Toast.show(`${title} is Currently Unavailable 😔!`, {
			position: 180,
			backgroundColor: "black",
			textColor: "white",
			opacity: 1,
			duration: 1000,
		})
	}

    return (
        <View>
            <TouchableOpacity style={{ elevation: 3 }}
			className='rounded-lg overflow-hidden mb-3 relative' onPress={() => {
				available
					? navigation.navigate("FoodDetails", { item })
					: showUnavailableToast()
			}}>
                <Image
                    source={{
                        uri: uri,
                    }}
                    style={available ? '' : { tintColor: 'grey' }}
                    width={Dimensions.get('window').width / 2.3}
                    height={160}
                />
                {!available && (
                    <Image
                        source={{
                            uri: uri,
                        }}
                        style={{
                            opacity: 0.3,
                            position: 'absolute',
                        }}
                        width={Dimensions.get('window').width / 2.3}
                        height={160}
                    />
                )}
                <View className="pl-3 pr-2 py-2 flex-row bg-orange-50 items-start justify-between">
                    <View>
                        <Text className="text-md font-bold">{title}</Text>
                        <View className="flex-row items-center">
                            <Text className="font-bold text-sm text-orange-400">
                                ₹{price}{' '}
                            </Text>
                            <Text className="font-bold text-xs text-gray-400">
                                &#11825;{' '}
                                {available ? time + ' mins' : 'Not Available'}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        className={` ${
                            available ? 'bg-orange-100' : 'bg-gray-200'
                        } justify-center items-center rounded-full`}>
                        <PlusCircleIcon
                            size={35}
                            color={`${
                                available ? 'orange' : 'rgb(156 163 175)'
                            }`}
                        />
                    </TouchableOpacity>
                </View>
                <View className="absolute top-2 bg-red-100 justify-center items-center rounded-full left-2">
                    <TouchableOpacity>
                        <HeartIcon size={25} color="red" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default FoodCard;
