import {View, Text, TouchableOpacity, Share} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  ShareIcon,
} from 'react-native-heroicons/outline';

const Header = ({navigation}) => {
  return (
    <SafeAreaView
      className={'flex-row items-center px-5 pt-3 pb-1 justify-between'}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <ArrowLeftIcon size={27} color="orange" />
      </TouchableOpacity>

      <View className="flex-row items-center">
        <ArrowLeftOnRectangleIcon size={15} color="black" />
        <Text className="text-xs font-bold text-slate-900">LogOut</Text>
      </View>
      <TouchableOpacity>
        <ShareIcon size={25} color="orange" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;
