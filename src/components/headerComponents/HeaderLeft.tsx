import React from 'react';
import {View} from 'react-native-animatable';
import Karobar from '../../assets/karobarHeadLogo.svg';

interface HeaderLeftProps {}

export function HeaderLeft({}: HeaderLeftProps) {
  // const theme = useSelector((state: RootState) => state.userReducer.theme);

  return (
    <View>
      <Karobar style={{marginLeft: 10}} />
    </View>
  );
}
