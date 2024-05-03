import React, {useState, useEffect} from 'react';
import {
  collection,
  query,
  doc,
  getDoc,
  getDocs,
  where,
} from 'firebase/firestore';
import {useAuth} from '../Context/userAuthContext';
import {db} from '../environment/firebase';
import {View, Button} from 'react-native';
import notifee from '@notifee/react-native';
import {useBudget} from '../Context/userBudgetContext';
import {BudgetType} from '../Types/BudgetTypes.ts';

async function Screen() {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: 'Watch Out!',
    body: 'You are almost at your budget limit',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}

async function Notifications(budgetUID: string) {
  const {getSpendGoal} = useBudget();
  const {userRef} = useAuth();
  const [_usersBudgets, setUsersBudgets] = useState<BudgetType[]>([]);

  const docRef = await collection(
    db,
    'users',
    userRef?.uid,
    'budgets',
    budgetUID,
  );

  const snapshot = await getDocs();
  snapshot.forEach(doc => {});

  function listenTo() {
    if (userRef) {
      getSpendGoal(budgetUID);
      const unsubscribe = collection(
        db,
        'users',
        userRef.uid,
        'budgets',
        budgetUID,
        'expendedItems',
      );
      const updatedBudgets: BudgetType[] = [];
      snapshot.forEach(doc => {
        updatedBudgets.push({id: doc.id} as BudgetType);
      });
      setUsersBudgets(updatedBudgets);

      return unsubscribe;
    }
  }

  useEffect(() => {
    if (_usersBudgets.length > 0) {
      const currentBudget = _usersBudgets.find(
        budget => budget.id === budgetUID,
      );
      const spendCurrent = _usersBudgets.find(
        budget => budget.spendCurrent === spendCurrent,
      );
      const spendTotal = _usersBudgets.find(
        budget => budget.spendTarget === spendTotal,
      );
      if (currentBudget) {
        if (spendCurrent >= 0.8 * spendTotal) {
          triggerNotification();
        } // the naming here is kinda aids but refer to budget context
      }
    }
  }, [_usersBudgets, budgetUID]);

  const triggerNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'budget_notification',
      name: 'Budget Notification Channel',
    });

    await notifee.displayNotification({
      title: 'Budget Alert',
      body: 'You are nearing or have reached your spend goal for this budget.',
      android: {
        channelId,
      },
    });
  };
}

export default Notifications;
