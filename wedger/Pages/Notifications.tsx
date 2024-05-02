import React, {useState, useEffect} from 'react';
import {collection, doc, getDoc} from 'firebase/firestore';
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
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}

function Notifications(budgetUID: string) {
  const {getSpendGoal} = useBudget();
  const {userRef} = useAuth();
  const [_usersBudgets, setUsersBudgets] = useState<BudgetType[]>([]);

  // commenting this out for now
  /*useEffect(() => {
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
    // i forgot how to grab snapshots from db but this is the general idea
    snapshot.forEach(doc => {
      updatedBudgets.push({...doc.data(), id: doc.id} as BudgetType);
    });
    setUsersBudgets(updatedBudgets);

    return () => unsubscribe();
  }, [budgetUID, getSpendGoal, userRef]); */

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
