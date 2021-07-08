import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  GestureResponderEvent,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
// import {RootState} from '../../redux/reducers';
// import {ActivityIndicator} from 'react-native-paper';

interface Props {
  title: string;
  handleSubmit: (event: GestureResponderEvent) => void;
  textStyle?: {
    [key: string]: any;
  };
  style?: {
    [key: string]: any;
  };
}

const AuthGreyButton: React.FC<Props> = ({
  title,
  handleSubmit,
  textStyle,
  style,
}) => {
  //   const loading = useSelector((state: RootState) => state.authReducer.loading);

  return (
    <View style={{...styles.authbutton, ...style}}>
      <View style={{flex: 1}}>
        <TouchableNativeFeedback
          onPress={handleSubmit}
          //   disabled={loading ? true : false}
        >
          <View style={styles.authbutton_container}>
            {/* {loading ? (
              <ActivityIndicator size="small" color="blue" />
            ) : ( */}
            <Text style={[styles.authbutton_text, textStyle]}>{title}</Text>
            {/* )} */}
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authbutton: {
    height: 52,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: Colors.GREY_3,
  },
  authbutton_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authbutton_text: {
    color: Colors.GREY_5,
    fontWeight: 'bold',
    fontFamily:
      Platform.OS === 'android' ? 'ProximaNovaRegular' : 'Proxima Nova',
    fontSize: 18,
  },
});

export default AuthGreyButton;
