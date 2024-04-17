/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text} from 'react-native';
import React, {useMemo} from 'react';
import {useBudget} from '../Context/userBudgetContext';
import CarouselView from '../Components/CarouselView';
import {useAuth} from '../Context/userAuthContext';

const ShoppingListPage = () => {
  const {getUsersBudgets} = useBudget();
  const {userData} = useAuth();
  const budgets = useMemo(() => getUsersBudgets(), [userData]);
  return (
    <>
      {budgets.length > 1 ? (
        <CarouselView contentArray={budgets}>
          <View>
            <Text>ShoppingListPage</Text>
          </View>
        </CarouselView>
      ) : (
        <View>
          <Text>ShoppingListPage, budget 1 or null</Text>
        </View>
      )}
    </>
  );
};

export default ShoppingListPage;
