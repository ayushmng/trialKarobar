import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  FlatList,
  VirtualizedList,
  RefreshControl,
  View,
  StyleSheet,
  Image,
  Pressable,
  Linking,
  Alert,
  Text,
} from 'react-native';

import {useSelector} from 'react-redux';
import {ArticleHomeCard} from './ArticleHomeCard';
import {RootState} from '../../redux/reducers';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoadingIndicator} from '../LoadingIndicator';
import {HomeCard} from './HomeCard';

interface ArticleListProps {
  articleData: Array<any>;
  //   articleTotalPage?: number;
  //   articlePageNo: number;
  //   articleNextPage?: number;
  // loading?: boolean;
  //   loadMoreData: () => void;
  navigation: StackNavigationProp<any>;
  //   refresh?: boolean;
  //   refreshArticle?: () => void;
  //   style?: {
  //     [key: string]: any;
  //   };
  //   ListHeaderComponent?: any;
  // showAd?: boolean;
  // adData?: any;
  // adLoading?: boolean;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articleData,
  //   articleTotalPage,
  //   articlePageNo,
  //   articleNextPage,
  //   loading,
  //   loadMoreData,
  //   refresh,
  //   refreshArticle,
  navigation,
  //   style,
  //   ListHeaderComponent,
  // showAd,
  // adData,
  // adLoading,
}) => {
  const networkConnection = useSelector(
    (state: RootState) => state.dataReducer.networkConnection,
  );
  // const language = useSelector(
  //   (state: RootState) => state.userReducer.language,
  // );

  //   const onEndReached = () => {
  //     if (networkConnection) {
  //       if (loading) {
  //       } else {
  //         if (
  //           (!!articleTotalPage &&
  //             !!articlePageNo &&
  //             articleTotalPage <= articlePageNo) ||
  //           articlePageNo + 1 != articleNextPage
  //         ) {
  //         } else {
  //           loadMoreData();
  //         }
  //       }
  //     }
  //   };

  const renderItem = ({item, index}: any) => {
    return articleData.length === 0 ? (
      // return articleData.length === 0 && loading ? (
      // showloading while fetching data for the first time and articleData length is zero.
      <LoadingIndicator />
    ) : articleData.length === 0 ? (
      // if response from api returns no article
      <View>
        <Text>Sorry, No data found!!</Text>
      </View>
    ) : !!articleData && articleData.length > 0 ? (
      // itemData.item.lang === language ? (
      <View
        style={{
          marginHorizontal: '3%',
        }}>
        <HomeCard
          title={item.title}
          content={item.content}
          thumbnail={item.thumbnail}
          _id={item._id}
          bookmarked={item.bookmarked}
          navigation={navigation}
          PublishedAt={item.published_at}
          //   readtime={item.readtime}
          // articleData={item}
        />
      </View>
    ) : null;
  };
  //   const handlePress = useCallback(async (url) => {
  //     // Checking if the link is supported for links with custom URL scheme.
  //     const supported = await Linking.canOpenURL(url);

  //     if (supported) {
  //       // Opening the link with some app, if the URL scheme is "http" the web link should be opened
  //       // by some browser in the mobile
  //       await Linking.openURL(url);
  //     } else {
  //       Alert.alert(`Don't know how to open this URL: ${url}`);
  //     }
  //   }, []);
  const memoizedValue = useMemo(() => renderItem, [articleData]);
  //   const memoizedValue = useMemo(() => renderItem, [articleData]);
  return (
    <VirtualizedList
      data={articleData}
      // data={showAd && adLoading ? [] : articleData}
      getItem={(data, index) => data[index]}
      getItemCount={(data) => data.length}
      keyExtractor={(item: any, index) => item?._id}
      //   refreshControl={
      //     refreshArticle && (
      //       <RefreshControl
      //         onRefresh={() => {
      //           refreshArticle();
      //         }}
      //         refreshing={refresh!}
      //       />
      //     )
      //   }
      initialNumToRender={10}
      //   style={style}
      //   ListHeaderComponent={ListHeaderComponent ? ListHeaderComponent : null}
      renderItem={(itemData) => memoizedValue(itemData)}
      // renderItem={(itemData) =>
      //   showAd && adLoading ? <LoadingIndicator /> : memoizedValue(itemData)
      // }
      //   onEndReached={() => {
      //     onEndReached();
      //   }}
      //   onEndReachedThreshold={0.1}
      //   ListFooterComponent={(): any => {
      //     return loading && <LoadingIndicator />;
      //   }}
    />
  );
};
