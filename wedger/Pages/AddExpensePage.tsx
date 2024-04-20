import {SafeAreaView, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Header';
import {addItemObject} from '../Types/BudgetTypes';
import {Icon, makeStyles} from '@rneui/themed';
import ExpenseItem from '../Components/ExpenseItem';
import ExpenseItemModal from '../Components/ExpenseItemModal';
import {useBudget} from '../Context/userBudgetContext';

interface Props {
  BudgetUID: string;
}

const AddExpensePage = (props: Props) => {
  const {BudgetUID} = props;
  const styles = useStyles();
  const [expenseList, setExpedienceList] = useState<addItemObject[]>([]);
  const [addItem, setAddItem] = useState<boolean>(false);
  const {loadingBudget, userBudgetError} = useBudget();

  const handleRemoveItem = (i: number) => {
    let tempArr = expenseList;
    tempArr.splice(i, 1);
    setExpedienceList(tempArr);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <Header backButton paddingTop />
        <View style={styles.addIcon}>
          <Icon
            name="plus"
            type="entypo"
            color="#000"
            onPress={() => {
              setAddItem(true);
            }}
          />
        </View>
        <View>
          {expenseList.length !== 0
            ? expenseList.map((item, index) => {
                return (
                  <ExpenseItem
                    itemData={item}
                    budgetID={BudgetUID}
                    removeTempObj={() => handleRemoveItem(index)}
                    key={index}
                  />
                );
              })
            : null}
        </View>
        <ExpenseItemModal
          itemData={undefined}
          editMode={true}
          isVisible={addItem}
          cancelButtonPress={() => setAddItem(false)}
          cancelButtonText={'Close'}
          description={'Add a new item'}
          buttonsLoading={loadingBudget}
          errorMessage={userBudgetError}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddExpensePage;

const useStyles = makeStyles(theme => ({
  addIcon: {
    alignItems: 'flex-end',
    flexBasis: 1,
    paddingHorizontal: 20,
    color: theme.colors.black,
  },
}));
