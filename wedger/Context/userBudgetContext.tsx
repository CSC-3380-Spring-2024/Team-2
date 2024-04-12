import React, {ReactNode, createContext, useContext, useState} from 'react';
import {
  BudgetType,
  EditBudgetType,
  EditItemObject,
  ItemObject,
  addItemObject,
  createBudgetType,
} from '../Types/BudgetTypes';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import {useAuth} from './userAuthContext';
import {db} from '../environment/firebase';

interface BudgetContextType {
  //budget handle
  createBudget: (
    obj: createBudgetType,
  ) => Promise<DocumentReference<DocumentData, DocumentData> | undefined>;
  editBudget: (
    obj: EditBudgetType,
  ) => Promise<DocumentSnapshot<DocumentData, DocumentData> | undefined>;
  deleteBudget: (budgetToDelete: string) => void;
  getUsersBudgets: () => Promise<BudgetType[] | undefined>;
  getAllReceipts: (budgetUID: string) => Promise<URL[] | undefined>;
  //item handle
  getRecept: (receptRefId: string) => void;
  getItemsExpended: (budgetUID: string) => Promise<ItemObject[] | undefined>;
  addExpendedItems: (itemsToAdd: addItemObject[], budgetUID: string) => void;
  editExpendedItem: (item: EditItemObject, budgetUID: string) => void;
  deleteExpendedItems: (itemID: string[], budgetUID: string) => void;
  //util
  searchItems: (search?: string) => Promise<ItemObject[] | undefined>;
  loadingBudget: boolean;
  userBudgetError: string;
  usersBudgets: BudgetType[] | undefined;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [loadingBudget, setLoadingBudget] = useState<boolean>(false);
  const [usersBudgets, setUsersBudgets] = useState<BudgetType[] | undefined>();
  const [userBudgetError, setUserBudgetError] = useState<string>('');
  const {userRef} = useAuth();

  // useEffect(() => {
  //   getCurrentBudgets();
  // }, [userRef]);

  const getCurrentBudgets = async () => {
    if (!userRef) {
      return;
    }
    const bugArr = await getUsersBudgets();
    setUsersBudgets(bugArr);
  };

