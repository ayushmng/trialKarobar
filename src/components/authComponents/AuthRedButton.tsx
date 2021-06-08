// import React from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   ActivityIndicator,
//   TouchableNativeFeedback,
//   GestureResponderEvent,
//   Platform,
// } from 'react-native';
// import {useSelector} from 'react-redux';
// import Colors from '../../constants/Colors';
// import LinearGradient from 'react-native-linear-gradient';
// import {RootState} from '../../redux/reducers';
// // import {TouchableNativeFeedback} from 'react-native-gesture-handler';
// // import {ActivityIndicator} from 'react-native-paper';

// interface Props {
//   title: string;
//   handleSubmit: (event: GestureResponderEvent) => void;
//   textStyle?: {
//     [key: string]: any;
//   };
//   style?: {
//     [key: string]: any;
//   };
//   externalLoading?: boolean;
// }

// const AuthRedButton: React.FC<Props> = ({
//   title,
//   handleSubmit,
//   textStyle,
//   style,
//   externalLoading,
// }) => {
//   const loading = useSelector((state: RootState) => state.authReducer.loading);

//   return (
//     <LinearGradient
//       start={{x: -0.729, y: 1.0717}}
//       end={{x: -0.729, y: 1.0717}}
//       colors={['rgba(239, 62, 82, 1)', 'rgba(178, 0, 0, 1)']}
//       // locations={[0, 0.5]}
//       style={{...styles.authbutton, ...style}}>
//       <TouchableNativeFeedback
//         onPress={handleSubmit}
//         style={{width: '100%', height: '100%'}}
//         disabled={loading ? true : false}>
//         <View style={{flex: 1}}>
//           <View style={styles.authbutton_container}>
//             {loading || externalLoading ? (
//               <ActivityIndicator size="small" color="blue" />
//             ) : (
//               <Text style={[styles.authbutton_text, textStyle]}>{title}</Text>
//             )}
//           </View>
//         </View>
//       </TouchableNativeFeedback>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   authbutton: {
//     height: 52,
//     marginVertical: 0,
//     borderRadius: 6,
//     overflow: 'hidden',
//   },
//   authbutton_container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   authbutton_text: {
//     color: Colors.GREY_1,
//     fontWeight: 'bold',
//     fontFamily:
//       Platform.OS === 'android' ? 'ProximaNovaRegular' : 'Proxima Nova',
//     fontSize: 18,
//   },
// });

// export default AuthRedButton;
