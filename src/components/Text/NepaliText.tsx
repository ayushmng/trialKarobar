import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

interface NepaliTextProps {
  [props: string]: any;
}

// export const DefaultText: React.FC<DefaultTextProps> = (props) => {
export function NepaliText(props: NepaliTextProps) {
  const {colors}: any = useTheme();
  return (
    <Text
      {...props}
      style={{...styles.text, color: colors.text, ...props?.style}}>
      {props?.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'KarobarDaily',
  },
});
