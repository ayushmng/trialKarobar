import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Keyboard,
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  Pressable,
} from 'react-native';
import {
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {RootState} from '../redux/reducers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTheme} from '@react-navigation/native';
import Colors from '../constants/Colors';
import {clearSearchContent, getSearchContent} from '../redux/search/action';
import {useDispatch, useSelector} from 'react-redux';
import {AllCategories} from './AllCategories';
import {DefaultText} from '../components/Text/DefaultText';
import {ArticleList} from '../components/articleComponents/ArticleList';
import {CategoryArticleComponent} from './CategoryArticleComponent';
import {ArticleHomeCard} from '../components/articleComponents/ArticleHomeCard';
import {HomeCard} from '../components/articleComponents/HomeCard';

interface SearchScreenProps {
  navigation?: any;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({navigation}) => {
  const {colors} = useTheme();
  const [search, setSearch] = useState<string>('');
  const [timeSelect, setTimeSelect] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchMeta, setSearchMeta] = useState<any>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); //to check whether keyboard is visible or not
  const [dropDown, setDropDown] = useState<boolean>(true);
  const dispatch = useDispatch();
  const searchArticle = useSelector(
    (state: RootState) => state.searchReducer.search!,
  );
  console.log('SearchArticleLength: ', searchArticle.length);
  console.log('Selected Category: ', selectedCategory);
  const searchMetaData = useSelector(
    (state: any) => state.searchReducer.searchMeta,
  );
  const loading = useSelector(
    (state: RootState) => state.searchReducer.loadingSearchContent,
  );
  //clear searchData when screen mounts
  useEffect(() => {
    // setSearchMeta([]);
    dispatch(clearSearchContent());
    return () => {};
  }, []);
  // to know whether the keyboard is visible or not
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const onChangeText = (text: string) => {
    setSearch(text);
    if (searchMetaData.length === 0) {
      return;
    }

    if (text.length !== 0 && text.length > 1) {
      if (text.includes('\\')) {
        return;
      }
      const regexp = new RegExp(`.*${text}`, 'i');
      setSearchMeta(
        searchMetaData?.sort().filter((v: any) => regexp.test(v.searchtext)),
      );
    } else {
      setSearchMeta([]);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundColor}}>
      <View
        style={{flexDirection: 'row', backgroundColor: colors.profileHeader}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            padding: 8,
          }}>
          <TouchableWithoutFeedback onPress={() => navigation.pop()}>
            <AntDesign name="left" size={20} color={colors.iconColor} />
          </TouchableWithoutFeedback>
        </View>
        <TextInput
          autoFocus={true}
          onSubmitEditing={() => {
            setSearchMeta([]);
            dispatch(clearSearchContent());
            //checks if the text is a unicode, if unicode convert to preeti format else send the direct text
            dispatch(
              getSearchContent({
                page: 1,
                term: search,
                date: timeSelect.value,
                category: selectedCategory,
              }),
            );
          }}
          onChangeText={(text: string) => {
            onChangeText(text);
          }}
          value={search}
          placeholder="Search anything"
          placeholderTextColor={Colors.GREY_4}
          style={{
            flex: 1,
            shadowColor: 'white',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0,
            marginLeft: 4,
            width: '90%',
            color: colors.textColor,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              onChangeText('');
            }}>
            <Entypo
              name={'circle-with-cross'}
              size={24}
              color={Colors.GREY_4}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          backgroundColor: colors.profileHeader,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 8,
          paddingBottom: 8,
          paddingRight: 8,
        }}>
        <Text
          style={{fontWeight: 'bold', fontSize: 16, color: colors.textColor}}>
          Filters
        </Text>
        {dropDown ? (
          <TouchableWithoutFeedback onPress={() => setDropDown(false)}>
            <Entypo name="chevron-down" size={28} color={Colors.GREY_4} />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={() => setDropDown(true)}>
            <Entypo name="chevron-up" size={28} color={Colors.GREY_4} />
          </TouchableWithoutFeedback>
        )}
      </View>
      {!dropDown && (
        <View style={{height: 100, backgroundColor: colors.topBarCategory}}>
          <Text
            style={{
              marginTop: 8,
              marginLeft: 8,
              marginBottom: 4,
              color: colors.textColor,
            }}>
            Category
          </Text>
          <AllCategories
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            setTimeSelect={setTimeSelect}
          />
        </View>
      )}
      {/* <View style={{backgroundColor: Colors.BLUE}}> */}
      {searchArticle.length === 0 && loading && !isKeyboardVisible && (
        <ActivityIndicator size="large" color={colors.iconColor} />
      )}
      {searchArticle.length > 0 && !isKeyboardVisible && (
        <FlatList
          data={searchArticle}
          keyExtractor={(item) => item?._id}
          renderItem={(itemData) => (
            <View
              key={itemData.item._id}
              style={{
                marginHorizontal: '3%',
                marginTop: 10,
              }}>
              <HomeCard
                // readtime={itemData.item.readtime}
                // bookmarked={itemData.item.bookmarked}
                content={itemData.item.content}
                title={itemData.item.title}
                thumbnail={itemData.item.thumbnail}
                _id={itemData.item._id}
                navigation={navigation}
                PublishedAt={itemData.item.published_at}
                // articleData={itemData.item}
              />
            </View>
          )}
          ListFooterComponent={(): any => {
            return (
              loading && (
                <View style={styles.center}>
                  <ActivityIndicator size="large" color="black" />
                </View>
              )
            );
          }}
        />
      )}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  center: {justifyContent: 'center', alignItems: 'center'},
});
