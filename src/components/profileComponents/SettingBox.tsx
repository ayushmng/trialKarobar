import React from 'react';
import {
  StyleSheet,
  Switch,
  View,
  TouchableWithoutFeedback,
  Text,
  Platform,
} from 'react-native';
import Colors from '../../constants/Colors';
import {DefaultText} from '../Text/DefaultText';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {changeUserLanguage} from '../../redux/user/action';
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

interface SettingBoxProps {
  title: string;
  toggleSwitch?: () => void;
  isEnabled: boolean;
}

export function SettingBox({title, toggleSwitch, isEnabled}: SettingBoxProps) {
  const dispatch = useDispatch();
  return (
    <View style={styles.settingbox}>
      <Text style={styles.textStyle}>{title}</Text>
      <View
        style={{
          flex: 1,
        }}>
        {title === 'Language' ? (
          <View style={styles.switchContainer}>
            <TouchableWithoutFeedback
              style={{width: '100%', height: '100%'}}
              onPress={() => dispatch(changeUserLanguage('np'))}>
              <View
                style={[
                  styles.languageButton,
                  {
                    backgroundColor: isEnabled ? '#B30000' : 'transparent',
                  },
                ]}>
                {/* <DefaultText>|3</DefaultText> */}
                <DefaultText
                  style={{
                    fontWeight: 'bold',
                    color: isEnabled ? 'white' : Colors.GREY_4,
                  }}>
                  NEP
                </DefaultText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={{width: '100%', height: '100%'}}
              onPress={() => dispatch(changeUserLanguage('en'))}>
              <View
                style={[
                  styles.languageButton,
                  {
                    backgroundColor: isEnabled ? 'transparent' : '#B30000',
                  },
                ]}>
                {/* <DefaultText>|3</DefaultText> */}
                <DefaultText
                  style={{
                    fontWeight: 'bold',
                    color: isEnabled ? Colors.GREY_4 : 'white',
                  }}>
                  ENG
                </DefaultText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View style={styles.switchContainer}>
            {title === 'Theme' && (
              <Entypo
                name={isEnabled ? 'light-down' : 'light-up'}
                size={18}
                style={[
                  isEnabled ? {color: 'black'} : {color: '#FFC83C'},
                ]}></Entypo>
            )}
            <Switch
              trackColor={{false: '#E2E6F0', true: Colors.GREEN_Success}}
              thumbColor={isEnabled ? 'white' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: Colors.GREY_1,
    borderRadius: 10,
    alignItems: 'center',
  },
  languageButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily:
      Platform.OS === 'android' ? 'ProximaNovaRegular' : 'Proxima Nova',
  },
});
