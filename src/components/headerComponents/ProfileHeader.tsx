import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {StyleSheet, View, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_KEY, UNAME_KEY} from '../../redux/auth/constant';
import {useSelector} from 'react-redux';
import {Card} from 'react-native-paper';
import Colors from '../../constants/Colors';
import {useTheme} from '@react-navigation/native';

interface Props {
  navigation: StackNavigationProp<any>;
}

export const ProfileHeader: React.FC<Props> = ({navigation}: Props) => {
  const {colors} = useTheme();
  const imageSize = 100;
  //Check pre. login state
  const [username, setusername] = useState<string>();
  const [uname, setuname] = useState<string>();
  useEffect(() => {
    AsyncStorage.getItem(USER_KEY).then((val) => {
      setusername(val);
    });
    AsyncStorage.getItem(UNAME_KEY).then((val) => {
      setuname(val);
    });
  });
  return (
    <View
      style={{
        height: '25%',
        width: '100%',
        backgroundColor: Colors.DarkBottomNavBackground,
        marginBottom: 8,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          marginRight: 12,
          marginTop: 8,
          padding: 8,
          justifyContent: 'space-between',
          width: 90,
        }}>
        <MaterialIcons name={'edit'} size={20} color={colors.iconColor} />
        <Ionicons
          name={'ios-settings-sharp'}
          size={20}
          color={colors.iconColor}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 12,
          marginLeft: 24,
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: 'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png',
          }}
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
          }}
        />
        <View
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
            marginBottom: 28,
          }}>
          <Text
            style={{
              color: colors.textColor,
              fontWeight: 'bold',
            }}>
            {uname}
          </Text>
          <Text
            style={{
              color: colors.textColor,
            }}>
            {username}
          </Text>
        </View>
      </View>
    </View>
  );
};
