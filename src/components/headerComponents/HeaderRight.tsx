import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {DefaultText} from '../Text/DefaultText';
// import Colors from '../../constants/Colors';

interface HeaderRightProps {
  navigation: StackNavigationProp<any>;
}

export function HeaderRight({navigation}: HeaderRightProps) {
  // const language = useSelector(
  //   (state: RootState) => state.userReducer.language,
  // );
  // const openLanguageModal = useSelector(
  //   (state: RootState) => state.dataReducer.openLanguageModal,
  // );
  // const [openLanguage, setopenLanguage] = useState<boolean>(false);
  // const dispatch = useDispatch();

  return (
    <View style={styles.headerRight}>
      <View style={styles.switchContainer}>
        <TouchableWithoutFeedback
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          // onPress={() => dispatch(changeUserLanguage('np'))}
        >
          <View
            style={[
              styles.languageButton,
              {
                backgroundColor: '#B30000',
                // backgroundColor: language === 'np' ? '#B30000' : 'transparent',
              },
            ]}>
            <DefaultText
              style={{
                fontWeight: 'bold',
                color: 'white',
                // color: language === 'np' ? 'white' : Colors.GREY_4,
              }}>
              NEP
            </DefaultText>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          // onPress={() => dispatch(changeUserLanguage('en'))}
        >
          <View
            style={[
              styles.languageButton,
              {
                backgroundColor: '#B30000',
              },
            ]}>
            <DefaultText
              style={{
                fontWeight: 'bold',
                color: 'white',
              }}>
              ENG
            </DefaultText>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <MaterialIcons
        name="search"
        size={28}
        style={{color: 'black'}}
        // onPress={() => navigation.navigate('Search')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  languageText: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1,
    fontFamily:
      Platform.OS === 'android' ? 'ProximaNovaRegular' : 'Proxima Nova',
    marginRight: 20,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  languageButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
});
