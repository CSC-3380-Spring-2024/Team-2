import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {useBudget} from '../Context/userBudgetContext';
import ExpenseItem from '../Components/ExpenseItem';
import {ItemObject} from '../Types/BudgetTypes';

const tempExpenceItems: ItemObject[] = [
  {
    id: '11212',
    name: 'Test 1',
    cost: 22,
    quantity: 1,
    unitCost: 0,
    addMethod: 'manual',
    Reoccurring: false,
    category: {category: 'dinning'},
  },
  {
    id: '112222',
    name: 'Test 2',
    cost: 24,
    quantity: 1,
    unitCost: 0,
    addMethod: 'manual',
    Reoccurring: false,
    category: {category: 'dinning'},
  },
];

function ShoppingListPage() {
  const {usersBudgets} = useBudget();
  return (
    <View>
      <Text>ShoppingListPage</Text>
      {tempExpenceItems.map(item => {
        return <ExpenseItem itemData={item} key={item.id} budgetID={'not an id'}/>;
      })}
    </View>
  );
}

export default ShoppingListPage;
