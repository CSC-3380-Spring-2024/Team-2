import {View, Text} from 'react-native';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  BudgetType,
  EditBudgetType,
  EditItemObject,
  ItemObject,
  addItemObject,
  createBudgetType,
} from '../Types/BudgetTypes';
import {User, UserCredential} from 'firebase/auth';
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
  const [loadingBudget, setLoadingBudget] = useState<boolean>(true);
  const [usersBudgets, setUsersBudgets] = useState<BudgetType[] | undefined>();
  const [userBudgetError, setUserBudgetError] = useState<string>('');
  const {userRef} = useAuth();

  useEffect(() => {
    setCurrentBudgets();
  }, [userRef]);

  const setCurrentBudgets = async () => {
    if (!userRef) return;
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
        // filler
        spendCurrent: 0,
        itemsExpended: [],
      };
      const budgetCollectionRef = collection(
        db,
        'users',
        userRef.uid,
        'budgets',
      );
      const budget = await addDoc(budgetCollectionRef, newBudget);
      setCurrentBudgets();
      return budget;
    } catch (e: any) {
      console.log(e);
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
      setCurrentBudgets();
      return updatedBudget;
    } catch (e: any) {
      console.log(e);
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
      const budgetDocRef = doc(db, 'users', userRef.uid, 'budgets', budgetToDelete);
      await deleteDoc(budgetDocRef);
      setCurrentBudgets();
    } catch (e: any) {
      console.log(e);
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
      docsSnap.forEach(doc => {
        const curDoc = doc.data() as unknown as BudgetType;
        BudgetsReturnArray.push(curDoc);
      });
      if (BudgetsReturnArray.length === 0) {
        return undefined;
      }
      return BudgetsReturnArray;
    } catch (e: any) {
      console.error(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  const getAllReceipts = async (
    budgetUID: string,
  ): Promise<URL[] | undefined> => {
    return undefined;
  };

  //item handle
  const getRecept = async (receptRefId: string) => {};

  const getItemsExpended = async (
    budgetUID: string,
  ): Promise<ItemObject[] | undefined> => {
    return undefined;
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
          date: item.date ? item.date : new Date(),
          location: item.location ? item.location : '',
          paymentType: item.paymentType ? item.paymentType : 'cash',
          addMethod: item.addMethod,
          receptRefId: item.receptRefId ? item.receptRefId : '',
          receptRefPhotoURL: item.receptRefPhotoURL
            ? item.receptRefPhotoURL
            : '',
          Reoccurring: item.Reoccurring ? item.Reoccurring : false,
        };
        return tempObj;
      });

      const tempBudget = {
        spendCurrent: currentSpend(),
        itemsExpended: addArrayBuilder,
      };
      await updateDoc(budgetDocRef, tempBudget);
      setCurrentBudgets();
    } catch (e: any) {
      console.log(e);
      addError(e.message);
    } finally {
      setLoadingBudget(false);
    }
  };
  const editExpendedItem = async (
    item: EditItemObject,
    budgetUID: string,
  ): Promise<void> => {};
  const deleteExpendedItems = async (
    itemIDs: string[],
    budgetUID: string,
  ): Promise<void> => {};
  //util
  const searchItems = async (
    search?: string,
  ): Promise<ItemObject[] | undefined> => {
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
