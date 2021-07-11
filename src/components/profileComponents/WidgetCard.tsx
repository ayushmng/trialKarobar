import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {StyleSheet, View, Text, Switch} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {Card} from 'react-native-paper';
import Colors from '../../constants/Colors';
import NepaliDate from 'nepali-date-converter';

const width = Colors.windowWidth - 42;

interface CardBoxProps {}

export function WidgetCard({}: CardBoxProps) {
  const [currentDate, setCurrentDate] = useState('');
  const [currentNepDate, setCurrentNepDate] = useState('');

  useEffect(() => {
    var engMonth = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    var date = new Date().getDate(); //Current Date
    var month = engMonth[new Date().getMonth()];
    var year = new Date().getFullYear(); //Current Year

    let date1 = new NepaliDate(new Date(year, new Date().getMonth(), date));
    const nepDate = date1.format('ddd, DD MMMM YYYY');

    setCurrentDate(month + ' ' + date + ', ' + year);
    setCurrentNepDate(nepDate);
  }, []);
  return (
    <Card style={widgetStyles.cardStyle}>
      <Text style={{...widgetStyles.SalutationText}}>Good Evening!</Text>
      <Text style={{...widgetStyles.NepaliTextBold}}>{currentNepDate}</Text>
      <Text style={{...widgetStyles.EngTextBold}}>{currentDate}</Text>
    </Card>
  );
}

export const widgetStyles = StyleSheet.create({
  cardStyle: {
    height: 110,
    width: width,
    borderRadius: 10,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 16,
    backgroundColor: Colors.BLUE,
  },
  NepaliTextBold: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
    padding: 4,
    marginTop: 4,
    color: Colors.WHITE,
  },
  EngTextBold: {
    fontSize: 14,
    marginLeft: 18,
    color: Colors.WHITE,
  },
  SalutationText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 12,
    padding: 4,
    marginTop: 12,
    color: Colors.WHITE,
  },
});
