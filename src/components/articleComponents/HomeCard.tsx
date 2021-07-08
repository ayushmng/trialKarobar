import React, {useState} from 'react';
import {View, Image, StyleSheet, Pressable, Platform, Text} from 'react-native';
import Colors from '../../constants/Colors';
import {DefaultText} from '../Text/DefaultText';
import {StackNavigationProp} from '@react-navigation/stack';
import dayjs from 'dayjs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
interface ArticleHomeCardProps {
  title: string;
  content?: string;
  thumbnail?: string;
  _id: string;
  bookmarked?: boolean;
  navigation: StackNavigationProp<any>;
  PublishedAt: number;
  //   readtime?: string;
  articleData?: any;
  onPress?: any;
}

export function HomeCard({
  title,
  thumbnail,
  _id,
  bookmarked,
  navigation,
  PublishedAt,
  //   readtime,
  // articleData,
  onPress,
}: ArticleHomeCardProps) {
  const articleScreen = () => {
    navigation.navigate('Article', {
      _id: _id,
    });
  };
  return (
    <View style={styles.articleCard}>
      <Pressable onPress={() => (onPress ? onPress() : articleScreen())}>
        <View>
          <View style={styles.articleCard_image}>
            {thumbnail && (
              <Image
                style={{width: '100%', height: '100%'}}
                // resizeMethod="auto"
                resizeMode="cover"
                source={{
                  uri: `${thumbnail}`,
                }}
              />
            )}
          </View>
          <View style={styles.articleCard_textContainer}>
            <DefaultText style={styles.articleCard_title} numberOfLines={2}>
              {title}
            </DefaultText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 8,
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="web"
                  size={16}
                  color={Colors.BLUE}
                />
                <DefaultText style={{marginLeft: 8}}>
                  {PublishedAt && dayjs.unix(PublishedAt).fromNow()}
                </DefaultText>
              </View>
              {bookmarked ? (
                <Ionicons name="md-bookmark" size={24} />
              ) : (
                <Ionicons name="md-bookmark-outline" size={24} />
              )}
            </View>
            {/* {articleData?.lang === 'np' ? (
              <BoldNepaliText
                style={{
                  fontSize: 20,
                }}
                numberOfLines={2}>
                {title}
              </BoldNepaliText>
            ) : (
              <DefaultText style={styles.articleCard_title} numberOfLines={2}>
                {title}
              </DefaultText>
            )} */}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  articleCard: {
    flex: 1,
    marginBottom: 20,
  },
  articleCard_image: {
    height: Colors.windowWidth - Colors.windowWidth * 0.45,
    backgroundColor: '#D8DCE6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  articleCard_textContainer: {
    marginHorizontal: '2%',
    marginVertical: '1%',
    position: 'relative',
  },
  articleCard_title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  articleCard_collectionContainer: {
    position: 'absolute',
    bottom: 0,
    // width: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    zIndex: 20,
  },
  articleCard_collectionText: {
    color: Colors.BLUE,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
