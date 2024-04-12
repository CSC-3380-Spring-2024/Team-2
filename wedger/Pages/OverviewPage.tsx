import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import StyledButton from '../Components/StyledButton';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'react-native-linear-gradient';
import PieChart from 'react-native-pie-chart';
import {useNavigation} from '@react-navigation/native';

//import { color } from '@rneui/base';

// #2F88bd color for original blue

function OverviewPage() {
  const navigator = useNavigation();
  const [currentDate, setCurrentDate] = useState<string | undefined>();

  useEffect(() => {
    setCurrentDate(GetDate());
  }, []);

  // Have functions inside page function and above return statement
  // Also have valuables that dont have to change on every render, See UseState and UseEffect

  function GetDate() {
    const monthNames: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let monthIndex = new Date().getMonth();
    let thisYear = new Date().getFullYear();
    let monthName = monthNames[monthIndex];
    return monthName + ' ' + thisYear;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        <LinearGradient
          colors={['#EBF8FE', '#8eb2c0']}
          style={styles.linearGradient}>
          <View style={styles.container}>
            <Text style={styles.header1}>
              Overview <Text style={styles.header2}>{currentDate}</Text>
            </Text>
            <View style={styles.budgetBox}>
              <View>
                <Text style={styles.header2}>Budget Name</Text>
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={sliceColor}
                  style={styles.pieChart}
                />
              </View>
            </View>
            <StyledButton
              onPress={() => {
                navigator.navigate('CreateBudgetPage');
              }}>
              create new budget
            </StyledButton>
            <View style={styles.amountBox}>
              <Text style={styles.header2}>Amount Left</Text>
            </View>
            <View style={styles.addExpense}>
              <Text style={styles.header2}>Add Expense</Text>
            </View>
            <View style={styles.pastExpenses}>
              <Text style={styles.header2}>Past Expenses</Text>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const widthAndHeight = 225;
const series = [123, 534, 231];
const sliceColor = ['#7FB5C1', '#C4D2DF', '#2C8FA2'];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 0,
  },
  ScrollView: {
    marginHorizontal: 0,
  },
  header1: {
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 42,
    fontWeight: 'bold',
  },
  header2: {
    marginTop: 15,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleBar: {
    width: '85%',
    height: 10,
    marginTop: '15%',
    color: '#1E303C',
  },
  text: {
    fontSize: 30,
  },
  linearGradient: {
    flex: 1,
    width: null,
    height: null,
  },
  budgetBox: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: '#2F88bd', // #1E303C black border hex code
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 300,
  },
  pieChart: {
    alignSelf: 'center',
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#1E303C',
  },
  amountBox: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: '#2F88bd',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 150,
  },
  addExpense: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    borderColor: '#8eb2c0',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 100,
  },
  pastExpenses: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    borderColor: '#8eb2c0',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 300,
  },
});

export default OverviewPage;
