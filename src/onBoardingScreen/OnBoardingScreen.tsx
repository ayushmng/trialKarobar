import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import {DefaultText} from '../components/Text/DefaultText';
import Colors from '../constants/Colors';
// import {AuthRedButton} from '../components/authComponents/AuthRedButton';
import Karobar from '../assets/karobar.svg';
import OnBoardingNews from '../assets/OnBoardingNews.svg';
import OnBoardingStories from '../assets/OnBoardingStories.svg';
import OnBoardingWidget from '../assets/OnBoardingWidget.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';

interface OnBoardingScreenProps {
  setBoardingScreen: any;
}

const onBoardings = [
  {
    title: 'News for you',
    image: OnBoardingNews,
    desc: 'Suggested news for you',
  },
  {title: 'Stories', image: OnBoardingStories, desc: 'Customize Widgets'},
  {
    title: 'Widget',
    image: OnBoardingWidget,
    desc: 'Watch it before it expires',
  },
];

const {width, height} = Dimensions.get('window');

function OnBoardingScreen({setBoardingScreen}: OnBoardingScreenProps) {
  const [completed, setCompleted] = useState<boolean>();
  const scrollX = new Animated.Value(0);
  // const navigation = useNavigation();

  useEffect(() => {
    scrollX.addListener(({value}) => {
      if (Math.floor(value / width) === onBoardings.length - 1) {
        setCompleted(true);
      } else {
        setCompleted(false);
      }
    });
    return () => scrollX.removeListener();
  }, [scrollX]);

  function renderContent() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.onBoardingScreen_header}>
            <Karobar />
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Dashboard');
                AsyncStorage.setItem('onboarding', 'done');
                setBoardingScreen();
              }}>
              <DefaultText style={{color: Colors.GREY_5, fontSize: 14}}>
                Skip
              </DefaultText>
            </TouchableOpacity>
          </View>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            scrollEnabled
            decelerationRate={0}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}>
            {onBoardings.map((item, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  width: width,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.content_topic}>{item.title}</Text>
                  <View>
                    <item.image />
                  </View>
                  <Text style={styles.text}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: Colors.RED,
              width: 180,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              marginBottom: 52,
              marginRight: 16,
            }}
            onPress={() => {
              AsyncStorage.setItem('onboarding', 'done');
              setBoardingScreen();
            }}>
            <Text style={styles.buttonText}>
              {completed === true ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View style={styles.dotContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [8, 8, 8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[styles.dot, {width: dotSize, height: dotSize}]}
            />
          );
        })}
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View>{renderContent()}</View>
      </View>
      <View style={styles.dotRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
}

const radius = 12;

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  onBoardingScreen_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  content_topic: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.RED,
    marginBottom: 42,
    marginTop: -64,
  },
  text: {
    fontSize: 18,
    padding: 8,
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 20,
  },
  dotRootContainer: {
    marginTop: 38,
    marginLeft: 32,
  },
  dotContainer: {
    flexDirection: 'row',
    height: 12,
  },
  dot: {
    borderRadius: radius,
    backgroundColor: Colors.RED,
    marginHorizontal: radius / 2,
    width: 8,
    height: 8,
    bottom: height > 700 ? '30%' : '20%',
    position: 'relative',
  },
});

export default OnBoardingScreen;
