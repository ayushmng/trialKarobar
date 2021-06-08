import React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

interface BoldNepaliTextProps {
  [props: string]: any;
}

// export const DefaultText: React.FC<DefaultTextProps> = (props) => {
export function BoldNepaliText(props: BoldNepaliTextProps) {
  const {colors}: any = useTheme();
  const fontWeightStyle = Platform.OS === 'android' ? {} : {fontWeight: 'bold'};
  return (
    <Text
      {...props}
      style={{
        ...styles.text,
        ...fontWeightStyle,
        color: colors.text,
        ...props?.style,
      }}>
      {props?.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === 'android' ? 'KarobarDailyBold' : 'KarobarDaily',
  },
});