  const createBudget = async (obj: createBudgetType) => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const newBudget = {
        budgetName: obj.budgetName,
        labelColor: obj.labelColor,
        spendTarget: obj.spendTarget,
        timeFrame: obj.timeFrame,
        spendCurrent: 0,
      };
      const budgetCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'budgets',
      );
      const budget = await addDoc(budgetCollectionRef, newBudget);
      getCurrentBudgets();
      return budget;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  const editBudget = async (obj: EditBudgetType) => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const editDocData = {
        budgetName: obj.budgetName,
        labelColor: obj.labelColor,
        spendTarget: obj.spendTarget,
        timeFrame: obj.timeFrame,
        spendCurrent: obj.spendCurrent,
      };
      const budgetDocRef = doc(db, 'users', userRef.uid, 'budgets', obj.docId);
      await updateDoc(budgetDocRef, editDocData);
      const updatedBudget = await getDoc(budgetDocRef);
      getCurrentBudgets();
      return updatedBudget;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  const deleteBudget = async (budgetToDelete: string): Promise<void> => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const budgetDocRef = doc(
        db,
        'users',
        userRef.uid,
        'budgets',
        budgetToDelete,
      );
      await deleteDoc(budgetDocRef);
      getCurrentBudgets();
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  const getUsersBudgets = async (): Promise<BudgetType[] | undefined> => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      let BudgetsReturnArray: BudgetType[] = [];
      const budgetCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'budgets',
      );
      const docsSnap = await getDocs(budgetCollectionRef);
      if (docsSnap.empty) return undefined;
      docsSnap.forEach(doc => {
        const curDoc = doc.data() as unknown as BudgetType;
        getItemsExpended(doc.id);
        BudgetsReturnArray.push(curDoc);
      });
      return BudgetsReturnArray;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };

  //TODO: implement
  const getAllReceipts = async (
    budgetUID: string,
  ): Promise<URL[] | undefined> => {
    console.log(budgetUID, 'get recipes');
    return undefined;
  };

  //item handle

  //TODO: implement
  const getRecept = async (receptRefId: string) => {
    console.log(receptRefId, 'recept id');
  };

  const getItemsExpended = async (
    budgetUID: string,
  ): Promise<ItemObject[] | undefined> => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      let ItemReturnArray: ItemObject[] = [];
      const budgetItemCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'budgets',
        budgetUID,
        'expendedItems',
      );
      const docsSnap = await getDocs(budgetItemCollectionRef);
      if (docsSnap.empty) return undefined;
      docsSnap.forEach(item => {
        const currItem = item as unknown as ItemObject;
        ItemReturnArray.push(currItem);
      });

      // attach to userBudgets
      try {
        if (usersBudgets) {
          let tempBudgets = usersBudgets;
          const budgetSelectIndex = tempBudgets.findIndex(
            budget => budget.id === budgetUID,
          );
          tempBudgets[budgetSelectIndex].itemsExpended.concat(ItemReturnArray);
          setUsersBudgets(tempBudgets);
        }
      } catch (e) {
        console.log(e);
      }

      //return
      return ItemReturnArray;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };

  const addExpendedItems = async (
    itemsToAdd: addItemObject[],
    budgetUID: string,
  ): Promise<void> => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const currentBudget = usersBudgets?.find(
        budget => budget.id === budgetUID,
      );
      const budgetItemCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'budgets',
        budgetUID,
        'expendedItems',
      );
      const budgetDocRef = doc(db, 'users', userRef.uid, 'budgets', budgetUID);
      const currentSpend = () => {
        let tempTotal = currentBudget ? currentBudget.spendCurrent : 0;
        itemsToAdd.forEach(item => {
          tempTotal += item.cost;
        });
        return tempTotal;
      };
      const addArrayBuilder = itemsToAdd.map(item => {
        const tempObj = {
          name: item.name,
          cost: item.cost,
          quantity: item.quantity ? item.quantity : 1,
          unitCost: item.cost / (item.quantity ? item.quantity : 1),
          category: item.category ? item.category : {category: 'other'},
          date: item.date ? item.date : '-1',
          location: item.location ? item.location : '',
          paymentType: item.paymentType ? item.paymentType : 'cash',
          addMethod: item.addMethod,
          receptRefId: item.receptRefId ? item.receptRefId : '-1',
          receptRefPhotoURL: item.receptRefPhotoURL
            ? item.receptRefPhotoURL
            : '-1',
          Reoccurring: item.Reoccurring ? item.Reoccurring : false,
        };
        return tempObj;
      });

      const tempBudget = {
        spendCurrent: currentSpend(),
      };
      addArrayBuilder.forEach(
        async el => await addDoc(budgetItemCollectionRef, el),
      );
      await updateDoc(budgetDocRef, tempBudget);

      getCurrentBudgets();
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  const editExpendedItem = async (
    item: EditItemObject,
    budgetUID: string,
  ): Promise<void> => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }
      const editItemBuilder = {
        name: item.name,
        date: item.date,
        location: item.location,
        cost: item.cost,
        quantity: item.quantity,
        unitCost: item.unitCost,
        category: item.category,
        paymentType: item.paymentType,
        addMethod: item.addMethod,
        Reoccurring: item.Reoccurring,
      };
      const ItemDocRef = doc(
        db,
        'users',
        userRef.uid,
        'budgets',
        budgetUID,
        'expendedItems',
        item.id,
      );
      await updateDoc(ItemDocRef, editItemBuilder);
      getItemsExpended(budgetUID);
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  const deleteExpendedItems = async (
    itemIDs: string[],
    budgetUID: string,
  ): Promise<void> => {
    setLoadingBudget(true);
    try {
      if (!userRef) {
        throw Error('No User Ref');
      }

      itemIDs.forEach(async itemID => {
        const ItemsDocRef = doc(
          db,
          'users',
          userRef.uid,
          'budgets',
          budgetUID,
          'expendedItems',
          itemID,
        );
        await deleteDoc(ItemsDocRef);
      });
      getItemsExpended(budgetUID);
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  //util

  //TODO: implement
  const searchItems = async (
    search?: string,
  ): Promise<ItemObject[] | undefined> => {
    console.log(search, 'search');

    return undefined;
  };

  function addError(arg0: string) {
    setUserBudgetError(arg0);
  }
  return (
    <BudgetContext.Provider
      value={{
        //budget handle
        createBudget,
        editBudget,
        deleteBudget,
        getUsersBudgets,
        getAllReceipts,
        usersBudgets,
        //item handle
        getRecept,
        getItemsExpended,
        addExpendedItems,
        editExpendedItem,
        deleteExpendedItems,
        //util
        searchItems,
        loadingBudget,
        userBudgetError,
      }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within an BudgetProvider');
  }
  return context;
};
