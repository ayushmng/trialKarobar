import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_KEY, UNAME_KEY} from '../../redux/auth/constant';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';
import {Card} from 'react-native-paper';
import {TabView, SceneMap} from 'react-native-tab-view';
import {TabBar} from 'react-native-tab-view';
import Colors from '../../constants/Colors';
import {useTheme} from '@react-navigation/native';
import {Settings} from '../profileComponents/Settings';
import {SavedPost} from '../../navigation/tabNavigation/SavedPost';
import {Sources} from '../../navigation/tabNavigation/Sources';

const FirstRoute = () => <SavedPost />;
const SecondRoute = () => <Sources />;

export const ProfileHeader = () => {
  const {colors} = useTheme();
  const imageSize = 100;
  //Check pre. login state
  const [username, setusername] = useState<string>();
  const [uname, setuname] = useState<string>();
  useEffect(() => {
    AsyncStorage.getItem(USER_KEY).then((val) => {
      setusername(val);
    });
    AsyncStorage.getItem(UNAME_KEY).then((val) => {
      setuname(val);
    });
  });
  const refRBSheet = React.useRef();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Saved Post'},
    {key: 'second', title: 'Sources'},
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.tabIcon}}
      style={{backgroundColor: colors.tabBackground}}
      activeColor={colors.tabIcon}
      inactiveColor={colors.tabIcon}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  return (
    <View style={{flex: 1}}>
      <RBSheet
        ref={refRBSheet}
        height={650}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopEndRadius: 20,
            borderTopLeftRadius: 20,
            opacity: 1,
            width: '95%',
            alignSelf: 'center',
            backgroundColor: colors.bottomSheetView,
          },
        }}>
        <Settings />
      </RBSheet>
      <View
        style={{
          height: '24%',
          width: '100%',
          backgroundColor: colors.profileHeader,
          // marginBottom: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: 12,
            marginTop: 8,
            padding: 8,
            justifyContent: 'space-between',
            width: 90,
          }}>
          <MaterialIcons name={'edit'} size={20} color={colors.iconColor} />
          <TouchableOpacity
            onPress={() => {
              // bottomRef.current.snapTo(0);
              refRBSheet.current.open();
            }}>
            <Ionicons
              name={'ios-settings-sharp'}
              size={20}
              color={colors.iconColor}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 12,
            marginLeft: 24,
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: 'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png',
            }}
            style={{
              width: imageSize,
              height: imageSize,
              borderRadius: imageSize / 2,
            }}
          />
          <View
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              marginBottom: 28,
            }}>
            <Text
              style={{
                color: colors.textColor,
                fontWeight: 'bold',
              }}>
              {uname}
            </Text>
            <Text
              style={{
                color: colors.textColor,
              }}>
              {username}
            </Text>
          </View>
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Colors.windowWidth}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    shadowColor: '#333333',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.GREY_4,
    marginBottom: 10,
  },
});
