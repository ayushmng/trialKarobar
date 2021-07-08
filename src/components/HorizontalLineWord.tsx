import React from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {DefaultText} from './Text/DefaultText';

interface Props {
  text: string;
  style?: {
    [key: string]: any;
  };
  textStyle?: {
    [key: string]: any;
  };
}

const HorizontalLineWord: React.FC<Props> = ({text, style, textStyle}) => {
  return (
    <View style={{...styles.horizontalLineWord, ...style}}>
      <View style={styles.horizontalLineWord_line} />
      <View style={styles.horizontalLineWord_wordContainer}>
        <Text
          style={{
            ...styles.horizontalLineWord_word,
            marginTop: 10,
            ...textStyle,
          }}>
          or
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...styles.horizontalLineWord_word,
            textAlign: 'auto',
            ...textStyle,
          }}>
          login with
        </Text>
      </View>
      <View style={styles.horizontalLineWord_line} />
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalLineWord: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  horizontalLineWord_line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D8DCE6',
  },
  horizontalLineWord_wordContainer: {
    width: 72,
    height: 40,
    lineHeight: 1.4,
  },
  horizontalLineWord_word: {
    textAlign: 'center',
    // color: '#43464D',
    letterSpacing: 0.32,
    fontSize: 14,
    fontFamily:
      Platform.OS === 'android' ? 'ProximaNovaRegular' : 'Proxima Nova',
  },
});

export default HorizontalLineWord;
