import {View, Text} from 'react-native';
import React, {ReactNode, createContext, useContext, useState} from 'react';
import {
  BudgetType,
  EditBudgetType,
  EditItemObject,
  ItemObject,
  createBudgetType,
} from '../Types/BudgetTypes';
import {User, UserCredential} from 'firebase/auth';

interface BudgetContextType {
  //budget handle
  createBudget: (obj: createBudgetType) => Promise<BudgetType>;
  editBudget: (newProperties: EditBudgetType) => Promise<void>;
  deleteBudget: (budgetToDelete: string) => void;
  getUsersBudgets: () => Promise<BudgetType[] | undefined>;
  getAllReceipts: (budgetUID: string) => Promise<URL[] | undefined>;
  //item handle
  getRecept: (receptRefId: string) => Promise<URL>;
  getItemsExpended: (budgetUID: string) => Promise<ItemObject[] | undefined>;
  addExpendedItems: (itemsToAdd: ItemObject[], budgetUID: string) => void;
  editExpendedItem: (item: EditItemObject, budgetUID: string) => void;
  deleteExpendedItems: (itemID: string[], budgetUID: string) => void;
  //util
  searchItems: (search?: string) => Promise<ItemObject[] | undefined>;
  loadingBudget: boolean;
  userBudgetError: string;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [loadingBudget, setLoadingBudget] = useState<boolean>(true);
  const [userBudgetError, setUserBudgetError] = useState<string>('');

  const createBudget = async (obj: createBudgetType): Promise<BudgetType> => {};
  const editBudget = async (newProperties: EditBudgetType): Promise<void> => {};
  const deleteBudget = async (budgetToDelete: string): Promise<void> => {};
  const getUsersBudgets = async (): Promise<BudgetType[] | undefined> => {
    return undefined;
  };
  const getAllReceipts = async (
    budgetUID: string,
  ): Promise<URL[] | undefined> => {
    return undefined;
  };
  //item handle
  const getRecept = async (receptRefId: string): Promise<URL> => {};
  const getItemsExpended = async (
    budgetUID: string,
  ): Promise<ItemObject[] | undefined> => {
    return undefined;
  };
  const addExpendedItems = async (
    itemsToAdd: ItemObject[],
    budgetUID: string,
  ): Promise<void> => {};
  const editExpendedItem = async (
    item: EditItemObject,
    budgetUID: string,
  ): Promise<void> => {};
  const deleteExpendedItems = async (
    itemID: string[],
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
