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
import {getAllCategory, setCategory} from '../../redux/categoryarticle/action';
import {RootState} from '../../redux/reducers';
import {StackNavigationProp} from '@react-navigation/stack';
import {CategoryArticleComponent} from '../../screens/CategoryArticleComponent';
import Colors from '../../constants/Colors';

interface NewsProps {
  navigation: StackNavigationProp<any>;
}

export const News: React.FC<NewsProps> = ({navigation}) => {
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 40,
      }}>
      <View style={styles.categoryNewsScreen_topBar}>
        <FlatList
          data={categoryData}
          contentContainerStyle={{paddingRight: 10, flexGrow: 1}}
          keyExtractor={(item: any) => item?._id}
          horizontal
          style={{
            padding: 10,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={(itemData: any) => (
            <View
              style={[
                styles.categoryNewsScreen_categoryBoxContainer,
                {
                  backgroundColor:
                    category === itemData?.item ? 'red' : 'white',
                },
              ]}>
              <TouchableNativeFeedback
                onPress={() => {
                  dispatch(
                    setCategory({
                      selectedCategory: itemData?.item,
                    }),
                  );
                }}>
                <View style={styles.categoryNewsScreen_categoryBox}>
                  <Text
                    style={[
                      styles.categoryNewsScreen_categoryText,
                      {
                        fontWeight:
                          category === itemData?.item ? 'bold' : 'normal',
                        color:
                          category === itemData?.item ? 'white' : Colors.GREY_6,
                      },
                    ]}>
                    {itemData?.item?.name}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
        />
      </View>
      <CategoryArticleComponent navigation={navigation} category={category} />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryNewsScreen_topBar: {
    maxHeight: 80,
    // paddingTop: 10,
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
  categoryNewsScreen_categoryArticle: {flex: 1, marginTop: 20},
});
