import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ViewStyle,
  ColorValue,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StyledButton from '../Components/StyledButton';
import PopupModal from '../Components/PopupModal';
import {LinearGradient} from 'react-native-linear-gradient';
import PieChart from 'react-native-pie-chart';
import {useNavigation} from '@react-navigation/native';
import {useBudget} from '../Context/userBudgetContext';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import RenderItem from '../Components/RenderItem';
import DonutChart from '../Components/DonutChart';
import {useFont} from '@shopify/react-native-skia';

import {color} from '@rneui/base';
// #2F88bd color for original blue

interface Slice {
  value: number;
  percentage: number;
  color: string;
}

const RADIUS = 160;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;

function OverviewPage() {
  const {usersBudgets} = useBudget();

  return (
      <SafeAreaView style={styles.mainContainer}>
        <CarouselCards data={usersBudgets} renderItem={OverviewCardItem} />
      </SafeAreaView>
  )
}
  
  const n = 2;
  const font = useFont(require('../Assets/fonts/Roboto-Bold.ttf'), 60);
  const smallFont = useFont(require('../Assets/fonts/Roboto-Light.ttf'), 60);
  const [slice, setSlice] = useState<Slice[]>([]);
  const totalSliceValue = useSharedValue(0);
  const deciamls = useSharedValue<number[]>([]);
  const colors = ['#C4D2DF', '#7FB5C1'];

  const generateSlice = () => {
    const generateSlice = [sliceTotalBudget, sliceAmountSpent];
    const total: number = sliceTotalBudget!;
    const spent: number = sliceAmountSpent!;
    const percentageSpent = (spent / total) * 100;
    const percentageTotal = 100 - percentageSpent;
    const decimalSlice = [percentageTotal / 100, percentageSpent / 100];
    const percentages = [percentageTotal, percentageSpent];

    const sliceData = generateSlice.map((value, index) => ({
      value: generateSlice[index],
      percentage: percentages[index],
      color: colors[index],
    }));

    totalSliceValue.value = withTiming(total, {duration: 1000});
    deciamls.value = [...decimalSlice];
    //setSlice(sliceData);

    console.log({sliceData, generateSlice, total, percentages, decimalSlice});
  };

  const navigator = useNavigation();
  const [currentDate, setCurrentDate] = useState<string | undefined>();
  const [currentBudgetName, setBudgetName] = useState<string | undefined>();
  const [currentTotalBudget, setTotalBudget] = useState<number | string>();
  const [sliceTotalBudget, setSliceTotal] = useState<number>();
  const [sliceAmountSpent, setSliceSpent] = useState<number>();
  const [currentAmountLeft, setAmountLeft] = useState<number | string>();
  const [currentLabelColor, setLabelColor] = useState<string | ColorValue>();
  const Seperator = () => <View style={seperatorStyles} />;
  const [expenseModalOpen, setExpenseModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setCurrentDate(GetDate());
    setLabelColor(getLabelColor());
    setBudgetName(getBudgetName());
    setTotalBudget(getTotalBudget());
    setSliceTotal(getTotal());
    setSliceSpent(getAmountSpent());
    setAmountLeft(getAmountRemaining());
    console.log('budgets', usersBudgets);
  }, [usersBudgets]);

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
  function getLabelColor() {
    const labelColor: ColorValue[] = usersBudgets.map(
      color => color.labelColor,
    );
    if (labelColor == null) {
      return '#1E303C';
    } else {
      return labelColor[usersBudgets.length - 1];
    }
  }
  function getBudgetName() {
    const budgetName: string[] = usersBudgets.map(name => name.budgetName);
    if (budgetName == null) {
      return 'Example Budget (Grocery Budget)';
    }
    return budgetName[usersBudgets.length - 1];
  }
  function getTotalBudget() {
    const totalAmount: number[] | undefined = usersBudgets.map(
      total => total.spendTarget,
    );
    if (totalAmount == null) {
      return 'No Budget Created Yet (ex. $237/$500)';
    }
    return '$' + totalAmount[usersBudgets.length - 1];
  }

  function getAmountRemaining() {
    const amountLeft: number[] = usersBudgets.map(left => left.spendCurrent);
    const totalAmount: number[] = usersBudgets.map(total => total.spendTarget);
    if (amountLeft == null) {
      return '';
    }
    if (totalAmount == null) return '';
    // totalamount - spendcurrent
    return (
      '$' +
      (totalAmount[usersBudgets.length - 1] -
        amountLeft[usersBudgets.length - 1]) +
      '/'
    );
  }
  function getTotal() {
    if (usersBudgets.length === 0) {
      return 500;
    } else {
      const total: number[] = usersBudgets?.map(total => total.spendTarget);
      return total[usersBudgets.length - 1];
    }
  }
  function getAmountSpent() {
    const spent: number[] = usersBudgets?.map((spent, index) => spent.spendCurrent);
    if (spent == null) {
      return 100;
    }
    return spent[usersBudgets.length - 1];
  }

  if (!font || !smallFont) {
    return <View />;
  }

  //{usersBudgets?usersBudgets.length:''}
  //style={styles.header2}
  return (
    <SafeAreaView style={styles.container}>
      {usersBudgets.length === 0 ? (
        <>
          <Text>No Budgets</Text>
          <StyledButton
            onPress={() => {
              navigator.navigate('CreateBudgetPage');
            }}>
            Create New Budget
          </StyledButton>
        </>
      ) : (
        <ScrollView
          style={styles.ScrollView}
          showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#EBF8FE', '#8eb2c0']}
            style={styles.linearGradient}>
            <View style={styles.container2}>
              <View style={styles.chartContainer}>
                <DonutChart
                  radius={RADIUS}
                  strokeWidth={STROKE_WIDTH}
                  outerStrokeWidth={OUTER_STROKE_WIDTH}
                  font={font}
                  smallFont={smallFont}
                  totalValue={totalSliceValue}
                  n={n}
                  gap={GAP}
                  decimals={deciamls}
                  colors={colors}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={generateSlice}>
                <Text style={styles.buttonText}>Generate</Text>
              </TouchableOpacity>
              {slice.map((item, index) => {
                return <RenderItem item={item} index={index} key={index} />;
              })}
              <Text style={styles.header1}>
                {' '}
                Overview <Text style={styles.header2}>{currentDate}</Text>
              </Text>
              <View style={styles.budgetBox}>
                <View>
                  <Text
                    style={{
                      color: currentLabelColor,
                      marginTop: 8,
                      marginBottom: 8,
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {currentBudgetName}
                  </Text>
                  <Seperator />
                  {
                    <PieChart
                      widthAndHeight={widthAndHeight}
                      series={series}
                      sliceColor={sliceColor}
                      style={styles.pieChart}
                    />
                  }
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
                <Text style={styles.text}>
                  {currentAmountLeft}
                  {currentTotalBudget}
                </Text>
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
          {/* {usersBudgets.map((item,index) => {
          return <RenderItem />
        })} */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const widthAndHeight = 175;
const series = [123, 534, 231]; //123, 534, 231 // getTotalBudget() and getAmountRemaining()
const sliceColor = ['#7FB5C1', '#C4D2DF', '#2C8FA2'];
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
  },
  ScrollView: {
    marginHorizontal: 0,
  },
  button: {
    backgroundColor: '#f4f7fc',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
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
    fontWeight: 'bold',
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
    borderColor: '#8E8D95', // #1E303C black border hex code
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    width: '85%',
    height: 300,
  },
  chartContainer: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    marginTop: 10,
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
