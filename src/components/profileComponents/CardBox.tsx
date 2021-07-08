import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {StyleSheet, View, Text, Switch} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {Card} from 'react-native-paper';
import Colors from '../../constants/Colors';
import {DefaultText} from '../Text/DefaultText';
import {RootState} from '../../redux/reducers';

const width = Colors.windowWidth - 64;

interface CardBoxProps {
  title: string;
  setIcon: boolean;
  themeToggle?: () => void;
}

export function CardBox({title, setIcon, themeToggle}: CardBoxProps) {
  const currentTheme = useSelector((state: RootState) => {
    return state.userReducer.theme;
  });
  // const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    // setIsEnabled((previousState) => !previousState);
    themeToggle();
  };
  const [language, setLanguage] = useState<string>();

  return (
    <Card style={profileStyles.cardStyle}>
      {/* <View style={profileStyles.cardTitle}>
        <Text>{title}</Text> */}
      {title === 'Language' ? (
        <View
          style={{...profileStyles.cardTitle, marginBottom: 10, marginTop: 12}}>
          <Text>{title}</Text>
          <View style={profileStyles.switchContainer}>
            <TouchableWithoutFeedback
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setLanguage('np')}>
              {/* onPress={() => dispatch(changeUserLanguage('np'))}> */}
              <View
                style={[
                  profileStyles.languageButton,
                  {
                    backgroundColor:
                      language === 'np' ? '#B30000' : 'transparent',
                  },
                ]}>
                <DefaultText
                  style={{
                    fontWeight: 'bold',
                    color: language === 'np' ? 'white' : Colors.GREY_4,
                  }}>
                  NEP
                </DefaultText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={{
                width: '100%',
                height: '100%',
                // marginVertical: -16,
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                // paddingBottom: 8,
              }}
              // onPress={() => dispatch(changeUserLanguage('en'))}>
              onPress={() => setLanguage('en')}>
              <View
                style={[
                  profileStyles.languageButton,
                  {
                    backgroundColor:
                      language === 'np' ? 'transparent' : '#B30000',
                  },
                ]}>
                <DefaultText
                  style={{
                    fontWeight: 'bold',
                    color: language === 'np' ? Colors.GREY_4 : 'white',
                  }}>
                  ENG
                </DefaultText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      ) : (
        <View style={{...profileStyles.cardTitle}}>
          <Text>{title}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Entypo
              name={setIcon ? 'light-down' : 'light-up'}
              size={18}
              style={[setIcon ? {color: '#FFC83C'} : {color: 'transparent'}]}
            />
            <Switch
              trackColor={{false: '#E2E6F0', true: Colors.GREEN_Success}}
              thumbColor={currentTheme === 'default' ? 'white' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={currentTheme === 'default' ? false : true}
              style={{marginLeft: 4}}
            />
          </View>
        </View>
      )}
    </Card>
  );
}

export const profileStyles = StyleSheet.create({
  cardStyle: {
    height: 60,
    width: width,
    borderRadius: 10,
    marginLeft: 32,
    marginRight: 36,
    marginBottom: 16,
    backgroundColor: Colors.GREY_1,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 8,
  },
  languageButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
  },
  switchContainer: {
    flexDirection: 'row',
    marginRight: 16,
  },
});
