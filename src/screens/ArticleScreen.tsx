import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import {RootState} from '../redux/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {getEachArticle} from '../redux/article/action';
import {StackNavigationProp} from '@react-navigation/stack';
import HTML from 'react-native-render-html';
import {useTheme} from '@react-navigation/native';
import Colors from '../constants/Colors';
// import WebView from 'react-native-webview';
// import table, {IGNORED_TAGS} from '@native-html/table-plugin';

interface ArticleScreenProps {
  route?: any;
  navigation: StackNavigationProp<any>;
}
export const ArticleScreen: React.FC<ArticleScreenProps> = ({
  navigation,
  route,
}) => {
  const _id = route.params._id;
  const {colors}: any = useTheme();
  const contentWidth = useWindowDimensions().width;
  const dispatch = useDispatch();
  // const htmlProps = {
  //   WebView,
  //   renderers: {
  //     table,
  //   },
  //   ignoredTags: IGNORED_TAGS,
  //   renderersProps: {
  //     table: {
  //       // Put the table config here (previously,
  //       // the first argument of makeTableRenderer)
  //     },
  //   },
  //   alterChildren: (node: any) => {
  //     if (node.name === 'iframe') {
  //       delete node.attribs.width;
  //     }
  //     return node.children;
  //   },
  // };
  const loggedIn = useSelector(
    (state: RootState) => state.authReducer.loggedIn,
  );
  const eachArticle = useSelector(
    (state: RootState) => state.articleReducer.eachArticle,
  );
  const fontSize = useSelector(
    (state: RootState) => state.userReducer.fontSize,
  );
  useEffect(() => {
    dispatch(getEachArticle({_id: _id, loggedIn: loggedIn}));
  }, [_id, loggedIn]);
  return (
    // <View style={{position: 'relative', flexGrow: 1}}>
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 180,
        flexGrow: 1,
        backgroundColor: colors.backgroundColor,
      }}>
      {/* {[...Array(5)].map((item, index) => (
        <View
          style={{
            height: 200,
            width: 300,
            backgroundColor:
              index == 1
                ? Colors.RED
                : index == 3
                ? Colors.Blur_Dark
                : Colors.BLUE,
          }}></View>
      ))} */}

      <View style={styles.articleScreen_imageContainer}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            // aspectRatio: 1,
            alignSelf: 'center',
          }}
          resizeMode="cover"
          source={{
            uri: `${eachArticle?.thumbnail}`,
          }}
        />
      </View>
      <View style={{margin: 8}}>
        <HTML
          source={{
            html: eachArticle?.content,
          }}
          contentWidth={contentWidth}
          defaultTextProps={{}}
          baseFontStyle={{
            color: colors.text,
            fontSize: fontSize,
            fontFamily:
              eachArticle?.lang === 'np'
                ? 'KarobarDaily'
                : Platform.OS === 'android'
                ? 'ProximaNovaRegular'
                : 'Proxima Nova',
          }}
          // {...htmlProps}
          // ignoredStyles={['width']}
        />
      </View>
    </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  articleScreen: {justifyContent: 'center', alignItems: 'center', flex: 1},
  articleScreen_imageContainer: {
    width: '100%',
    height: 250,
    // backgroundColor: 'grey',
  },
  articleScreen_articleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleScreen_title: {
    marginBottom: 10,
    // fontWeight: Platform.OS === 'android' ? 'bold' : 'normal',
    fontSize: 30,
  },
  articleScreen_titleBottom: {flexDirection: 'row', marginBottom: 10},
});
