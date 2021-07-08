import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {ArticleList} from '../../components/articleComponents/ArticleList';
import {useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

import {
  getAllArticle,
  getFeaturedArticle,
  refreshGetAllArticle,
  setRefreshFalse,
} from '../../redux/article/action';
import Colors from '../../constants/Colors';

export const ForYou: React.FC<Props> = ({navigation}: Props) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const articleData = useSelector(
    (state: RootState) => state.articleReducer.article!,
  );
  const loggedIn = useSelector(
    (state: RootState) => state.authReducer.loggedIn,
  );
  const fetchArticle = (pageNo: number) => {
    dispatch(
      getAllArticle({
        page: pageNo,
        language: 'en',
        loggedIn: loggedIn,
      }),
    );
  };
  useEffect(() => {
    dispatch(getFeaturedArticle({language: 'en'}));
    fetchArticle(1);
  }, [dispatch, loggedIn]);
  return (
    <View
      // forceInset={{top: 'always', bottom: 'always'}}
      style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontWeight: 'bold',
            margin: 12,
            fontSize: 20,
            color: Colors.black,
          }}>
          News for you:
        </Text>
        <ArticleList
          articleData={articleData}
          //   loading={loading}
          navigation={navigation}
          //   articleNextPage={articleNextPage}
          //   articlePageNo={articlePageNo}
          //   articleTotalPage={articleTotalPage}
          //   loadMoreData={loadMoreData}
          //   refresh={refresh}
          //   refreshArticle={refreshArticle}
          //   ListHeaderComponent={listHeaderComponent()}
          //   adData={homePageAds}
          //   showAd={true}
          //   adLoading={adLoading}
        />
      </View>
    </View>
  );
};
