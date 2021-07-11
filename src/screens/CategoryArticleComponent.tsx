import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCategorizedArticle,
  getCategorizedArticleClear,
  // getCategorizedAuthArticle,
} from '../redux/categoryarticle/action';
import {ArticleList} from '../components/articleComponents/ArticleList';
import {RootState} from '../redux/reducers';
import {StackNavigationProp} from '@react-navigation/stack';
// import {DefaultText} from '../Text/DefaultText';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
// import {getCategoryAds, getHomePageAds} from '../../redux/smartAd/action';

interface CategoryArticleComponentProps {
  navigation: StackNavigationProp<any>;
  category: any;
}

export const CategoryArticleComponent: React.FC<CategoryArticleComponentProps> =
  ({navigation, category}) => {
    const dispatch = useDispatch();
    const categoryArticle = useSelector(
      (state: RootState) => state.categoryReducer.categoryArticle,
    );
    const loading = useSelector(
      (state: RootState) => state.categoryReducer.loadingCategoryArticle,
    );
    const error = useSelector(
      (state: RootState) => state.categoryReducer.errorCategoryArticle,
    );
    const loggedIn = useSelector(
      (state: RootState) => state.authReducer.loggedIn,
    );
    const fetchCategorizedArticle = (nextPageNo: number) => {
      dispatch(
        getCategorizedArticle({
          page: nextPageNo,
          category: category._id,
          language: 'en',
        }),
      );
    };
    useEffect(() => {
      dispatch(getCategorizedArticleClear());
      if (category !== '') {
        fetchCategorizedArticle(1);
      }
      return () => {};
    }, [dispatch, category, loggedIn]);

    // const loadMoreData = () => {
    //   fetchCategorizedArticle(categoryNextPageNo);
    // };
    return (
      <SafeAreaView style={{height: '92%', marginTop: 4}} edges={['bottom']}>
        <ArticleList
          // ListHeaderComponent={listHeaderComponent ? listHeaderComponent : null}
          articleData={categoryArticle}
          navigation={navigation}
          // articleNextPage={categoryNextPageNo}
          // articlePageNo={categoryArticlePageNo}
          // articleTotalPage={categoryArticleTotalPage}
          // loadMoreData={loadMoreData}
          // loading={loading}
          // adData={categoryAds}
          // showAd={true}
          // adLoading={adLoading}
        />
        {error &&
        categoryArticle &&
        categoryArticle.length === 0 &&
        loading === false ? (
          <View style={{flex: 100, justifyContent: 'center'}}>
            <Text>error</Text>
            <TouchableWithoutFeedback
              onPress={() => fetchCategorizedArticle(1)}>
              <Text>try again</Text>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <></>
        )}
      </SafeAreaView>
    );
  };
