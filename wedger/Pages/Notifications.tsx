import React from 'react';
import {collection, doc, getDoc} from "firebase/firestore";
import { useAuth } from '../Context/userAuthContext';
import {db} from '../environment/firebase'
import { View, Button } from 'react-native';
import notifee from '@notifee/react-native';
import {useBudget} from '../Context/userBudgetContext';


function Screen () {

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

    async const {userData,userRef} = useAuth();
    async const {getUsersBudgets} = useBudget();

    const docRef = doc(db,'users',userRef.uid,'budgets', getUsersBudgets.name,);
}