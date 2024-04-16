import {StyleSheet, Text, View, ScrollView, SafeAreaView, ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import StyledButton from '../Components/StyledButton';
import PopupModal from '../Components/PopupModal';
import {LinearGradient} from 'react-native-linear-gradient';
import PieChart from 'react-native-pie-chart';
import {useNavigation} from '@react-navigation/native';

//import { color } from '@rneui/base';

// #2F88bd color for original blue

function OverviewPage() {
  const navigator = useNavigation();
  const [currentDate, setCurrentDate] = useState<string | undefined>();
  const Seperator = () => <View style = {seperatorStyles} />;
  //const {usersBudgets} = usersBudgets();
  const [expenseModalOpen, setExpenseModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setCurrentDate(GetDate());
    //usersBudgets(usersBudgets());
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
              {' '}
              Overview <Text style={styles.header2}>{currentDate}</Text>
            </Text>
            <View style={styles.budgetBox}>
              <View>
                <Text style={styles.header2}>Budget Name</Text>
                <Seperator />
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={sliceColor}
                  style={styles.pieChart}
                />
              </View>
              <StyledButton
              onPress={() => {
                navigator.navigate('CreateBudgetPage');
              }}>
              Create New Budget
            </StyledButton>
            </View>
            <View style={styles.amountBox}>
              <Text style={styles.header3}>Amount Left</Text>
              <Seperator />
              <Text style={styles.text}>$237/$500</Text>
            </View>
            <View style={styles.addExpense}>
              <Text style={styles.header2}>Add Expense</Text>
              <StyledButton
                onPress={() => {
                  navigator.navigate('AddExpensePage');
                }}>
                  Add Expense
              </StyledButton>
            </View>
            <View style={styles.pastExpenses}>
              <Text style={styles.header3}>Past Expenses</Text>
              <Seperator />
            </View>
          </View>
        </LinearGradient>
        <PopupModal
          isVisible={expenseModalOpen}
          description="Add an expense with"
          firstButtonPress={() => {
            setExpenseModalOpen(false);
            navigator.navigate('ScannerHome');
          }}
          firstButtonText="Scanner"
          secondButtonPress={() => {
            setExpenseModalOpen(false);
            navigator.navigate('AddExpensePage');
          }}
          secondButtonText="Manually"
          cancelButtonPress={() => setExpenseModalOpen(false)}
          cancelButtonText="Cancel"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const widthAndHeight = 175;
const series = [123, 534, 231];
const sliceColor = ['#7FB5C1', '#C4D2DF', '#2C8FA2'];
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  header3: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: '3%',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
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
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 300,
  },
  pieChart: {
    alignSelf: 'center',
    marginTop: 8,
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
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 150,
  },
  addExpense: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    borderColor: '#8eb2c0',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 100,
  },
  pastExpenses: {
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center',
    borderColor: '#8eb2c0',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 300,
  },
});
const seperatorStyles: ViewStyle = {
  height: 2,
  width: '100%',
  backgroundColor: '#8E8D95',
};

export default OverviewPage;
