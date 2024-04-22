import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ViewStyle,
  ColorValue,
  TouchableOpacity,
  Dimensions,
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
import CarouselCards from '../Components/Carousel/CarouselCards';
import {BudgetType} from '../Types/BudgetTypes'

import {color} from '@rneui/base';

interface Slice {
  value: number;
  percentage: number;
  color: string;
}

const RADIUS = 120;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;

function OverviewPage() {
  const {usersBudgets} = useBudget();

  return (
      <SafeAreaView style={styles.mainContainer}>
        <CarouselCards data={usersBudgets} renderItem={OverviewCardItem} />
      </SafeAreaView>
  );
}
const OverviewCardItem = ({item, index}: any) => {
  return (
    <SafeAreaView style={styles.container} key={index}>
      <OverviewCardComponent budget={item as BudgetType} />
    </SafeAreaView>
  );
};

interface OverviewCardComponentProps {
  budget: BudgetType;
}
const OverviewCardComponent = (props: OverviewCardComponentProps) => {
  const {budget} = props;
  const navigator = useNavigation();
  const [currentDate, setCurrentDate] = useState<string | undefined>();

  const n = 2;
  const font = useFont(require('../Assets/fonts/Roboto-Bold.ttf'), 35);
  const smallFont = useFont(require('../Assets/fonts/Roboto-Light.ttf'), 28);
  const [slice, setSlice] = useState<Slice[] | any>([]);
  const totalSliceValue = useSharedValue(0);
  const totalSliceSpent = useSharedValue(0);
  const deciamls = useSharedValue<number[]>([]);
  const colors = ['#C4D2DF', '#7FB5C1']; // #2F88bd color for original blue

  const generateSlice = () => {
    const generateSlice = [sliceAmountSpent, sliceTotalBudget];
    const total: number = sliceTotalBudget!;
    const spent: number = sliceAmountSpent!;
    const percentageSpent = (spent / total) * 100;
    const percentageTotal = 100 - percentageSpent;
    const decimalSlice = [percentageTotal / 100, percentageSpent / 100];
    const percentages = [percentageSpent, percentageTotal];

    const sliceData = generateSlice.map((value, index) => ({
      value,
      percentage: percentages[index],
      color: colors[index],
    }));

    totalSliceValue.value = withTiming(total, {duration: 1000});
    totalSliceSpent.value = withTiming(spent, {duration: 1000});
    deciamls.value = [...decimalSlice];
    setSlice(sliceData);

    //console.log({sliceData, generateSlice, total, percentages, decimalSlice});
  };

  const [currentBudgetName, setBudgetName] = useState<string | undefined>();
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
    setSliceTotal(getTotal());
    setSliceSpent(getAmountSpent());
    setAmountLeft(getAmountRemaining());
  },);

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
    const labelColor: ColorValue = budget.labelColor
    if (labelColor == null) {
      return '#1E303C';
    } else {
      return labelColor;
    }
  }
  
  function getBudgetName() {
    if (budget.budgetName === '') {
      return 'Example Budget (Grocery Shopping)'
    } else {
      const budgetName: string = budget.budgetName
      return budgetName
    }
  }

  function getAmountRemaining() {
    if (budget.spendTarget === budget.spendCurrent){
      return 0
    } else {
      const amountSpent: number = budget.spendCurrent
      const totalAmount: number = budget.spendTarget
      return totalAmount - amountSpent
    }
  }
  function getTotal() {
    if (budget.spendTarget === 0) {
      return 500;
    } else {
        const total: number = budget.spendTarget
        return total;
    }
  }
  function getAmountSpent() {
    if (budget.spendCurrent === 0 && budget.spendTarget === 0) {
      return 100
    } else {
      const spent: number = budget.spendCurrent
      return spent;
    }
  }

  if (!font || !smallFont) {
    return <View />;
  }

  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient
            colors={['#EBF8FE','#8eb2c0']} //#8eb2c0 or  budget.labelColor.toString()
            style={styles.linearGradient}>
        <ScrollView
          style={styles.ScrollView}
          showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
            {slice.map((item: any, index: any) => {
                        return <RenderItem item={item} index={index} key={index} />;
                    })}       
              <Text style={styles.header1}>
                {' '}
                Overview <Text style={styles.header2}>{currentDate}</Text>
              </Text>
              <View style={styles.budgetBox}>
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
                  <View style={{alignItems: 'center', margin: 8, marginBottom: 16,}}>
                    <View style={styles.chartContainer}>
                      <DonutChart
                        radius={RADIUS}
                        strokeWidth={STROKE_WIDTH}
                        outerStrokeWidth={OUTER_STROKE_WIDTH}
                        font={font}
                        smallFont={smallFont}
                        totalValue={totalSliceValue}
                        totalSpent={totalSliceSpent}
                        n={n}
                        gap={GAP}
                        decimals={deciamls}
                        colors={colors}
                      />
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.button} onPress={generateSlice}>
                      <Text style={styles.buttonText}>Reload Chart</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.createBudgetButton}>
                    <StyledButton
                      onPress={() => {
                        navigator.navigate('CreateBudgetPage');
                      }}>
                      Create New Budget
                    </StyledButton>
                  </View>
              </View>
              <View style={styles.amountBox}>
                <Text style={styles.header3}>Amount Left</Text>
                <Seperator />
                 <Text style={styles.text}>
                   ${currentAmountLeft}/$
                  {sliceTotalBudget} 
                  <View style={styles.amountLeftChart}>
                  </View>
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
      </LinearGradient>
    </SafeAreaView>
  );
}

export const SLIDER_WIDTH = Dimensions.get('window').width + 200;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const sliceColor = ['#7FB5C1', '#C4D2DF', '#2C8FA2'];
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
  createBudgetButton: {
    paddingBottom: 8,
    verticalAlign: 'bottom'
  },
  amountLeftChart: {
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
    height: 450,
  },
  chartContainer: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    marginTop: 8,
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
