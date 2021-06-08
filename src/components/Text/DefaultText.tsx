import React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

interface DefaultTextProps {
  [props: string]: any;
}

// export const DefaultText: React.FC<DefaultTextProps> = (props) => {
export function DefaultText(props: DefaultTextProps) {
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
    fontFamily:
      Platform.OS === 'android' ? 'ProximaNovaRegular' : 'Proxima Nova',
  },
});
