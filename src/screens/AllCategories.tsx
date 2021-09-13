import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
  StyleSheet,
  Pressable,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {getAllCategory, setCategory} from '../redux/categoryarticle/action';
import {RootState} from '../redux/reducers';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CategoryArticleComponent} from './CategoryArticleComponent';
import Colors from '../constants/Colors';

interface AllCategoriesListProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setTimeSelect: React.Dispatch<React.SetStateAction<Object>>;
}

export function AllCategories({
  selectedCategory,
  setSelectedCategory,
  setTimeSelect,
}: AllCategoriesListProps) {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const categoryData = useSelector(
    (state: RootState) => state.categoryReducer.allCategory,
  );
  const category = useSelector(
    (state: RootState) => state.categoryReducer.category!,
  );
  const networkConnection = useSelector(
    (state: RootState) => state.dataReducer.networkConnection,
  );
  useEffect(() => {
    if (categoryData.length === 0) {
      dispatch(getAllCategory({language: 'en'}));
    }
  }, [dispatch, 'en', networkConnection]);
  console.log('Category Data: ', categoryData);
  console.log('Category: ', category);
  return (
    <View style={styles.categoryNewsScreen_topBar}>
      <FlatList
        data={categoryData}
        keyExtractor={(item: any) => item?._id}
        horizontal
        style={{
          // backgroundColor: theme === 'dark' ? '#858B97' : '#FFF',
          padding: 10,
        }}
        contentContainerStyle={{paddingRight: 10}}
        showsHorizontalScrollIndicator={false}
        renderItem={(itemData: any) => (
          <View>
            <View
              style={[
                styles.categoryNewsScreen_categoryBoxContainer,
                {
                  backgroundColor:
                    selectedCategory === itemData.item._id ? 'red' : 'white',
                },
              ]}>
              <TouchableNativeFeedback
                onPress={() => {
                  if (itemData.item._id === selectedCategory) {
                    setSelectedCategory('');
                    setTimeSelect({});
                  } else {
                    setSelectedCategory(itemData.item._id);
                  }
                  // dispatch(
                  //   setCategory({selectedCategory: itemData.item.name}),
                  // );
                }}>
                <View style={styles.categoryNewsScreen_categoryBox}>
                  {itemData?.item?.lang === 'np' ? (
                    <Text
                      style={[
                        styles.categoryNewsScreen_categoryText,
                        {
                          color:
                            selectedCategory === itemData?.item?._id
                              ? 'white'
                              : Colors.GREY_6,
                          fontFamily:
                            Platform.OS === 'android'
                              ? 'KarobarDailyBold'
                              : 'KarobarDaily',
                          fontSize: 16,
                        },
                      ]}>
                      {itemData.item.name}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.categoryNewsScreen_categoryText,
                        {
                          fontWeight:
                            selectedCategory === itemData?.item?._id
                              ? 'bold'
                              : 'normal',
                          color:
                            selectedCategory === itemData?.item?._id
                              ? 'white'
                              : Colors.GREY_6,
                          fontFamily:
                            Platform.OS === 'android'
                              ? 'ProximaNovaRegular'
                              : 'Proxima Nova',
                        },
                      ]}>
                      {itemData.item.name}
                    </Text>
                  )}
                  {/* <Text
                  style={[
                    styles.categoryNewsScreen_categoryText,
                    {
                      color:
                        selectedCategory === itemData.item._id
                          ? 'white'
                          : Colors.GREY_6,
                    },
                  ]}>
                  {itemData.item.name}
                </Text> */}
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryNewsScreen_topBar: {
    maxHeight: 80,
    width: '100%',
  },
  categoryNewsScreen_categoryBoxContainer: {
    marginRight: 10,
    borderRadius: 30,
    borderColor: '#D8DCE6',
    borderWidth: 1,
  },
  categoryNewsScreen_categoryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  categoryNewsScreen_categoryText: {
    fontSize: 14,
  },
});
