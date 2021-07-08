import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
  description: string;
  onNav: (event: GestureResponderEvent) => void;
  buttonTitle: string;
  descpStyle?: {
    [key: string]: any;
  };
}

const BottomAuthNav: React.FC<Props> = ({
  description,
  onNav,
  buttonTitle,
  descpStyle,
}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.bottomAuthNav}>
      <Text
        style={[
          {...styles.bottomAuthNav_description, color: colors.textColor},
          descpStyle,
        ]}>
        {description}{' '}
      </Text>
      <TouchableNativeFeedback onPress={onNav}>
        <Text
          style={[
            styles.bottomAuthNav_button,
            Platform.OS === 'ios' ? {fontWeight: 'bold'} : {},
          ]}>
          {buttonTitle}
        </Text>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomAuthNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },

  bottomAuthNav_description: {
    letterSpacing: 0.32,
    color: Colors.Off_Black,
    fontSize: 16,
    fontFamily:
      Platform.OS === 'android' ? 'ProximaNovaRegular' : 'Proxima Nova',
  },

  bottomAuthNav_button: {
    color: Colors.RED_Error,
    fontSize: 16,
    fontFamily: Platform.OS === 'android' ? 'ProximaNovaBold' : 'Proxima Nova',
  },
});

export default BottomAuthNav;
