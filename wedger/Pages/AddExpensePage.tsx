import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Header';
import {addItemObject} from '../Types/BudgetTypes';
import {Icon, makeStyles} from '@rneui/themed';
import ExpenseItem from '../Components/ExpenseItem';

const AddExpensePage = () => {
  const styles = useStyles();
  const [expenseList, setExpedienceList] = useState<addItemObject[]>([]);
  return (
    <ScrollView>
      <Header backButton />
      <View style={styles.addIcon}>
        <Icon
          name="plus"
          type="entypo"
          color="#000"
          onPress={() => {
            console.log('add exspence');
          }}
        />
      </View>
      <View>
        <ExpenseItem editMode={false} itemData={undefined} />
      </View>
    </ScrollView>
  );
};

export default AddExpensePage;

const useStyles = makeStyles(theme => ({
  addIcon: {
    alignItems: 'flex-end',
    flexBasis: 1,
    padding: 10,
  },
}));
